"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CropEditor from "./shipping-label/CropEditor";
import {
  getShippingLabelStrings,
  getToolText,
} from "@/app/i18n/translations";
import { useLanguage } from "@/app/providers/LanguageProvider";
import type {
  FileAnalysis,
  OutputFileResult,
  OutputMode,
  OutputSizeState,
  PageRegion,
  PlatformId,
} from "@/app/lib/shipping-label/types";
import {
  loadPdfForAnalysis,
  type ExtractedPage,
} from "@/app/lib/shipping-label/extract";
import {
  analyzePage,
  pickBestPlatform,
  scorePlatformText,
} from "@/app/lib/shipping-label/analyze";
import {
  PLATFORM_PRESETS,
  getPlatformLabel,
  getPlatformPreset,
} from "@/app/lib/shipping-label/platforms";
import {
  OUTPUT_SIZE_PRESETS,
  isValidCustomSize,
  resolveOutputSize,
  sizeInMm,
} from "@/app/lib/shipping-label/sizes";
import {
  BUILD_ERROR_CORRUPT,
  BUILD_ERROR_EMPTY,
  buildShippingLabelPdf,
  type BuildPageSpec,
} from "@/app/lib/shipping-label/build";

const MAX_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 10;
const MAX_TOTAL_PAGES = 200;

const KIND_COLORS: Record<PageRegion["kind"], string> = {
  label: "border-blue-500",
  invoice: "border-purple-500",
  full: "border-slate-400",
};

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function regionsForMode(
  page: { regions: PageRegion[] },
  mode: OutputMode
): PageRegion[] {
  if (mode === "label") {
    return page.regions.filter(
      (r) => r.kind === "label" || r.kind === "full"
    );
  }
  if (mode === "invoice") {
    return page.regions.filter(
      (r) => r.kind === "invoice" || r.kind === "full"
    );
  }
  return page.regions;
}

