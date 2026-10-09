"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { ShippingLabelStrings } from "@/app/i18n/translations";
import type { PageRegion, Rect, RegionKind } from "@/app/lib/shipping-label/types";

type CropEditorProps = {
  thumbUrl: string;
  displayWidthPt: number;
  displayHeightPt: number;
  regions: PageRegion[];
  pageNumber: number;
  fileName: string;
  strings: ShippingLabelStrings;
  onCancel: () => void;
  onApply: (regions: PageRegion[]) => void;
};

type DragState = {
  pointerId: number;
  mode: "move" | "nw" | "ne" | "sw" | "se";
  index: number;
  startClientX: number;
  startClientY: number;
  startRect: Rect;
  containerWidth: number;
  containerHeight: number;
};

const MIN_SIZE = 0.03;

const HANDLE_CURSORS: Record<DragState["mode"], string | undefined> = {
  move: undefined,
  nw: "cursor-nw-resize",
  ne: "cursor-ne-resize",
  sw: "cursor-sw-resize",
  se: "cursor-se-resize",
};

const KIND_STYLES: Record<RegionKind, { border: string; badge: string; label: keyof ShippingLabelStrings }> = {
  label: {
    border: "border-blue-500",
    badge: "bg-blue-600",
    label: "kindLabel",
  },
  invoice: {
    border: "border-purple-500",
    badge: "bg-purple-600",
    label: "kindInvoice",
  },
  full: {
    border: "border-slate-500",
    badge: "bg-slate-600",
    label: "kindFull",
  },
};

function clampRect(rect: Rect): Rect {
  const x = Math.min(Math.max(rect.x, 0), 1);
  const y = Math.min(Math.max(rect.y, 0), 1);
  const width = Math.min(Math.max(rect.width, MIN_SIZE), 1 - x);
  const height = Math.min(Math.max(rect.height, MIN_SIZE), 1 - y);
  return { x, y, width, height };
}

