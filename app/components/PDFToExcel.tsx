"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import * as XLSX from "xlsx";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PDFItem = {
  str?: string;
  transform?: number[];
};

export default function PDFToExcel() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);

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
    setPageCount(0);
    setPreviewRows([]);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const extractPDF = async (selectedFile: File, previewOnly = false) => {
    const pdfjs = await import("pdfjs-dist");

    pdfjs.GlobalWorkerOptions.workerSrc =
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

    const buffer = await selectedFile.arrayBuffer();

    const pdf = await pdfjs.getDocument({
      data: buffer,
    }).promise;

    setPageCount(pdf.numPages);

    const allRows: string[][] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const items = textContent.items
        .filter((item) => "str" in item)
        .map((item) => {
          const pdfItem = item as PDFItem;

          return {
            text: pdfItem.str || "",
            x: pdfItem.transform?.[4] ?? 0,
            y: pdfItem.transform?.[5] ?? 0,
          };
        })
        .filter((item) => item.text.trim());

      if (items.length === 0) {
        continue;
      }

      /*
       * Group text items into lines based on their Y position.
       */
      const lines: {
        y: number;
        items: {
          text: string;
          x: number;
        }[];
      }[] = [];

      for (const item of items) {
        let line = lines.find(
          (existingLine) => Math.abs(existingLine.y - item.y) < 5
        );

        if (!line) {
          line = {
            y: item.y,
            items: [],
          };

          lines.push(line);
        }

        line.items.push({
          text: item.text,
          x: item.x,
        });
      }

      lines.sort((a, b) => b.y - a.y);

      for (const line of lines) {
        line.items.sort((a, b) => a.x - b.x);

        const row = line.items.map((item) => item.text.trim());

        if (row.length > 0) {
          allRows.push(row);
        }
      }

      if (previewOnly && allRows.length >= 15) {
        break;
      }
    }

    return allRows;
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

    setFile(selectedFile);
    setPageCount(0);
    setPreviewRows([]);

    try {
      const rows = await extractPDF(selectedFile, true);

      setPreviewRows(rows.slice(0, 15));
    } catch (err) {
      console.error(err);

      setFile(null);
      setPageCount(0);
      setPreviewRows([]);

      setError(
        "Unable to read this PDF. It may be encrypted, scanned, or corrupted."
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

  const convertToExcel = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");
    clearResult();

    try {
      const rows = await extractPDF(file);

      if (rows.length === 0) {
        throw new Error("No selectable text found.");
      }

      const normalizedRows = rows.map((row) => {
        const maxColumns = Math.max(row.length, 1);

        return Array.from(
          { length: maxColumns },
          (_, index) => row[index] || ""
        );
      });

      const worksheet = XLSX.utils.aoa_to_sheet(normalizedRows);

      worksheet["!cols"] = Array.from(
        {
          length: Math.max(
            ...normalizedRows.map((row) => row.length),
            1
          ),
        },
        () => ({
          wch: 22,
        })
      );

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "PDF Data"
      );

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert this PDF to Excel. Make sure the PDF contains selectable text."
      );
    } finally {
      setProcessing(false);
    }
  };

  const downloadExcel = () => {
    if (!resultBlob || !resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;

    link.download =
      `${file?.name.replace(/\.pdf$/i, "") || "converted"}-data.xlsx`;

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
          PDF Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          PDF to Excel
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Extract PDF text and arrange it into an editable Excel spreadsheet.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload PDF
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload a PDF containing selectable text or tabular data.
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
            onClick={convertToExcel}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing ? "Converting to Excel..." : "Convert to Excel"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Spreadsheet Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Extracted PDF content will be previewed here.
          </p>

          <div className="mt-6 min-h-[280px] overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
            {!file ? (
              <div className="flex min-h-[280px] items-center justify-center p-6 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                    📋
                  </div>

                  <p className="mt-4 font-medium text-slate-600">
                    No PDF selected
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload a PDF to preview its data.
                  </p>
                </div>
              </div>
            ) : previewRows.length === 0 ? (
              <div className="flex min-h-[280px] items-center justify-center p-6 text-center">
                <div>
                  <p className="font-medium text-slate-600">
                    No selectable text found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    This PDF may require OCR.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-h-[320px] overflow-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {previewRows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-slate-200"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="whitespace-nowrap border-r border-slate-200 bg-white px-3 py-2 text-slate-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                Note:
              </span>{" "}
              PDF layouts vary widely. This browser version extracts text
              based on its position and places it into spreadsheet cells.
              Complex tables may require manual cleanup.
            </p>
          </div>

          {resultBlob && (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-700">
                Excel file created successfully
              </p>

              <p className="mt-1 text-sm text-green-600">
                File size: {formatSize(resultBlob.size)}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={downloadExcel}
            disabled={!resultUrl || !resultBlob}
            className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            Download Excel
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Your PDF is processed locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
