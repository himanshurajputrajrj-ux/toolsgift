"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFDocument, degrees } from "pdf-lib";

export default function PDFRotator() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const [rotation, setRotation] = useState(90);
  const [applyTo, setApplyTo] = useState<"all" | "selected">("all");
  const [selectedPage, setSelectedPage] = useState(1);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${
      units[index]
    }`;
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setResultUrl("");
    setResultSize(0);

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PDF size must be 50MB or less.");
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);

      setFile(selectedFile);
      setPdfData(buffer);
      setPageCount(pdf.getPageCount());
      setSelectedPage(1);
    } catch (err) {
      console.error(err);
      setError("Unable to read this PDF file.");
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const rotatePDF = async () => {
    if (!pdfData) {
      setError("Please upload a PDF first.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const pdfDoc = await PDFDocument.load(pdfData);
      const pages = pdfDoc.getPages();

      if (applyTo === "selected") {
        const page = pages[selectedPage - 1];

        if (!page) {
          throw new Error("Selected page not found.");
        }

        const currentRotation = page.getRotation().angle;

        page.setRotation(
          degrees(currentRotation + rotation)
        );
      } else {
        pages.forEach((page) => {
          const currentRotation =
            page.getRotation().angle;

          page.setRotation(
            degrees(currentRotation + rotation)
          );
        });
      }

      const outputBytes = await pdfDoc.save();

      const blob = new Blob([new Uint8Array(outputBytes).slice().buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to rotate this PDF. Please try another PDF."
      );
    } finally {
      setProcessing(false);
    }
  };

  const removePDF = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setPdfData(null);
    setPageCount(0);

    setRotation(90);
    setApplyTo("all");
    setSelectedPage(1);

    setResultUrl("");
    setResultSize(0);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      {/* Header */}

      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
          PDF Tools
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Rotate PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Rotate PDF pages by 90°, 180°, or 270° and
          download the rotated document.
        </p>
      </div>

      {/* Upload */}

      {!file ? (
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            🔄
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Upload your PDF
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Drag & drop your PDF here or click to browse
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Maximum file size: 50MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* File Info */}

          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
                📄
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {file.name}
                </p>

                <p className="text-sm text-slate-500">
                  {formatBytes(file.size)} • {pageCount} page
                  {pageCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removePDF}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Remove PDF
            </button>
          </div>

          {/* Settings */}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Rotation */}

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                Rotation Angle
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {[90, 180, 270].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRotation(value)}
                    className={`rounded-xl border px-4 py-4 transition ${
                      rotation === value
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <span className="block text-2xl">
                      {value === 90
                        ? "↻"
                        : value === 180
                        ? "↻"
                        : "↺"}
                    </span>

                    <span className="mt-1 block text-sm font-semibold">
                      {value}°
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
                The selected rotation will be applied
                clockwise while preserving the PDF content.
              </div>
            </div>

            {/* Page Settings */}

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                Apply Rotation To
              </h2>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <input
                    type="radio"
                    name="applyTo"
                    checked={applyTo === "all"}
                    onChange={() => setApplyTo("all")}
                  />

                  <div>
                    <p className="font-medium text-slate-800">
                      All Pages
                    </p>

                    <p className="text-xs text-slate-500">
                      Rotate every page in the PDF
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <input
                    type="radio"
                    name="applyTo"
                    checked={applyTo === "selected"}
                    onChange={() => setApplyTo("selected")}
                  />

                  <div>
                    <p className="font-medium text-slate-800">
                      Selected Page
                    </p>

                    <p className="text-xs text-slate-500">
                      Rotate only one page
                    </p>
                  </div>
                </label>
              </div>

              {applyTo === "selected" && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Page Number
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={pageCount}
                    value={selectedPage}
                    onChange={(event) => {
                      const value = Number(
                        event.target.value
                      );

                      setSelectedPage(
                        Math.max(
                          1,
                          Math.min(pageCount, value)
                        )
                      );
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action */}

          <button
            type="button"
            onClick={rotatePDF}
            disabled={processing}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing
              ? "Rotating PDF..."
              : `Rotate PDF ${rotation}°`}
          </button>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Result */}

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Rotated PDF
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your rotated PDF will appear here after processing.
          </p>
        </div>

        {resultUrl ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="mb-4">
              <p className="font-semibold text-green-800">
                PDF rotated successfully
              </p>

              <p className="mt-1 text-sm text-green-700">
                Output size: {formatBytes(resultSize)}
              </p>
            </div>

            <iframe
              src={resultUrl}
              title="Rotated PDF Preview"
              className="h-[500px] w-full rounded-xl border border-slate-200 bg-white"
            />
          </div>
        ) : (
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
            <div>
              <div className="mb-2 text-3xl">🔄</div>

              <p className="font-medium text-slate-600">
                No rotated PDF yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Upload a PDF and choose the rotation settings
                to get started.
              </p>
            </div>
          </div>
        )}

        {/* Download Always Visible */}

        <a
          href={resultUrl || undefined}
          download="rotated-document.pdf"
          onClick={(event) => {
            if (!resultUrl) {
              event.preventDefault();
            }
          }}
          className={`mt-5 block w-full rounded-2xl px-5 py-4 text-center font-semibold transition ${
            resultUrl
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          Download Rotated PDF
        </a>
      </div>
    </section>
  );
}


