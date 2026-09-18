"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { toCanvas } from "html-to-image";

export default function HTMLToPDF() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [html, setHtml] = useState("");
  const [fileName, setFileName] = useState("");
  const [paperSize, setPaperSize] = useState<"a4" | "letter">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [margin, setMargin] = useState(20);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const maxFileSize = 10 * 1024 * 1024;

  const defaultHTML = `<div style="font-family: Arial, sans-serif; padding: 30px; background: white; color: #111827;">
  <h1 style="font-size: 30px; margin-bottom: 15px;">Hello from ToolsGift</h1>
  <p style="font-size: 16px; line-height: 1.6;">
    This HTML content can be converted into a PDF document directly in your browser.
  </p>
  <h2 style="margin-top: 25px;">Features</h2>
  <ul style="font-size: 15px; line-height: 1.8;">
    <li>Client-side HTML to PDF conversion</li>
    <li>A4 and Letter paper sizes</li>
    <li>Portrait and Landscape orientation</li>
    <li>Adjustable margins</li>
  </ul>
</div>`;

  const handleFile = async (file: File) => {
    setError("");
    setResultUrl("");
    setResultSize(0);

    if (!file.name.toLowerCase().endsWith(".html") &&
        !file.name.toLowerCase().endsWith(".htm")) {
      setError("Please select an HTML file (.html or .htm).");
      return;
    }

    if (file.size > maxFileSize) {
      setError("File size must be 10MB or less.");
      return;
    }

    try {
      const text = await file.text();

      setHtml(text);
      setFileName(file.name.replace(/\.(html?|HTML?)$/, "") || "document");
    } catch {
      setError("Unable to read the HTML file.");
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const loadSample = () => {
    setError("");
    setResultUrl("");
    setResultSize(0);
    setHtml(defaultHTML);
    setFileName("ToolsGift-document");
  };

  const convertToPDF = async () => {
    if (!html.trim()) {
      setError("Please enter HTML or upload an HTML file first.");
      return;
    }

    setProcessing(true);
    setError("");
    setResultUrl("");

    try {
      const container = document.createElement("div");

      container.style.position = "fixed";
      container.style.left = "-100000px";
      container.style.top = "0";
      container.style.width = orientation === "portrait" ? "794px" : "1123px";
      container.style.background = "#ffffff";
      container.style.padding = "0";
      container.style.boxSizing = "border-box";
      container.style.overflow = "visible";

      container.innerHTML = html;

      document.body.appendChild(container);

      const canvas = await toCanvas(container, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: paperSize,
      });

      const pageWidth = paperSize === "a4" ? 210 : 215.9;
      const pageHeight = paperSize === "a4" ? 297 : 279.4;

      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      const imageRatio = canvas.height / canvas.width;

      const imageWidth = usableWidth;
      const imageHeight = imageWidth * imageRatio;

      let heightLeft = imageHeight;
      let position = margin;

      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        position,
        imageWidth,
        imageHeight
      );

      heightLeft -= usableHeight;

      while (heightLeft > 0) {
        position = margin - (imageHeight - heightLeft);

        pdf.addPage();

        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          position,
          imageWidth,
          imageHeight
        );

        heightLeft -= usableHeight;
      }

      const blob = pdf.output("blob");

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);

      if (!fileName) {
        setFileName("ToolsGift-document");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to convert HTML to PDF. Please check your HTML.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = `${fileName || "ToolsGift-document"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeHTML = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setHtml("");
    setFileName("");
    setResultUrl("");
    setResultSize(0);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 B";

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            HTML to PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Convert HTML files or HTML code into a downloadable PDF directly
            in your browser.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Settings */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Paper Size
              </label>

              <select
                value={paperSize}
                onChange={(e) =>
                  setPaperSize(e.target.value as "a4" | "letter")
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Orientation
              </label>

              <select
                value={orientation}
                onChange={(e) =>
                  setOrientation(
                    e.target.value as "portrait" | "landscape"
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Margin: {margin} mm
              </label>

              <input
                type="range"
                min="5"
                max="40"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="mt-3 w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm,text/html"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📄
            </div>

            <h2 className="text-base font-semibold text-slate-800">
              Upload HTML File
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Drag & drop your HTML file here or click to browse
            </p>

            <p className="mt-2 text-xs text-slate-400">
              HTML / HTM • Maximum 10MB
            </p>
          </div>

          {/* Sample button */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Use Sample HTML
            </button>
          </div>

          {/* HTML Editor */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                HTML Code
              </label>

              {fileName && (
                <span className="text-xs text-slate-500">
                  {fileName}.html
                </span>
              )}
            </div>

            <textarea
              value={html}
              onChange={(e) => {
                setHtml(e.target.value);
                setResultUrl("");
                setResultSize(0);
              }}
              placeholder="<h1>Hello World</h1>"
              spellCheck={false}
              className="min-h-[280px] w-full rounded-2xl border border-slate-300 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 outline-none focus:border-blue-500"
            />
          </div>

          {/* Live Preview */}
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold text-slate-700">
              HTML Preview
            </div>

            <div
              ref={previewRef}
              className="max-h-[500px] overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-4"
            >
              <div
                className="mx-auto min-h-[250px] max-w-3xl bg-white shadow-sm"
                dangerouslySetInnerHTML={{
                  __html:
                    html ||
                    `<div style="padding:40px;text-align:center;color:#94a3b8;font-family:Arial,sans-serif;">
                      Your HTML preview will appear here.
                    </div>`,
                }}
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Convert */}
          <button
            type="button"
            onClick={convertToPDF}
            disabled={!html.trim() || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? "Converting HTML to PDF..." : "Convert to PDF"}
          </button>

          {/* Result */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                PDF Result
              </h2>

              {resultSize > 0 && (
                <span className="text-sm text-slate-500">
                  {formatBytes(resultSize)}
                </span>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {resultUrl ? (
                <iframe
                  src={resultUrl}
                  title="Generated PDF"
                  className="h-[600px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                  <div>
                    <div className="mb-3 text-4xl">📑</div>

                    <p className="font-medium text-slate-700">
                      Your converted PDF will appear here
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Enter HTML or upload an HTML file, then click Convert to
                      PDF.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Download always visible */}
            <button
              type="button"
              onClick={downloadPDF}
              disabled={!resultUrl}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download PDF
            </button>
          </div>

          {/* Remove / Reset */}
          <button
            type="button"
            onClick={removeHTML}
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}

