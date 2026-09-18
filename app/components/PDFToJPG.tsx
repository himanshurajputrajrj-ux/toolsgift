"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import JSZip from "jszip";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PageResult = {
  page: number;
  blob: Blob;
  url: string;
};

export default function PDFToJPG() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const [quality, setQuality] = useState(0.92);
  const [scale, setScale] = useState(1.5);

  const [results, setResults] = useState<PageResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const clearResults = () => {
    results.forEach((result) => {
      URL.revokeObjectURL(result.url);
    });

    setResults([]);
  };

  const reset = () => {
    clearResults();

    setFile(null);
    setPageCount(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFile = async (selectedFile: File) => {
    setError("");

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PDF file must be smaller than 50 MB.");
      return;
    }

    clearResults();

    setFile(selectedFile);
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

      setError(
        "Unable to read this PDF. It may be encrypted or corrupted."
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

  const convertToJPG = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");
    clearResults();

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const buffer = await file.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: buffer,
      }).promise;

      const convertedPages: PageResult[] = [];

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale,
        });

        const canvas = document.createElement("canvas");

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error(
            "Unable to create rendering canvas."
          );
        }

        context.fillStyle = "#ffffff";

        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        await page.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise;

        const blob = await new Promise<Blob>(
          (resolve, reject) => {
            canvas.toBlob(
              (value) => {
                if (value) {
                  resolve(value);
                } else {
                  reject(
                    new Error(
                      "Unable to create JPG image."
                    )
                  );
                }
              },
              "image/jpeg",
              quality
            );
          }
        );

        convertedPages.push({
          page: pageNumber,
          blob,
          url: URL.createObjectURL(blob),
        });
      }

      setResults(convertedPages);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert the PDF pages to JPG."
      );
    } finally {
      setProcessing(false);
    }
  };

  const downloadSingle = (result: PageResult) => {
    const baseName =
      file?.name.replace(/\.pdf$/i, "") ||
      "document";

    const link = document.createElement("a");

    link.href = result.url;
    link.download = `${baseName}-page-${result.page}.jpg`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadAll = async () => {
    if (results.length === 0) return;

    try {
      const zip = new JSZip();

      const baseName =
        file?.name.replace(/\.pdf$/i, "") ||
        "document";

      results.forEach((result) => {
        zip.file(
          `${baseName}-page-${result.page}.jpg`,
          result.blob
        );
      });

      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6,
        },
      });

      const url = URL.createObjectURL(zipBlob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${baseName}-jpg-images.zip`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to create the ZIP download."
      );
    }
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
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          PDF Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          PDF to JPG
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert PDF pages into high-quality JPG images directly in
          your browser.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Conversion Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Adjust JPG quality and rendering resolution.
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                JPG Quality
              </label>

              <span className="text-sm font-bold text-blue-600">
                {Math.round(quality * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="1"
              step="0.01"
              value={quality}
              onChange={(event) =>
                setQuality(
                  Number(event.target.value)
                )
              }
              className="mt-3 w-full accent-blue-600"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-700">
              Resolution
            </label>

            <select
              value={scale}
              onChange={(event) =>
                setScale(
                  Number(event.target.value)
                )
              }
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="1">Standard</option>
              <option value="1.5">High</option>
              <option value="2">Very High</option>
              <option value="2.5">Maximum</option>
            </select>
          </div>

          <div
            onDragOver={(event) =>
              event.preventDefault()
            }
            onDrop={handleDrop}
            onClick={() =>
              inputRef.current?.click()
            }
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
              🖼️
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {file
                ? "PDF Selected"
                : "Upload your PDF"}
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
                    {pageCount > 0 &&
                      ` • ${pageCount} pages`}
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
            onClick={convertToJPG}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing
              ? "Converting PDF to JPG..."
              : "Convert to JPG"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                JPG Results
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Converted pages will appear here.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {results.length} images
            </span>
          </div>

          <div className="mt-6 min-h-[330px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4">
            {results.length === 0 ? (
              <div className="flex min-h-[290px] items-center justify-center text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                    🖼️
                  </div>

                  <p className="mt-4 font-medium text-slate-600">
                    No JPG images yet
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload a PDF and convert it to JPG.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid max-h-[500px] gap-4 overflow-auto sm:grid-cols-2">
                {results.map((result) => (
                  <div
                    key={result.page}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <img
                      src={result.url}
                      alt={`PDF page ${result.page}`}
                      className="h-40 w-full object-contain bg-slate-100"
                    />

                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          Page {result.page}
                        </p>

                        <p className="text-xs text-slate-400">
                          {formatSize(
                            result.blob.size
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          downloadSingle(result)
                        }
                        className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Download JPG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={downloadAll}
            disabled={results.length === 0}
            className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            Download All JPGs (ZIP)
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            All PDF pages are rendered locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