export default function CropEditor({
  thumbUrl,
  displayWidthPt,
  displayHeightPt,
  regions,
  pageNumber,
  fileName,
  strings,
  onCancel,
  onApply,
}: CropEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [draft, setDraft] = useState<PageRegion[]>(() =>
    regions.map((r) => ({ ...r, rect: { ...r.rect } }))
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const active = draft[activeIndex];

  const beginDrag = (
    event: ReactPointerEvent<HTMLElement>,
    index: number,
    mode: DragState["mode"]
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();
    const region = draft[index];
    if (!region) return;

    setActiveIndex(index);
    dragRef.current = {
      pointerId: event.pointerId,
      mode,
      index,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startRect: { ...region.rect },
      containerWidth: bounds.width,
      containerHeight: bounds.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();

    const dx = (event.clientX - drag.startClientX) / drag.containerWidth;
    const dy = (event.clientY - drag.startClientY) / drag.containerHeight;
    const start = drag.startRect;
    let rect: Rect;

    switch (drag.mode) {
      case "move":
        rect = { ...start, x: start.x + dx, y: start.y + dy };
        break;
      case "nw":
        rect = clampRect({
          x: start.x + dx,
          y: start.y + dy,
          width: start.width - dx,
          height: start.height - dy,
        });
        break;
      case "ne":
        rect = clampRect({
          x: start.x,
          y: start.y + dy,
          width: start.width + dx,
          height: start.height - dy,
        });
        break;
      case "sw":
        rect = clampRect({
          x: start.x + dx,
          y: start.y,
          width: start.width - dx,
          height: start.height + dy,
        });
        break;
      case "se":
        rect = clampRect({
          x: start.x,
          y: start.y,
          width: start.width + dx,
          height: start.height + dy,
        });
        break;
      default:
        return;
    }

    setDraft((prev) =>
      prev.map((region, i) =>
        i === drag.index ? { ...region, rect: clampRect(rect) } : region
      )
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (drag && drag.pointerId === event.pointerId) {
      dragRef.current = null;
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer capture may already be released.
      }
    }
  };

  const setActiveKind = (kind: RegionKind) => {
    if (!active) return;
    setDraft((prev) =>
      prev.map((region, i) => (i === activeIndex ? { ...region, kind } : region))
    );
  };

  const makeFullPage = () => {
    if (!active) return;
    setDraft((prev) =>
      prev.map((region, i) =>
        i === activeIndex
          ? { ...region, kind: "full", rect: { x: 0, y: 0, width: 1, height: 1 } }
          : region
      )
    );
  };

  const addRegion = (kind: RegionKind) => {
    const rect: Rect =
      kind === "label"
        ? { x: 0.1, y: 0.08, width: 0.8, height: 0.4 }
        : { x: 0.1, y: 0.52, width: 0.8, height: 0.4 };
    setDraft((prev) => [
      ...prev,
      { kind, rect, confidence: "high", source: "manual" },
    ]);
    setActiveIndex(draft.length);
  };

  const removeActive = () => {
    if (draft.length <= 1) return;
    setDraft((prev) => prev.filter((_, i) => i !== activeIndex));
    setActiveIndex(0);
  };

  const reset = () => {
    setDraft(regions.map((r) => ({ ...r, rect: { ...r.rect } })));
    setActiveIndex(0);
  };

  const apply = () => {
    onApply(
      draft.map((region) => ({
        ...region,
        rect: clampRect(region.rect),
        source: "manual",
        confidence: "high",
      }))
    );
  };

  const missingKinds = (["label", "invoice"] as RegionKind[]).filter(
    (kind) => !draft.some((r) => r.kind === kind)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {strings.editorTitle}
            </h3>
            <p className="mt-0.5 truncate text-xs text-slate-500">
              {fileName} — {strings.page} {pageNumber} ·{" "}
              {Math.round(displayWidthPt)} × {Math.round(displayHeightPt)} pt
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <p className="mb-3 text-xs leading-5 text-slate-500">
            {strings.editorHint}
          </p>

          <div
            ref={containerRef}
            className="relative mx-auto w-full max-w-2xl touch-none select-none overflow-hidden rounded-xl border border-slate-300 bg-slate-100"
            style={{ aspectRatio: `${displayWidthPt} / ${displayHeightPt}` }}
          >
            <img
              src={thumbUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full"
              draggable={false}
            />

            {/* eslint-disable-next-line react-hooks/refs -- handlers below run only on pointer events, never during render */}
            {draft.map((region, index) => {
              const style = KIND_STYLES[region.kind] ?? KIND_STYLES.full;
              const isActive = index === activeIndex;
              return (
                <div
                  key={`${region.kind}-${index}`}
                  onPointerDown={(e) => beginDrag(e, index, "move")}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  className={`absolute cursor-move border-2 ${style.border} ${
                    isActive ? "bg-transparent" : "bg-black/5"
                  }`}
                  style={{
                    left: `${region.rect.x * 100}%`,
                    top: `${region.rect.y * 100}%`,
                    width: `${region.rect.width * 100}%`,
                    height: `${region.rect.height * 100}%`,
                    outline: isActive ? "2px solid rgba(255,255,255,0.8)" : undefined,
                    outlineOffset: "-4px",
                  }}
                >
                  <span
                    className={`absolute -top-6 left-0 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white ${style.badge}`}
                  >
                    {strings[style.label]}
                  </span>

                  {isActive &&
                    (["nw", "ne", "sw", "se"] as const).map((handle) => (
                      <span
                        key={handle}
                        onPointerDown={(e) => beginDrag(e, index, handle)}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                        className={`absolute h-3 w-3 rounded-sm border border-white bg-slate-800 ${HANDLE_CURSORS[handle]}`}
                        style={{
                          left: handle === "nw" || handle === "sw" ? "-6px" : undefined,
                          right: handle === "ne" || handle === "se" ? "-6px" : undefined,
                          top: handle === "nw" || handle === "ne" ? "-6px" : undefined,
                          bottom: handle === "sw" || handle === "se" ? "-6px" : undefined,
                        }}
                      />
                    ))}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-slate-600">
                {strings.regionType}
              </span>
              {(["label", "invoice", "full"] as RegionKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setActiveKind(kind)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    active?.kind === kind
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {strings[KIND_STYLES[kind].label]}
                </button>
              ))}
              <button
                type="button"
                onClick={makeFullPage}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                {strings.fullPage}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {missingKinds.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => addRegion(kind)}
                  className="rounded-lg border border-dashed border-slate-400 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600"
                >
                  + {strings[KIND_STYLES[kind].label]}
                </button>
              ))}
              {draft.length > 1 && (
                <button
                  type="button"
                  onClick={removeActive}
                  className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  {strings.removeRegion}
                </button>
              )}
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                {strings.resetRegions}
              </button>
            </div>

            <p className="mt-3 text-[11px] leading-4 text-slate-500">
              {strings.sizeHint} {Math.round(displayWidthPt)} ×{" "}
              {Math.round(displayHeightPt)} pt.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {strings.cancel}
          </button>
          <button
            type="button"
            onClick={apply}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {strings.applySelection}
          </button>
        </div>
      </div>
    </div>
  );
}
