"use client";

import {
  ChangeEvent,
  DragEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";

type Point = {
  x: number;
  y: number;
};

export default function PDFSigner() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [signature, setSignature] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const [signatureColor, setSignatureColor] = useState("#111827");
  const [signatureSize, setSignatureSize] = useState(180);
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);

  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${
      units[index]
    }`;
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    setSignature([]);
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
      setCurrentPage(1);
      clearSignature();
    } catch (err) {
      console.error(err);
      setError("Unable to read this PDF file.");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const getCanvasPoint = (
    event: MouseEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = signatureCanvasRef.current;

    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const point = getCanvasPoint(event);

    setIsDrawing(true);
    setSignature([point]);

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.strokeStyle = signatureColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const drawSignature = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = signatureCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const point = getCanvasPoint(event);

    setSignature((previous) => [...previous, point]);

    ctx.strokeStyle = signatureColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const redrawSignature = (points: Point[], color: string) => {
    const canvas = signatureCanvasRef.current;

    if (!canvas || points.length === 0) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const changeColor = (color: string) => {
    setSignatureColor(color);

    if (signature.length > 0) {
      redrawSignature(signature, color);
    }
  };

  const getSignatureDataUrl = () => {
    const canvas = signatureCanvasRef.current;

    if (!canvas || signature.length < 2) {
      return null;
    }

    return canvas.toDataURL("image/png");
  };

  const signPDF = async () => {
    if (!pdfData) {
      setError("Please upload a PDF first.");
      return;
    }

    if (signature.length < 2) {
      setError("Please draw your signature first.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const pdfDoc = await PDFDocument.load(pdfData);
      const pages = pdfDoc.getPages();
      const page = pages[currentPage - 1];

      if (!page) {
        throw new Error("Selected page not found.");
      }

      const signatureDataUrl = getSignatureDataUrl();

      if (!signatureDataUrl) {
        throw new Error("Signature unavailable.");
      }

      const signatureImage = await pdfDoc.embedPng(signatureDataUrl);

      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      const canvas = signatureCanvasRef.current;

      if (!canvas) {
        throw new Error("Signature canvas unavailable.");
      }

      const aspectRatio = canvas.height / canvas.width;

      let drawWidth = signatureSize;
      let drawHeight = drawWidth * aspectRatio;

      if (drawWidth > pageWidth * 0.7) {
        drawWidth = pageWidth * 0.7;
        drawHeight = drawWidth * aspectRatio;
      }

      const safeX = Math.max(
        0,
        Math.min(positionX, pageWidth - drawWidth)
      );

      const safeY = Math.max(
        0,
        Math.min(positionY, pageHeight - drawHeight)
      );

      page.drawImage(signatureImage, {
        x: safeX,
        y: safeY,
        width: drawWidth,
        height: drawHeight,
      });

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
      setError("Unable to sign this PDF. Please try another PDF.");
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
    setCurrentPage(1);
    setResultUrl("");
    setResultSize(0);
    setError("");

    clearSignature();

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
          Sign PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Add your handwritten signature to any PDF page and
          download the signed document.
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
            ðŸ“„
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
          {/* File info */}

          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
                ðŸ“„
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {file.name}
                </p>

                <p className="text-sm text-slate-500">
                  {formatBytes(file.size)} â€¢ {pageCount} page
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

          {/* Page selector */}

          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  Select PDF Page
                </p>

                <p className="text-sm text-slate-500">
                  Choose the page where the signature should be placed.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  â†
                </button>

                <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                  Page {currentPage} / {pageCount}
                </div>

                <button
                  type="button"
                  disabled={currentPage >= pageCount}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(pageCount, page + 1)
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  â†’
                </button>
              </div>
            </div>
          </div>

          {/* Signature + settings */}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Draw */}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Draw Signature
                  </h2>

                  <p className="text-sm text-slate-500">
                    Use your mouse or trackpad.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearSignature}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>

              <canvas
                ref={signatureCanvasRef}
                width={700}
                height={280}
                onMouseDown={startDrawing}
                onMouseMove={drawSignature}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full cursor-crosshair rounded-2xl border-2 border-dashed border-slate-300 bg-white"
              />

              <p className="mt-2 text-xs text-slate-400">
                Draw your signature inside the box.
              </p>
            </div>

            {/* Settings */}

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                Signature Settings
              </h2>

              <div className="space-y-5">
                {/* Color */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Signature Color
                  </label>

                  <div className="flex gap-3">
                    {[
                      "#111827",
                      "#1d4ed8",
                      "#15803d",
                      "#7c3aed",
                    ].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => changeColor(color)}
                        className={`h-9 w-9 rounded-full border-2 border-white shadow ring-1 ring-slate-200 ${
                          signatureColor === color
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                        style={{
                          backgroundColor: color,
                        }}
                        aria-label={`Signature color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Signature Size
                    </label>

                    <span className="text-sm font-semibold text-blue-600">
                      {signatureSize}px
                    </span>
                  </div>

                  <input
                    type="range"
                    min="80"
                    max="350"
                    value={signatureSize}
                    onChange={(event) =>
                      setSignatureSize(Number(event.target.value))
                    }
                    className="w-full"
                  />
                </div>

                {/* X */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Position X
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={positionX}
                    onChange={(event) =>
                      setPositionX(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Y */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Position Y
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={positionY}
                    onChange={(event) =>
                      setPositionY(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs leading-5 text-blue-700">
                  X is measured from the left side of the PDF.
                  Y is measured from the bottom of the PDF page.
                </div>
              </div>
            </div>
          </div>

          {/* Sign */}

          <button
            type="button"
            onClick={signPDF}
            disabled={processing || signature.length < 2}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing
              ? "Signing PDF..."
              : `Sign PDF - Page ${currentPage}`}
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
            Signed PDF
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your signed PDF will appear here after processing.
          </p>
        </div>

        {resultUrl ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="mb-4">
              <p className="font-semibold text-green-800">
                PDF signed successfully
              </p>

              <p className="mt-1 text-sm text-green-700">
                Output size: {formatBytes(resultSize)}
              </p>
            </div>

            <iframe
              src={resultUrl}
              title="Signed PDF Preview"
              className="h-[500px] w-full rounded-xl border border-slate-200 bg-white"
            />
          </div>
        ) : (
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
            <div>
              <div className="mb-2 text-3xl">âœï¸</div>

              <p className="font-medium text-slate-600">
                No signed PDF yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Upload a PDF and draw your signature to get started.
              </p>
            </div>
          </div>
        )}

        {/* Download always visible */}

        <a
          href={resultUrl || undefined}
          download="signed-document.pdf"
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
          Download Signed PDF
        </a>
      </div>
    </section>
  );
}

