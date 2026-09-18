"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import pptxgen from "pptxgenjs";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function PDFToPowerPoint() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
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

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPageCount(0);
    setPreviewUrl("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFile = async (selectedFile: File) => {
    setError("");

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PDF file must be smaller than 50 MB.");
      return;
    }

    clearResult();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setPageCount(0);

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const buffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: buffer,
      }).promise;

      setPageCount(pdf.numPages);
    } catch (err) {
      console.error(err);

      setFile(null);
      setPageCount(0);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl("");

      setError(
        "Unable to read this PDF. It may be encrypted or corrupted."
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const convertToPowerPoint = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");
    clearResult();

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const buffer = await file.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: buffer,
      }).promise;

      const pptx = new pptxgen();

      pptx.layout = "LAYOUT_WIDE";
      pptx.author = "ToolsGift";
      pptx.subject = "PDF converted to PowerPoint";
      pptx.title = file.name.replace(/\.pdf$/i, "");
      pptx.company = "ToolsGift";

      const slideWidth = 13.333;
      const slideHeight = 7.5;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale: 1.8,
        });

        const canvas = document.createElement("canvas");

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Unable to create PDF rendering canvas.");
        }

        await page.render({
          canvasContext: context,
          viewport,
          canvas,
        }).promise;

        const imageData = canvas.toDataURL("image/jpeg", 0.92);

        const slide = pptx.addSlide();

        slide.background = {
          color: "FFFFFF",
        };

        slide.addImage({
          data: imageData,
          x: 0,
          y: 0,
          w: slideWidth,
          h: slideHeight,
        });
      }

      const pptxBlob = (await pptx.write({
        outputType: "blob",
      })) as Blob;

      setResultBlob(pptxBlob);
      setResultUrl(URL.createObjectURL(pptxBlob));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert this PDF to PowerPoint. The PDF may be encrypted, corrupted, or too complex."
      );
    } finally {
      setProcessing(false);
    }
  };

  const downloadPowerPoint = () => {
    if (!resultBlob || !resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download =
      `${file?.name.replace(/\.pdf$/i, "") || "converted"}.pptx`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          PDF Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          PDF to PowerPoint
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert PDF pages into a PowerPoint presentation with one slide
          for each page.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload PDF
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your PDF pages will be converted into PowerPoint slides.
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
              accept="application/pdf,.pdf"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              📊
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {file ? "PDF Selected" : "Upload your PDF"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your PDF here or click to browse
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
                    {pageCount > 0 && ` • ${pageCount} pages`}
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
            onClick={convertToPowerPoint}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing
              ? "Converting to PowerPoint..."
              : "Convert to PowerPoint"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Presentation Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your PDF information and conversion result will appear here.
          </p>

          <div className="mt-6 flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6">
            {!file ? (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                  📑
                </div>

                <p className="mt-4 font-medium text-slate-600">
                  No PDF selected
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Upload a PDF to begin.
                </p>
              </div>
            ) : (
              <div className="w-full text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                  📊
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {pageCount || "Loading"}{" "}
                  {pageCount === 1 ? "slide" : "slides"} will be created
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Each PDF page will become a separate PowerPoint slide.
                </p>

                {resultUrl && resultBlob && (
                  <div className="mt-5 rounded-xl bg-green-50 p-4">
                    <p className="font-semibold text-green-700">
                      PowerPoint created successfully
                    </p>

                    <p className="mt-1 text-sm text-green-600">
                      File size: {formatSize(resultBlob.size)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={downloadPowerPoint}
            disabled={!resultUrl || !resultBlob}
            className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            Download PowerPoint
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            PDF pages are rendered locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}


