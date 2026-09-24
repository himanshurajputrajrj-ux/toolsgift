"use client";

import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type Tool = "select" | "text" | "draw" | "highlight" | "white";

type Drawing = {
  page: number;
  points: { x: number; y: number }[];
};

type Annotation = {
  page: number;
  type: "text" | "highlight" | "white";
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
};

export default function PDFEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [tool, setTool] = useState<Tool>("select");
  const [textValue, setTextValue] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [currentDrawing, setCurrentDrawing] = useState<
    { x: number; y: number }[]
  >([]);

  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState("");

  const [pageSize, setPageSize] = useState({
    width: 595,
    height: 842,
  });

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
    setPdfDoc(null);
    setPageCount(0);
    setCurrentPage(1);
    setAnnotations([]);
    setDrawings([]);
    setCurrentDrawing([]);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const loadPDF = async (selectedFile: File) => {
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

    try {
      const bytes = await selectedFile.arrayBuffer();
      const document = await PDFDocument.load(bytes);

      const pages = document.getPages();

      if (!pages.length) {
        throw new Error("No pages found.");
      }

      const firstPage = pages[0];
      const size = firstPage.getSize();

      setFile(selectedFile);
      setPdfDoc(document);
      setPageCount(pages.length);
      setCurrentPage(1);
      setPageSize({
        width: size.width,
        height: size.height,
      });
      setAnnotations([]);
      setDrawings([]);
    } catch (err) {
      console.error(err);

      setFile(null);
      setPdfDoc(null);

      setError(
        "Unable to open this PDF. It may be encrypted or corrupted."
      );
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }
  };

  const getCanvasPoint = (
    event: MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x:
        ((event.clientX - rect.left) / rect.width) *
        pageSize.width,
      y:
        ((event.clientY - rect.top) / rect.height) *
        pageSize.height,
    };
  };

  const handleMouseDown = (
    event: MouseEvent<HTMLCanvasElement>
  ) => {
    const point = getCanvasPoint(event);

    if (!point) return;

    if (tool === "draw") {
      setDrawing(true);
      setCurrentDrawing([point]);
      return;
    }

    if (
      tool === "highlight" ||
      tool === "white"
    ) {
      setStartPoint(point);
    }
  };

  const handleMouseMove = (
    event: MouseEvent<HTMLCanvasElement>
  ) => {
    if (!drawing || tool !== "draw") return;

    const point = getCanvasPoint(event);

    if (!point) return;

    setCurrentDrawing((previous) => [
      ...previous,
      point,
    ]);
  };

  const handleMouseUp = (
    event: MouseEvent<HTMLCanvasElement>
  ) => {
    const point = getCanvasPoint(event);

    if (tool === "draw" && drawing) {
      setDrawing(false);

      if (currentDrawing.length > 1) {
        setDrawings((previous) => [
          ...previous,
          {
            page: currentPage,
            points: currentDrawing,
          },
        ]);
      }

      setCurrentDrawing([]);
      return;
    }

    if (
      (tool === "highlight" || tool === "white") &&
      startPoint &&
      point
    ) {
      const x = Math.min(startPoint.x, point.x);
      const y = Math.min(startPoint.y, point.y);

      const width = Math.abs(point.x - startPoint.x);
      const height = Math.abs(point.y - startPoint.y);

      if (width > 5 && height > 5) {
        setAnnotations((previous) => [
          ...previous,
          {
            page: currentPage,
            type:
              tool === "highlight"
                ? "highlight"
                : "white",
            x,
            y,
            width,
            height,
          },
        ]);
      }

      setStartPoint(null);
    }
  };

  const addText = () => {
    if (!textValue.trim()) return;

    setAnnotations((previous) => [
      ...previous,
      {
        page: currentPage,
        type: "text",
        x: pageSize.width / 2 - 50,
        y: pageSize.height / 2,
        width: 100,
        height: fontSize + 10,
        text: textValue.trim(),
      },
    ]);

    setTextValue("");
    setTool("select");
  };

  const drawPreview = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const scale = Math.min(
      760 / pageSize.width,
      700 / pageSize.height
    );

    canvas.width = Math.floor(
      pageSize.width * scale
    );

    canvas.height = Math.floor(
      pageSize.height * scale
    );

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.fillStyle = "#ffffff";
    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (pdfDoc) {
      /*
       * pdf-lib does not render existing PDF pages.
       * We therefore use a clean page representation
       * in the editor while preserving the original PDF
       * when exporting.
       */

      context.fillStyle = "#e2e8f0";
      context.fillRect(
        0,
        0,
        canvas.width,
        45
      );

      context.fillStyle = "#334155";
      context.font = "bold 16px Arial";
      context.fillText(
        `PDF Page ${currentPage}`,
        20,
        28
      );
    }

    const pageAnnotations = annotations.filter(
      (item) => item.page === currentPage
    );

    for (const item of pageAnnotations) {
      const x = item.x * scale;
      const y = item.y * scale;
      const width = item.width * scale;
      const height = item.height * scale;

      if (item.type === "highlight") {
        context.fillStyle = "rgba(250, 204, 21, 0.45)";
        context.fillRect(
          x,
          y,
          width,
          height
        );
      }

      if (item.type === "white") {
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#cbd5e1";
        context.lineWidth = 1;

        context.fillRect(
          x,
          y,
          width,
          height
        );

        context.strokeRect(
          x,
          y,
          width,
          height
        );
      }

      if (item.type === "text") {
        context.fillStyle = "#0f172a";
        context.font = `${fontSize}px Arial`;

        context.fillText(
          item.text || "",
          x,
          y
        );
      }
    }

    const pageDrawings = drawings.filter(
      (item) => item.page === currentPage
    );

    context.strokeStyle = "#2563eb";
    context.lineWidth = 2;
    context.lineCap = "round";

    for (const drawingItem of pageDrawings) {
      if (drawingItem.points.length < 2) continue;

      context.beginPath();

      drawingItem.points.forEach(
        (point, index) => {
          const x = point.x * scale;
          const y = point.y * scale;

          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
      );

      context.stroke();
    }

    if (currentDrawing.length > 1) {
      context.beginPath();

      currentDrawing.forEach(
        (point, index) => {
          const x = point.x * scale;
          const y = point.y * scale;

          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
      );

      context.stroke();
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!pdfDoc) return;

    drawPreview();
  }, [
    pdfDoc,
    currentPage,
    annotations,
    drawings,
    currentDrawing,
    fontSize,
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const exportPDF = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");

    try {
      const originalBytes = await file.arrayBuffer();

      const document = await PDFDocument.load(
        originalBytes
      );

      const pages = document.getPages();

      const font = await document.embedFont(
        StandardFonts.Helvetica
      );

      for (const annotation of annotations) {
        const page = pages[annotation.page - 1];

        if (!page) continue;

        if (annotation.type === "highlight") {
          page.drawRectangle({
            x: annotation.x,
            y:
              page.getHeight() -
              annotation.y -
              annotation.height,
            width: annotation.width,
            height: annotation.height,
            color: rgb(1, 0.85, 0),
            opacity: 0.4,
            borderWidth: 0,
          });
        }

        if (annotation.type === "white") {
          page.drawRectangle({
            x: annotation.x,
            y:
              page.getHeight() -
              annotation.y -
              annotation.height,
            width: annotation.width,
            height: annotation.height,
            color: rgb(1, 1, 1),
            borderColor: rgb(
              0.8,
              0.8,
              0.8
            ),
            borderWidth: 0.5,
          });
        }

        if (
          annotation.type === "text" &&
          annotation.text
        ) {
          page.drawText(annotation.text, {
            x: annotation.x,
            y:
              page.getHeight() -
              annotation.y -
              fontSize,
            size: fontSize,
            font,
            color: rgb(
              0.06,
              0.09,
              0.16
            ),
          });
        }
      }

      for (const drawingItem of drawings) {
        const page = pages[drawingItem.page - 1];

        if (
          !page ||
          drawingItem.points.length < 2
        ) {
          continue;
        }

        for (
          let index = 1;
          index < drawingItem.points.length;
          index++
        ) {
          const previous =
            drawingItem.points[index - 1];

          const current =
            drawingItem.points[index];

          page.drawLine({
            start: {
              x: previous.x,
              y:
                page.getHeight() -
                previous.y,
            },
            end: {
              x: current.x,
              y:
                page.getHeight() -
                current.y,
            },
            thickness: 2,
            color: rgb(
              0.15,
              0.39,
              0.92
            ),
          });
        }
      }

      const bytes = await document.save();

      const blob = new Blob([new Uint8Array(bytes).slice().buffer], { type: "application/pdf" });

      clearResult();

      setResultBlob(blob);
      setResultUrl(
        URL.createObjectURL(blob)
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to save the edited PDF."
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
      `${file?.name.replace(/\.pdf$/i, "") || "document"}-edited.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          PDF Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          PDF Editor
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Add text, draw, highlight and cover areas of a PDF directly in
          your browser.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Editor Tools
            </h2>

            <div className="mt-4 space-y-2">
              {[
                ["select", "Select"],
                ["text", "Add Text"],
                ["draw", "Draw"],
                ["highlight", "Highlight"],
                ["white", "Cover Area"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setTool(value as Tool)
                  }
                  disabled={!file}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    tool === value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tool === "text" && (
              <div className="mt-5 space-y-3 rounded-xl border border-slate-200 p-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Text
                </label>

                <input
                  value={textValue}
                  onChange={(event) =>
                    setTextValue(event.target.value)
                  }
                  placeholder="Enter text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

                <label className="block text-sm font-semibold text-slate-700">
                  Font Size
                </label>

                <input
                  type="number"
                  min={8}
                  max={72}
                  value={fontSize}
                  onChange={(event) =>
                    setFontSize(
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={addText}
                  disabled={!textValue.trim()}
                  className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Add Text
                </button>
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                disabled={!file || currentPage === 1}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium disabled:opacity-40"
              >
                ←
              </button>

              <div className="flex flex-1 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-700">
                {currentPage} / {pageCount || 0}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      pageCount,
                      page + 1
                    )
                  )
                }
                disabled={
                  !file ||
                  currentPage === pageCount
                }
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium disabled:opacity-40"
              >
                →
              </button>
            </div>
          </div>

          {/* MAIN */}
          <div>
            <div
              onClick={() =>
                inputRef.current?.click()
              }
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const droppedFile = event.dataTransfer.files?.[0];
                if (droppedFile) {
                  loadPDF(droppedFile);
                }
              }}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-blue-400 hover:bg-blue-50"
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleInputChange}
                className="hidden"
              />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                📄
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                {file
                  ? "PDF Selected"
                  : "Upload your PDF"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Drag & drop or click to browse
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Maximum file size: 50 MB
              </p>
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {file.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {pageCount} pages
                  </p>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Remove
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-5 flex min-h-[500px] items-center justify-center overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-5">
              {!file ? (
                <div className="text-center">
                  <div className="text-5xl">📝</div>

                  <p className="mt-3 font-medium text-slate-600">
                    Editor preview
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload a PDF to start editing.
                  </p>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`max-h-[700px] max-w-full bg-white shadow-lg ${
                    tool === "select"
                      ? "cursor-default"
                      : "cursor-crosshair"
                  }`}
                />
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={exportPDF}
                disabled={!file || processing}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {processing
                  ? "Saving PDF..."
                  : "Save Edited PDF"}
              </button>

              <button
                type="button"
                onClick={downloadPDF}
                disabled={!resultUrl || !resultBlob}
                className="flex-1 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                Download PDF
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-slate-400">
              Download remains visible and becomes active after the edited
              PDF is created.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
