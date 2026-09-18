"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import JSZip from "jszip";
import jsPDF from "jspdf";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type SlideInfo = {
  number: number;
  title: string;
  text: string;
};

export default function PowerPointToPDF() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [slides, setSlides] = useState<SlideInfo[]>([]);
  const [processing, setProcessing] = useState(false);

  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");

  const clearResult = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setResultUrl("");
    setResultBlob(null);
  };

  const reset = () => {
    clearResult();
    setFile(null);
    setSlides([]);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const parsePowerPoint = async (selectedFile: File) => {
    const zip = await JSZip.loadAsync(selectedFile);

    const slideFiles = Object.keys(zip.files)
      .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
      .sort((a, b) => {
        const aNumber = Number(a.match(/slide(\d+)\.xml/i)?.[1] || 0);
        const bNumber = Number(b.match(/slide(\d+)\.xml/i)?.[1] || 0);

        return aNumber - bNumber;
      });

    if (slideFiles.length === 0) {
      throw new Error("No slides found.");
    }

    const parsedSlides: SlideInfo[] = [];

    for (let index = 0; index < slideFiles.length; index++) {
      const xml = await zip.files[slideFiles[index]].async("text");

      const parser = new DOMParser();
      const documentXml = parser.parseFromString(
        xml,
        "application/xml"
      );

      const textNodes = Array.from(
        documentXml.getElementsByTagName("a:t")
      );

      const text = textNodes
        .map((node) => node.textContent || "")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const title =
        text
          .split(/\s+/)
          .slice(0, 12)
          .join(" ") || `Slide ${index + 1}`;

      parsedSlides.push({
        number: index + 1,
        title,
        text,
      });
    }

    return parsedSlides;
  };

  const handleFile = async (selectedFile: File) => {
    setError("");

    const isPowerPoint =
      selectedFile.name.toLowerCase().endsWith(".pptx") ||
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    if (!isPowerPoint) {
      setError("Please select a valid PPTX PowerPoint file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PowerPoint file must be smaller than 50 MB.");
      return;
    }

    clearResult();
    setFile(selectedFile);
    setSlides([]);

    try {
      const parsedSlides = await parsePowerPoint(selectedFile);

      setSlides(parsedSlides);
    } catch (err) {
      console.error(err);

      setFile(null);
      setSlides([]);

      setError(
        "Unable to read this PowerPoint file. The file may be corrupted or unsupported."
      );
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const convertToPDF = async () => {
    if (!file || slides.length === 0) return;

    setProcessing(true);
    setError("");
    clearResult();

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = 297;
      const pageHeight = 210;

      const margin = 18;
      const contentWidth = pageWidth - margin * 2;

      slides.forEach((slide, index) => {
        if (index > 0) {
          pdf.addPage();
        }

        pdf.setFillColor(248, 250, 252);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");

        pdf.setTextColor(15, 23, 42);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(24);

        const titleLines = pdf.splitTextToSize(
          slide.title,
          contentWidth
        );

        pdf.text(titleLines, margin, 30);

        const titleHeight =
          Math.max(titleLines.length, 1) * 10;

        pdf.setDrawColor(203, 213, 225);
        pdf.line(
          margin,
          38 + titleHeight,
          pageWidth - margin,
          38 + titleHeight
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(13);

        const bodyText =
          slide.text ||
          "This slide does not contain selectable text.";

        const bodyLines = pdf.splitTextToSize(
          bodyText,
          contentWidth
        );

        pdf.text(
          bodyLines,
          margin,
          55 + titleHeight
        );

        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);

        pdf.text(
          `Slide ${slide.number} â€¢ Converted by ToolsGift`,
          margin,
          pageHeight - 10
        );
      });

      const blob = pdf.output("blob");

      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert the PowerPoint presentation to PDF."
      );
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultBlob || !resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;

    link.download =
      `${file?.name.replace(/\.pptx$/i, "") || "presentation"}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Document Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          PowerPoint to PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert PowerPoint presentations into PDF documents online.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload PowerPoint
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload a PPTX presentation to convert its slide content.
          </p>

          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="mt-6 cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              ðŸ“Š
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {file
                ? "PowerPoint Selected"
                : "Upload your PowerPoint"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your PPTX here or click to browse
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Maximum file size: 50 MB
            </p>
          </div>

          {file && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {formatSize(file.size)}
                    {slides.length > 0 &&
                      ` â€¢ ${slides.length} slides`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    reset();
                  }}
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={convertToPDF}
            disabled={
              !file ||
              slides.length === 0 ||
              processing
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing
              ? "Converting to PDF..."
              : "Convert to PDF"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Presentation Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your slide information will appear here.
          </p>

          <div className="mt-6 min-h-[320px] overflow-auto rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4">
            {slides.length === 0 ? (
              <div className="flex min-h-[280px] items-center justify-center text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                    ðŸ“‘
                  </div>

                  <p className="mt-4 font-medium text-slate-600">
                    No presentation selected
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload a PPTX file to preview its slides.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {slides.slice(0, 10).map((slide) => (
                  <div
                    key={slide.number}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                        {slide.number}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">
                          {slide.title}
                        </p>

                        <p className="mt-1 line-clamp-3 text-sm text-slate-500">
                          {slide.text ||
                            "No selectable text on this slide."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {slides.length > 10 && (
                  <p className="text-center text-xs text-slate-400">
                    Showing first 10 slides. All {slides.length} slides
                    will be converted.
                  </p>
                )}
              </div>
            )}
          </div>

          {resultBlob && (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-700">
                PDF created successfully
              </p>

              <p className="mt-1 text-sm text-green-600">
                File size: {formatSize(resultBlob.size)}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={downloadPDF}
            disabled={!resultUrl || !resultBlob}
            className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            Download PDF
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Your presentation is processed locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
