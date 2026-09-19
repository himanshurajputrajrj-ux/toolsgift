"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import mammoth from "mammoth";
import jsPDF from "jspdf";
import { toCanvas } from "html-to-image";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export default function WordToPDF() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState("");
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
    setHtmlContent("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const loadWordFile = async (selectedFile: File) => {
    setError("");

    const isWord =
      selectedFile.name.toLowerCase().endsWith(".docx") ||
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isWord) {
      setError("Please select a valid DOCX Word document.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Word file must be smaller than 25 MB.");
      return;
    }

    clearResult();
    setFile(selectedFile);
    setHtmlContent("");

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const result = await mammoth.convertToHtml({
        arrayBuffer,
      });

      if (!result.value.trim()) {
        throw new Error("No readable content found.");
      }

      setHtmlContent(result.value);
    } catch (err) {
      console.error(err);

      setFile(null);
      setHtmlContent("");

      setError(
        "Unable to read this Word document. The file may be corrupted or unsupported."
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      loadWordFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      loadWordFile(droppedFile);
    }
  };

  const convertToPDF = async () => {
    if (!file || !htmlContent || !previewRef.current) return;

    setProcessing(true);
    setError("");
    clearResult();

    try {
      const canvas = await toCanvas(previewRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const margin = 10;

      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;

      const imageRatio = imgWidth / imgHeight;

      const renderWidth = contentWidth;
      const renderHeight = renderWidth / imageRatio;

      if (renderHeight <= contentHeight) {
        const imageData = canvas.toDataURL("image/jpeg", 0.92);

        const x = (pageWidth - renderWidth) / 2;
        const y = margin;

        pdf.addImage(
          imageData,
          "JPEG",
          x,
          y,
          renderWidth,
          renderHeight
        );
      } else {
        /*
         * Split the long Word document canvas into
         * multiple A4 PDF pages.
         */
        const pixelsPerMm = imgWidth / contentWidth;
        const pagePixelHeight = Math.floor(
          contentHeight * pixelsPerMm
        );

        let sourceY = 0;
        let firstPage = true;

        while (sourceY < imgHeight) {
          const sliceHeight = Math.min(
            pagePixelHeight,
            imgHeight - sourceY
          );

          const pageCanvas = document.createElement("canvas");

          pageCanvas.width = imgWidth;
          pageCanvas.height = sliceHeight;

          const context = pageCanvas.getContext("2d");

          if (!context) {
            throw new Error("Unable to create PDF canvas.");
          }

          context.fillStyle = "#ffffff";
          context.fillRect(
            0,
            0,
            pageCanvas.width,
            pageCanvas.height
          );

          context.drawImage(
            canvas,
            0,
            sourceY,
            imgWidth,
            sliceHeight,
            0,
            0,
            imgWidth,
            sliceHeight
          );

          const imageData = pageCanvas.toDataURL(
            "image/jpeg",
            0.92
          );

          const sliceHeightMm =
            sliceHeight / pixelsPerMm;

          if (!firstPage) {
            pdf.addPage();
          }

          pdf.addImage(
            imageData,
            "JPEG",
            margin,
            margin,
            contentWidth,
            sliceHeightMm
          );

          firstPage = false;
          sourceY += sliceHeight;
        }
      }

      const blob = pdf.output("blob");

      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert this Word document to PDF."
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
      `${file?.name.replace(/\.docx$/i, "") || "document"}.pdf`;

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
          Word to PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert Word documents to PDF online while preserving the
          document layout as closely as possible.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Word Document
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a DOCX file to convert it into PDF.
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
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              📝
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {file ? "Word Document Selected" : "Upload your Word file"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your DOCX here or click to browse
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Maximum file size: 25 MB
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
            disabled={!file || !htmlContent || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing ? "Converting to PDF..." : "Convert to PDF"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Document Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your Word document preview will appear here.
          </p>

          <div className="mt-6 min-h-[360px] overflow-auto rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4">
            {!file ? (
              <div className="flex min-h-[320px] items-center justify-center text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                    📄
                  </div>

                  <p className="mt-4 font-medium text-slate-600">
                    No document selected
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload a DOCX file to preview it.
                  </p>
                </div>
              </div>
            ) : (
              <div
                ref={previewRef}
                className="mx-auto min-h-[320px] w-full max-w-[760px] bg-white p-8 text-slate-900 shadow-sm"
              >
                <style jsx>{`
                  div :global(p) {
                    margin: 0 0 12px;
                    line-height: 1.6;
                  }

                  div :global(h1) {
                    margin: 0 0 20px;
                    font-size: 28px;
                    font-weight: 700;
                  }

                  div :global(h2) {
                    margin: 18px 0 12px;
                    font-size: 22px;
                    font-weight: 700;
                  }

                  div :global(h3) {
                    margin: 16px 0 10px;
                    font-size: 18px;
                    font-weight: 700;
                  }

                  div :global(ul),
                  div :global(ol) {
                    margin: 0 0 14px 24px;
                  }

                  div :global(li) {
                    margin-bottom: 6px;
                  }

                  div :global(table) {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 16px 0;
                  }

                  div :global(td),
                  div :global(th) {
                    border: 1px solid #cbd5e1;
                    padding: 8px;
                  }

                  div :global(img) {
                    max-width: 100%;
                    height: auto;
                  }
                `}</style>

                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlContent,
                  }}
                />
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
            Your document is processed locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