export default function ShippingLabelPDF() {
  const inputRef = useRef<HTMLInputElement>(null);
  const cacheRef = useRef(new Map<string, ExtractedPage[]>());
  const urlsRef = useRef(new Set<string>());

  const { locale, t } = useLanguage();
  const toolText = getToolText(locale, "shipping-label-pdf");
  const s = getShippingLabelStrings(locale);

  const [platform, setPlatform] = useState<PlatformId>("auto");
  const [mode, setMode] = useState<OutputMode>("label");
  const [sizeState, setSizeState] = useState<OutputSizeState>({
    sizeId: "4x6",
    customWidth: 100,
    customHeight: 150,
    customUnit: "mm",
  });

  const [files, setFiles] = useState<FileAnalysis[]>([]);
  const [results, setResults] = useState<OutputFileResult[]>([]);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null
  );
  const [editing, setEditing] = useState<{
    fileId: string;
    pageIndex: number;
  } | null>(null);

  const size = useMemo(() => resolveOutputSize(sizeState), [sizeState]);
  const customInvalid =
    sizeState.sizeId === "custom" &&
    !isValidCustomSize(
      sizeState.customWidth,
      sizeState.customHeight,
      sizeState.customUnit
    );

  const reviewCount = files.reduce(
    (n, f) =>
      n + f.pages.filter((p) => p.reviewRequired && !p.accepted).length,
    0
  );

  const selectedCount = files
    .filter((f) => f.status === "ready")
    .reduce(
      (n, f) =>
        n +
        f.pages.reduce(
          (m, p) => m + regionsForMode(p, mode).length,
          0
        ),
      0
    );

  const hasReady = files.some((f) => f.status === "ready");
  const canGenerate = !generating && size !== null && hasReady;

  useEffect(() => {
    const pending = urlsRef.current;
    return () => {
      for (const url of pending) {
        URL.revokeObjectURL(url);
      }
      pending.clear();
    };
  }, []);

  const trackUrl = (url: string) => {
    urlsRef.current.add(url);
  };

  const releaseUrl = (url: string) => {
    if (urlsRef.current.delete(url)) {
      URL.revokeObjectURL(url);
    }
  };

  const runAnalysis = (
    fileId: string,
    extracted: ExtractedPage[],
    chosen: PlatformId
  ) => {
    const text = extracted
      .map((e) => e.items.map((i) => i.str).join(" "))
      .join(" ");
    const platformScores = scorePlatformText(text, PLATFORM_PRESETS);
    const best = pickBestPlatform(platformScores);
    const preset =
      chosen !== "auto"
        ? getPlatformPreset(chosen)
        : best.confidence >= 0.35
          ? getPlatformPreset(best.platform)
          : undefined;
    const labelHeightHint = preset?.labelHeightHint;

    const pages = extracted.map((e) => {
      const result = analyzePage({
        items: e.items,
        blankBands: e.blankBands,
        inkGrid: e.inkGrid,
        labelHeightHint,
      });
      const reviewRequired =
        result.regions.length === 0 ||
        result.regions.some((r) => r.confidence !== "high");
      return {
        pageNumber: e.pageNumber,
        displayWidthPt: e.displayWidthPt,
        displayHeightPt: e.displayHeightPt,
        rotation: e.rotation,
        regions: result.regions,
        reviewRequired,
        accepted: !reviewRequired,
        thumbUrl: e.thumbUrl,
      };
    });

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: "ready",
              error: "",
              pages,
              detectedPlatform: best.platform,
              platformConfidence: best.confidence,
              platformScores,
            }
          : f
      )
    );
  };

  const totalCachedPages = () => {
    let total = 0;
    for (const pages of cacheRef.current.values()) {
      total += pages.length;
    }
    return total;
  };

  const analyzeOne = async (fileId: string, file: File) => {
    try {
      const bytes = await file.arrayBuffer();
      const loaded = await loadPdfForAnalysis(bytes);
      const budget = MAX_TOTAL_PAGES - totalCachedPages();
      if (budget <= 0) {
        loaded.destroy();
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, status: "error", error: s.tooManyPages }
              : f
          )
        );
        return;
      }

      const extracted: ExtractedPage[] = [];
      try {
        for (
          let p = 1;
          p <= loaded.numPages && extracted.length < budget;
          p++
        ) {
          extracted.push(await loaded.getPage(p));
        }
      } finally {
        loaded.destroy();
      }

      if (extracted.length < loaded.numPages) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, status: "error", error: s.tooManyPages }
              : f
          )
        );
        return;
      }

      cacheRef.current.set(fileId, extracted);
      runAnalysis(fileId, extracted, platform);
    } catch (err) {
      console.error(err);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? { ...f, status: "error", error: s.analysisFailed }
            : f
        )
      );
    }
  };

  const addFiles = async (list: FileList | File[]) => {
    setError("");
    const incoming = Array.from(list);
    const valid: File[] = [];

    for (const file of incoming) {
      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        setError(t.messages.invalidFile);
        continue;
      }
      if (file.size > MAX_SIZE) {
        setError(t.messages.fileTooLarge);
        continue;
      }
      valid.push(file);
    }

    const room = MAX_FILES - files.length;
    if (valid.length > room) {
      setError(s.batchLimits);
    }
    const accepted = valid.slice(0, Math.max(0, room));
    if (accepted.length === 0) return;

    const entries: FileAnalysis[] = accepted.map((file) => ({
      id: makeId(),
      file,
      status: "analyzing",
      error: "",
      pages: [],
      detectedPlatform: "auto",
      platformConfidence: 0,
      platformScores: {},
    }));

    setFiles((prev) => [...prev, ...entries]);

    for (const entry of entries) {
      await analyzeOne(entry.id, entry.file);
    }
  };

  const changePlatform = async (next: PlatformId) => {
    setPlatform(next);
    for (const f of files) {
      if (f.status !== "ready") continue;
      const extracted = cacheRef.current.get(f.id);
      if (extracted) runAnalysis(f.id, extracted, next);
    }
  };

  const removeFile = (fileId: string) => {
    cacheRef.current.delete(fileId);
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const clearAll = () => {
    cacheRef.current.clear();
    setFiles([]);
    setError("");
    for (const r of results) releaseUrl(r.url);
    setResults([]);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const openEditor = (fileId: string, pageIndex: number) => {
    setEditing({ fileId, pageIndex });
  };

  const openFirstReview = () => {
    for (const f of files) {
      const index = f.pages.findIndex(
        (p) => p.reviewRequired && !p.accepted
      );
      if (index >= 0) {
        openEditor(f.id, index);
        return;
      }
    }
  };

  const applyRegions = (regions: PageRegion[]) => {
    if (!editing) return;
    const { fileId, pageIndex } = editing;
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              pages: f.pages.map((p, i) =>
                i === pageIndex
                  ? { ...p, regions, reviewRequired: false, accepted: true }
                  : p
              ),
            }
          : f
      )
    );
    setEditing(null);
  };

  const buildPlan = (file: FileAnalysis): BuildPageSpec[] => {
    const specs: BuildPageSpec[] = [];
    file.pages.forEach((page, index) => {
      const matches = [...regionsForMode(page, mode)].sort(
        (a, b) => a.rect.y - b.rect.y
      );
      for (const region of matches) {
        specs.push({ sourcePageIndex: index, rect: region.rect });
      }
    });
    return specs;
  };

  const outputName = (original: string) => {
    const base = original.replace(/\.pdf$/i, "");
    const suffix =
      mode === "label"
        ? "-label"
        : mode === "invoice"
          ? "-invoice"
          : "-label-invoice";
    return `${base}${suffix}.pdf`;
  };

  const generate = async () => {
    if (!size) {
      setError(s.sizeRequired);
      return;
    }
    const ready = files.filter((f) => f.status === "ready");
    if (ready.length === 0) {
      setError(s.noValidFiles);
      return;
    }

    const plans = ready
      .map((file) => ({ file, specs: buildPlan(file) }))
      .filter((p) => p.specs.length > 0);
    const total = plans.reduce((n, p) => n + p.specs.length, 0);
    if (total === 0) {
      setError(s.noRegionForMode);
      return;
    }

    setError("");
    for (const r of results) releaseUrl(r.url);
    setResults([]);
    setGenerating(true);
    setProgress({ done: 0, total });

    const built: OutputFileResult[] = [];
    let doneBase = 0;

    try {
      for (const plan of plans) {
        const sourceBytes = await plan.file.file.arrayBuffer();
        const { bytes, pageCount } = await buildShippingLabelPdf({
          sourceBytes,
          pages: plan.specs,
          outputWidthPt: size.widthPt,
          outputHeightPt: size.heightPt,
          onProgress: (done) =>
            setProgress({ done: doneBase + done, total }),
        });

        const blob = new Blob([bytes.slice().buffer as ArrayBuffer], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        trackUrl(url);
        built.push({
          id: `${plan.file.id}-${built.length}`,
          name: outputName(plan.file.file.name),
          url,
          sizeBytes: blob.size,
          pageCount,
        });

        doneBase += plan.specs.length;
        setProgress({ done: doneBase, total });
      }
      setResults(built);
    } catch (err) {
      console.error(err);
      for (const r of built) releaseUrl(r.url);
      if (err instanceof Error && err.message === BUILD_ERROR_CORRUPT) {
        setError(s.corruptError);
      } else if (
        err instanceof Error &&
        err.message === BUILD_ERROR_EMPTY
      ) {
        setError(s.noRegionForMode);
      } else if (
        err instanceof Error &&
        err.message.includes("too small")
      ) {
        setError(s.cropTooSmall);
      } else {
        setError(t.messages.somethingWentWrong);
      }
    } finally {
      setGenerating(false);
      setProgress(null);
    }
  };

  const downloadAll = async () => {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const r of results) {
      const response = await fetch(r.url);
      const blob = await response.blob();
      zip.file(r.name, blob);
    }
    const out = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(out);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shipping-labels.zip";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (list && list.length > 0) {
      void addFiles(list);
    }
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files;
    if (dropped && dropped.length > 0) {
      void addFiles(dropped);
    }
  };

  const editingFile = editing
    ? files.find((f) => f.id === editing.fileId)
    : null;
  const editingPage =
    editing && editingFile ? editingFile.pages[editing.pageIndex] : null;

  const sizeLabel =
    sizeState.sizeId === "custom"
      ? `${sizeState.customWidth} × ${sizeState.customHeight} ${sizeState.customUnit}`
      : {
          "4x6": s.size4x6,
          "100x150": s.size100x150,
          "3x5": s.size3x5,
          "4x4": s.size4x4,
          a4: s.sizeA4,
          custom: s.sizeCustom,
        }[sizeState.sizeId];

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {toolText.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {toolText.description}
          </p>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {s.platformLabel}
                </span>
                <select
                  value={platform}
                  onChange={(e) =>
                    void changePlatform(e.target.value as PlatformId)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="auto">{s.platformAuto}</option>
                  {PLATFORM_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id === "custom" ? s.platformOther : p.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {s.outputSizeLabel}
                </span>
                <select
                  value={sizeState.sizeId}
                  onChange={(e) =>
                    setSizeState((prev) => ({
                      ...prev,
                      sizeId: e.target
                        .value as OutputSizeState["sizeId"],
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  {OUTPUT_SIZE_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {
                        {
                          "4x6": s.size4x6,
                          "100x150": s.size100x150,
                          "3x5": s.size3x5,
                          "4x4": s.size4x4,
                          a4: s.sizeA4,
                          custom: s.sizeCustom,
                        }[p.id]
                      }
                    </option>
                  ))}
                  <option value="custom">{s.sizeCustom}</option>
                </select>
              </label>

              <div>
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {s.contentLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["label", s.modeLabelOnly],
                      ["invoice", s.modeInvoiceOnly],
                      ["both", s.modeBoth],
                    ] as [OutputMode, string][]
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value)}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        mode === value
                          ? "bg-blue-600 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {sizeState.sizeId === "custom" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">
                    {s.widthLabel}
                  </span>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={sizeState.customWidth}
                    onChange={(e) =>
                      setSizeState((prev) => ({
                        ...prev,
                        customWidth: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">
                    {s.heightLabel}
                  </span>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={sizeState.customHeight}
                    onChange={(e) =>
                      setSizeState((prev) => ({
                        ...prev,
                        customHeight: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">
                    {s.unitLabel}
                  </span>
                  <select
                    value={sizeState.customUnit}
                    onChange={(e) =>
                      setSizeState((prev) => ({
                        ...prev,
                        customUnit: e.target.value as
                          | "mm"
                          | "in",
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="mm">{s.unitMm}</option>
                    <option value="in">{s.unitIn}</option>
                  </select>
                </label>
                <div className="flex items-end">
                  <p className="pb-2 text-xs text-slate-500">
                    {s.widthLabel}: 10–1000 {s.unitMm}
                  </p>
                </div>
              </div>
            )}

            {customInvalid && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {s.customSizeError}
              </p>
            )}

            <div className="mt-4 space-y-1 text-xs leading-5 text-slate-500">
              <p>{s.platformHint}</p>
              <p>{s.modeHint}</p>
              {size && (
                <p>
                  {s.outputSizeLabel}: {sizeLabel} — {Math.round(size.widthPt)}{" "}
                  × {Math.round(size.heightPt)} pt (
                  {Math.round(sizeInMm(size).widthMm * 10) / 10} ×{" "}
                  {Math.round(sizeInMm(size).heightMm * 10) / 10} {s.unitMm})
                </p>
              )}
              <p>{s.printTip}</p>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              multiple
              onChange={handleInput}
              className="hidden"
            />
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📦
            </div>
            <p className="font-semibold text-slate-800">
              {files.length > 0 ? s.replacePdf : s.uploadTitle}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {s.uploadHint} • {s.batchLimits}
            </p>
            <p className="mt-1 text-xs text-slate-400">{s.uploadPrivacy}</p>
          </div>

          {files.length === 0 ? (
            <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
              <div>
                <div className="mb-3 text-4xl">🏷️</div>
                <p className="font-medium text-slate-700">{s.noFilesYet}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="max-w-xl truncate text-sm font-semibold text-slate-800">
                        {file.file.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatBytes(file.file.size)}
                        {file.pages.length > 0 && (
                          <>
                            {" "}
                            • {file.pages.length} {s.pagesWord}
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {file.status === "analyzing" && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {s.analyzing}
                        </span>
                      )}
                      {file.status === "ready" &&
                        platform === "auto" &&
                        file.platformConfidence >= 0.3 &&
                        file.detectedPlatform !== "custom" && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {s.detected}:{" "}
                            {getPlatformLabel(file.detectedPlatform)}
                          </span>
                        )}
                      {file.status === "ready" &&
                        file.pages.some(
                          (p) => p.reviewRequired && !p.accepted
                        ) && (
                          <button
                            type="button"
                            onClick={() => {
                              const index = file.pages.findIndex(
                                (p) => p.reviewRequired && !p.accepted
                              );
                              if (index >= 0) openEditor(file.id, index);
                            }}
                            className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-200"
                          >
                            ⚠ {s.reviewSuggested}
                          </button>
                        )}
                      {file.status === "ready" &&
                        !file.pages.some(
                          (p) => p.reviewRequired && !p.accepted
                        ) && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            ✓ {s.ready}
                          </span>
                        )}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        {t.common.remove}
                      </button>
                    </div>
                  </div>

                  {file.status === "error" && (
                    <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {file.error || s.analysisFailed}
                    </p>
                  )}

                  {file.status === "ready" && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {file.pages.map((page, index) => (
                        <button
                          key={page.pageNumber}
                          type="button"
                          onClick={() => openEditor(file.id, index)}
                          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-blue-400"
                          style={{
                            aspectRatio: `${page.displayWidthPt} / ${page.displayHeightPt}`,
                          }}
                          title={`${s.page} ${page.pageNumber}`}
                        >
                          <img
                            src={page.thumbUrl}
                            alt={`${s.page} ${page.pageNumber}`}
                            className="absolute inset-0 h-full w-full"
                            draggable={false}
                          />
                          {page.regions.map((region, regionIndex) => (
                              <span
                                key={regionIndex}
                                className={`pointer-events-none absolute border-2 ${KIND_COLORS[region.kind]}`}
                                style={{
                                  left: `${region.rect.x * 100}%`,
                                  top: `${region.rect.y * 100}%`,
                                  width: `${region.rect.width * 100}%`,
                                  height: `${region.rect.height * 100}%`,
                                  backgroundColor:
                                    region.kind === "label"
                                      ? "rgba(59,130,246,0.12)"
                                      : region.kind === "invoice"
                                        ? "rgba(147,51,234,0.12)"
                                        : "rgba(100,116,139,0.10)",
                                }}
                              />
                            ))}
                          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {s.page} {page.pageNumber}
                          </span>
                          <span
                            className={`absolute bottom-1 right-1 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white ${
                              page.reviewRequired && !page.accepted
                                ? "bg-amber-500"
                                : "bg-emerald-600"
                            }`}
                          >
                            {page.reviewRequired && !page.accepted
                              ? "⚠"
                              : "✓"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {reviewCount > 0 && !generating && (
              <button
                type="button"
                onClick={openFirstReview}
                className="w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 hover:bg-amber-100"
              >
                ⚠ {s.reviewSuggested} ({reviewCount} {s.pagesWord})
              </button>
            )}

            <button
              type="button"
              onClick={() => void generate()}
              disabled={!canGenerate}
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating
                ? `${s.generating} ${progress ? progress.done : 0}/${progress ? progress.total : 0}`
                : s.generate}
            </button>

            {generating && progress && (
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${Math.round((progress.done / Math.max(progress.total, 1)) * 100)}%`,
                  }}
                />
              </div>
            )}

            {!generating && hasReady && size && selectedCount === 0 && (
              <p className="text-center text-xs font-medium text-amber-600">
                {s.noRegionForMode}
              </p>
            )}
            {!size && (
              <p className="text-center text-xs font-medium text-red-600">
                {s.sizeRequired}
              </p>
            )}
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">
                {s.resultTitle}
              </h2>
              {results.length > 1 && (
                <button
                  type="button"
                  onClick={() => void downloadAll()}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {s.downloadAll}
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">📄</div>
                  <p className="font-medium text-slate-700">
                    {s.noResults}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="min-w-0">
                        <p className="max-w-xl truncate text-sm font-semibold text-slate-800">
                          {result.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatBytes(result.sizeBytes)} •{" "}
                          {result.pageCount} {s.pagesWord}
                        </p>
                      </div>
                      <a
                        href={result.url}
                        download={result.name}
                        className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        {t.common.download}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <iframe
                    src={results[0].url}
                    title={s.resultTitle}
                    className="h-[560px] w-full"
                  />
                </div>

                <p className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
                  {s.printHint}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={clearAll}
            disabled={files.length === 0 && results.length === 0}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.common.clear} & {t.common.reset}
          </button>
        </div>
      </div>

      {editingFile && editingPage && (
        <CropEditor
          thumbUrl={editingPage.thumbUrl}
          displayWidthPt={editingPage.displayWidthPt}
          displayHeightPt={editingPage.displayHeightPt}
          regions={editingPage.regions}
          pageNumber={editingPage.pageNumber}
          fileName={editingFile.file.name}
          strings={s}
          onCancel={() => setEditing(null)}
          onApply={applyRegions}
        />
      )}
    </section>
  );
}
