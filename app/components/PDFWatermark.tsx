"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";

export default function PDFWatermark() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(40);
  const [opacity, setOpacity] = useState(0.25);
  const [rotation, setRotation] = useState(-45);

  const [color, setColor] = useState("#64748b");
  const [position, setPosition] = useState("center");

  const [allPages, setAllPages] = useState(true);
  const [selectedPage, setSelectedPage] = useState(1);

  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

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

  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");

    const bigint = parseInt(clean, 16);

    return {
      r: ((bigint >> 16) & 255) / 255,
      g: ((bigint >> 8) & 255) / 255,
      b: (bigint & 255) / 255,
    };
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

  const addWatermark = async () => {
    if (!pdfData) {
      setError("Please upload a PDF first.");
      return;
    }

    if (!watermarkText.trim()) {
      setError("Please enter watermark text.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const pdfDoc = await PDFDocument.load(pdfData);
      const pages = pdfDoc.getPages();

      const font = await pdfDoc.embedFont(
        "Helvetica"
      );

      const { r, g, b } = hexToRgb(color);

      const pagesToWatermark = allPages
        ? pages
        : [pages[selectedPage - 1]];

      for (const page of pagesToWatermark) {
        if (!page) continue;

        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();

        const textWidth = font.widthOfTextAtSize(
          watermarkText,
          fontSize
        );

        const textHeight = font.heightAtSize(
          fontSize
        );

        let x = 0;
        let y = 0;

        /*
         * Position calculations
         */

        if (position === "top-left") {
          x = 40;
          y = pageHeight - textHeight - 40;
        }

        if (position === "top-center") {
          x = (pageWidth - textWidth) / 2;
          y = pageHeight - textHeight - 40;
        }

        if (position === "top-right") {
          x = pageWidth - textWidth - 40;
          y = pageHeight - textHeight - 40;
        }

        if (position === "center") {
          x = (pageWidth - textWidth) / 2;
          y = (pageHeight - textHeight) / 2;
        }

        if (position === "bottom-left") {
          x = 40;
          y = 40;
        }

        if (position === "bottom-center") {
          x = (pageWidth - textWidth) / 2;
          y = 40;
        }

        if (position === "bottom-right") {
          x = pageWidth - textWidth - 40;
          y = 40;
        }

        /*
         * Keep watermark inside page
         */

        x = Math.max(
          10,
          Math.min(
            x,
            pageWidth - textWidth - 10
          )
        );

        y = Math.max(
          10,
          Math.min(
            y,
            pageHeight - textHeight - 10
          )
        );

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(rotation),
        });
      }

      const outputBytes = await pdfDoc.save();

      const blob = new Blob(
        [new Uint8Array(outputBytes).slice().buffer],
        {
          type: "application/pdf",
        }
      );

      const url = URL.createObjectURL(blob);

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to add watermark to this PDF."
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

    setResultUrl("");
    setResultSize(0);

    setError("");

    setSelectedPage(1);

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
          PDF Watermark
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Add custom text watermarks to your PDF
          documents quickly and easily.
        </p>
      </div>

      {/* Upload */}

      {!file ? (
        <div
          onDragOver={(event) =>
            event.preventDefault()
          }
          onDrop={handleDrop}
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            💧
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Upload your PDF
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Drag & drop your PDF here or click to
            browse
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
          {/* File */}

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
                  {formatBytes(file.size)} •{" "}
                  {pageCount} page
                  {pageCount !== 1
                    ? "s"
                    : ""}
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
            {/* Text settings */}

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                Watermark Settings
              </h2>

              <div className="space-y-5">
                {/* Text */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Watermark Text
                  </label>

                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(event) =>
                      setWatermarkText(
                        event.target.value
                      )
                    }
                    placeholder="CONFIDENTIAL"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Font Size */}

                <div>
                  <div className="mb-2 flex justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Font Size
                    </label>

                    <span className="text-sm font-semibold text-blue-600">
                      {fontSize}px
                    </span>
                  </div>

                  <input
                    type="range"
                    min="12"
                    max="100"
                    value={fontSize}
                    onChange={(event) =>
                      setFontSize(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full"
                  />
                </div>

                {/* Opacity */}

                <div>
                  <div className="mb-2 flex justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Opacity
                    </label>

                    <span className="text-sm font-semibold text-blue-600">
                      {Math.round(
                        opacity * 100
                      )}
                      %
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={(event) =>
                      setOpacity(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full"
                  />
                </div>

                {/* Rotation */}

                <div>
                  <div className="mb-2 flex justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Rotation
                    </label>

                    <span className="text-sm font-semibold text-blue-600">
                      {rotation}°
                    </span>
                  </div>

                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={rotation}
                    onChange={(event) =>
                      setRotation(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full"
                  />
                </div>

                {/* Color */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Watermark Color
                  </label>

                  <div className="flex items-center gap-3">
                    {[
                      "#64748b",
                      "#111827",
                      "#1d4ed8",
                      "#dc2626",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setColor(item)
                        }
                        className={`h-9 w-9 rounded-full border-2 border-white shadow ring-1 ring-slate-200 ${
                          color === item
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            item,
                        }}
                        aria-label={`Select ${item}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Position settings */}

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                Placement
              </h2>

              <div className="space-y-5">
                {/* Position */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Watermark Position
                  </label>

                  <select
                    value={position}
                    onChange={(event) =>
                      setPosition(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="top-left">
                      Top Left
                    </option>

                    <option value="top-center">
                      Top Center
                    </option>

                    <option value="top-right">
                      Top Right
                    </option>

                    <option value="center">
                      Center
                    </option>

                    <option value="bottom-left">
                      Bottom Left
                    </option>

                    <option value="bottom-center">
                      Bottom Center
                    </option>

                    <option value="bottom-right">
                      Bottom Right
                    </option>
                  </select>
                </div>

                {/* Pages */}

                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Apply Watermark To
                  </label>

                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                      <input
                        type="radio"
                        checked={allPages}
                        onChange={() =>
                          setAllPages(true)
                        }
                      />

                      <span className="text-sm font-medium text-slate-700">
                        All Pages
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                      <input
                        type="radio"
                        checked={!allPages}
                        onChange={() =>
                          setAllPages(false)
                        }
                      />

                      <span className="text-sm font-medium text-slate-700">
                        Selected Page
                      </span>
                    </label>
                  </div>
                </div>

                {/* Page number */}

                {!allPages && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Page Number
                    </label>

                    <input
                      type="number"
                      min="1"
                      max={pageCount}
                      value={selectedPage}
                      onChange={(event) => {
                        const value =
                          Number(
                            event.target.value
                          );

                        setSelectedPage(
                          Math.max(
                            1,
                            Math.min(
                              pageCount,
                              value
                            )
                          )
                        );
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {/* Info */}

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
                  The watermark will be added to the
                  selected position while keeping the
                  original PDF content intact.
                </div>
              </div>
            </div>
          </div>

          {/* Action */}

          <button
            type="button"
            onClick={addWatermark}
            disabled={
              processing ||
              !watermarkText.trim()
            }
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing
              ? "Adding Watermark..."
              : "Add Watermark"}
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
            Watermarked PDF
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your processed PDF will appear here after
            watermarking.
          </p>
        </div>

        {resultUrl ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="mb-4">
              <p className="font-semibold text-green-800">
                Watermark added successfully
              </p>

              <p className="mt-1 text-sm text-green-700">
                Output size:{" "}
                {formatBytes(resultSize)}
              </p>
            </div>

            <iframe
              src={resultUrl}
              title="Watermarked PDF Preview"
              className="h-[500px] w-full rounded-xl border border-slate-200 bg-white"
            />
          </div>
        ) : (
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
            <div>
              <div className="mb-2 text-3xl">
                💧
              </div>

              <p className="font-medium text-slate-600">
                No watermarked PDF yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Upload a PDF and add your watermark
                to see the result here.
              </p>
            </div>
          </div>
        )}

        {/* Download always visible */}

        <a
          href={resultUrl || undefined}
          download="watermarked-document.pdf"
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
          Download Watermarked PDF
        </a>
      </div>
    </section>
  );
}


