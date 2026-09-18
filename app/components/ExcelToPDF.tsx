"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

type CellValue = string | number | boolean | null;

export default function ExcelToPDF() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [rows, setRows] = useState<CellValue[][]>([]);

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
    setSheetNames([]);
    setSelectedSheet("");
    setRows([]);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const readWorkbook = async (selectedFile: File) => {
    const buffer = await selectedFile.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: "array",
      cellDates: true,
    });

    if (!workbook.SheetNames.length) {
      throw new Error("No worksheets found.");
    }

    const names = workbook.SheetNames;

    setSheetNames(names);
    setSelectedSheet(names[0]);

    const worksheet = workbook.Sheets[names[0]];

    const data = XLSX.utils.sheet_to_json<CellValue[]>(worksheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    setRows(data.slice(0, 50));
  };

  const handleFile = async (selectedFile: File) => {
    setError("");

    const lowerName = selectedFile.name.toLowerCase();

    const validExtension =
      lowerName.endsWith(".xlsx") ||
      lowerName.endsWith(".xls") ||
      lowerName.endsWith(".csv");

    if (!validExtension) {
      setError("Please select an Excel or CSV file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Excel file must be smaller than 25 MB.");
      return;
    }

    clearResult();

    setFile(selectedFile);
    setSheetNames([]);
    setSelectedSheet("");
    setRows([]);

    try {
      await readWorkbook(selectedFile);
    } catch (err) {
      console.error(err);

      setFile(null);
      setSheetNames([]);
      setSelectedSheet("");
      setRows([]);

      setError(
        "Unable to read this spreadsheet. The file may be corrupted or unsupported."
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

  const changeSheet = async (sheetName: string) => {
    if (!file) return;

    setSelectedSheet(sheetName);

    try {
      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: "array",
        cellDates: true,
      });

      const worksheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json<CellValue[]>(
        worksheet,
        {
          header: 1,
          defval: "",
          raw: false,
        }
      );

      setRows(data.slice(0, 50));
      clearResult();
    } catch (err) {
      console.error(err);
      setError("Unable to load the selected worksheet.");
    }
  };

  const convertToPDF = async () => {
    if (!file || !selectedSheet) return;

    setProcessing(true);
    setError("");
    clearResult();

    try {
      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: "array",
        cellDates: true,
      });

      const worksheet = workbook.Sheets[selectedSheet];

      const data = XLSX.utils.sheet_to_json<CellValue[]>(
        worksheet,
        {
          header: 1,
          defval: "",
          raw: false,
        }
      );

      if (data.length === 0) {
        throw new Error("The worksheet is empty.");
      }

      const cleanedRows = data.map((row) =>
        row.map((cell) =>
          cell === null || cell === undefined
            ? ""
            : String(cell)
        )
      );

      const columnCount = Math.max(
        ...cleanedRows.map((row) => row.length),
        1
      );

      const orientation =
        columnCount > 7 ? "landscape" : "portrait";

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth =
        orientation === "landscape" ? 297 : 210;

      const pageHeight =
        orientation === "landscape" ? 210 : 297;

      const margin = 10;

      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      const rowHeight = 7;
      const headerHeight = 9;

      const maxColumns = Math.min(columnCount, 12);

      const columnWidth = usableWidth / maxColumns;

      let currentY = margin + 12;

      const drawHeader = () => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(15, 23, 42);

        pdf.text(selectedSheet, margin, margin + 4);

        currentY = margin + 12;
      };

      const drawTableHeader = () => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7);
        pdf.setFillColor(239, 246, 255);
        pdf.setDrawColor(203, 213, 225);

        pdf.rect(
          margin,
          currentY,
          usableWidth,
          headerHeight,
          "FD"
        );

        for (let column = 0; column < maxColumns; column++) {
          const x = margin + column * columnWidth;

          pdf.line(
            x,
            currentY,
            x,
            currentY + headerHeight
          );

          pdf.text(
            `Column ${column + 1}`,
            x + 2,
            currentY + 6
          );
        }

        currentY += headerHeight;
      };

      drawHeader();

      let rowIndex = 0;

      while (rowIndex < cleanedRows.length) {
        if (
          currentY + rowHeight >
          pageHeight - margin
        ) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.setTextColor(100, 116, 139);

          pdf.text(
            `Sheet: ${selectedSheet}`,
            margin,
            pageHeight - 4
          );

          pdf.addPage();

          currentY = margin;

          drawHeader();
        }

        if (rowIndex === 0) {
          drawTableHeader();
        }

        const row = cleanedRows[rowIndex];

        pdf.setFont(
          "helvetica",
          rowIndex === 0 ? "bold" : "normal"
        );

        pdf.setFontSize(6.5);
        pdf.setTextColor(15, 23, 42);
        pdf.setDrawColor(226, 232, 240);

        for (let column = 0; column < maxColumns; column++) {
          const x = margin + column * columnWidth;

          const value = row[column] || "";

          const lines = pdf.splitTextToSize(
            value,
            Math.max(columnWidth - 4, 5)
          );

          pdf.rect(
            x,
            currentY,
            columnWidth,
            rowHeight
          );

          pdf.text(
            lines.slice(0, 1),
            x + 2,
            currentY + 4.5
          );
        }

        currentY += rowHeight;
        rowIndex++;
      }

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(100, 116, 139);

      pdf.text(
        `Generated by ToolsGift • ${cleanedRows.length} rows`,
        margin,
        pageHeight - 4
      );

      const blob = pdf.output("blob");

      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert this spreadsheet to PDF. Make sure the worksheet contains valid data."
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
      `${file?.name.replace(/\.(xlsx|xls|csv)$/i, "") || "spreadsheet"}.pdf`;

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
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Document Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Excel to PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert Excel spreadsheets into clean, printable PDF
          documents.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Spreadsheet
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Supports XLSX, XLS and CSV files.
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
              accept=".xlsx,.xls,.csv"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              📊
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {file
                ? "Spreadsheet Selected"
                : "Upload your Excel file"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop here or click to browse
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
                    {sheetNames.length > 0 &&
                      ` • ${sheetNames.length} sheets`}
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

          {sheetNames.length > 0 && (
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Worksheet
              </label>

              <select
                value={selectedSheet}
                onChange={(event) =>
                  changeSheet(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {sheetNames.map((sheet) => (
                  <option key={sheet} value={sheet}>
                    {sheet}
                  </option>
                ))}
              </select>
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
            disabled={!file || !selectedSheet || processing}
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
            Spreadsheet Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Preview of the selected worksheet.
          </p>

          <div className="mt-6 min-h-[330px] overflow-auto rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
            {rows.length === 0 ? (
              <div className="flex min-h-[330px] items-center justify-center p-6 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                    📋
                  </div>

                  <p className="mt-4 font-medium text-slate-600">
                    No spreadsheet selected
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload an Excel file to preview its data.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-h-[360px] overflow-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex === 0
                            ? "bg-blue-50"
                            : "bg-white"
                        }
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="max-w-[180px] border-b border-r border-slate-200 px-3 py-2 text-slate-700"
                          >
                            <span className="line-clamp-2">
                              {String(cell ?? "")}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">
            Showing up to 50 preview rows. The complete worksheet is
            included in the PDF.
          </p>

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
            Your spreadsheet is processed locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}

