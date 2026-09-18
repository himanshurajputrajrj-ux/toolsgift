"use client";

import {
  ChangeEvent,
  DragEvent,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";

type FormField = {
  name: string;
  type: string;
  value: string;
};

export default function PDFForms() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024;

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 B";

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${
      units[index]
    }`;
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setResultUrl("");
    setFields([]);

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("PDF must be 50MB or less.");
      return;
    }

    try {
      const bytes = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const form = pdf.getForm();
      const allFields = form.getFields();

      const detectedFields: FormField[] = allFields.map(
        (field) => {
          const name = field.getName();

          let type = "Unknown";
          let value = "";

          if (field.constructor.name === "PDFTextField") {
            type = "Text";
            value = form.getTextField(name).getText() || "";
          } else if (
            field.constructor.name === "PDFCheckBox"
          ) {
            type = "Checkbox";

            value = form
              .getCheckBox(name)
              .isChecked()
              ? "true"
              : "false";
          } else if (
            field.constructor.name === "PDFDropdown"
          ) {
            type = "Dropdown";

            value =
              form
                .getDropdown(name)
                .getSelected()
                .join(", ") || "";
          } else if (
            field.constructor.name === "PDFRadioGroup"
          ) {
            type = "Radio";
            value =
              form.getRadioGroup(name).getSelected() || "";
          } else if (
            field.constructor.name === "PDFOptionList"
          ) {
            type = "Option List";
            value =
              form
                .getOptionList(name)
                .getSelected()
                .join(", ") || "";
          }

          return {
            name,
            type,
            value,
          };
        }
      );

      setFile(selectedFile);
      setPdfBytes(bytes);
      setPageCount(pdf.getPageCount());
      setFields(detectedFields);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to read this PDF form. The PDF may be corrupted or unsupported."
      );
    }
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }

    e.target.value = "";
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const updateField = (
    index: number,
    value: string
  ) => {
    setFields((previous) =>
      previous.map((field, i) =>
        i === index
          ? {
              ...field,
              value,
            }
          : field
      )
    );

    setResultUrl("");
  };

  const fillPDF = async () => {
    if (!pdfBytes) {
      setError("Please upload a PDF form first.");
      return;
    }

    if (fields.length === 0) {
      setError("No editable PDF form fields were detected.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const pdf = await PDFDocument.load(pdfBytes);
      const form = pdf.getForm();

      for (const field of fields) {
        try {
          if (field.type === "Text") {
            form
              .getTextField(field.name)
              .setText(field.value);
          } else if (
            field.type === "Checkbox"
          ) {
            const checkbox = form.getCheckBox(
              field.name
            );

            if (field.value === "true") {
              checkbox.check();
            } else {
              checkbox.uncheck();
            }
          } else if (
            field.type === "Dropdown"
          ) {
            const dropdown = form.getDropdown(
              field.name
            );

            if (field.value.trim()) {
              dropdown.select(
                field.value.split(",")[0].trim()
              );
            }
          } else if (
            field.type === "Radio"
          ) {
            if (field.value.trim()) {
              form
                .getRadioGroup(field.name)
                .select(field.value);
            }
          } else if (
            field.type === "Option List"
          ) {
            if (field.value.trim()) {
              form
                .getOptionList(field.name)
                .select(
                  field.value
                    .split(",")[0]
                    .trim()
                );
            }
          }
        } catch (fieldError) {
          console.warn(
            `Could not update field: ${field.name}`,
            fieldError
          );
        }
      }

      form.updateFieldAppearances();

      const output = await pdf.save();

      const blob = new Blob([new Uint8Array(output).slice().buffer], { type: "application/pdf" });

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
    } catch (err) {
      console.error(err);
      setError("Failed to create the filled PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setPdfBytes(null);
    setFields([]);
    setPageCount(0);
    setResultUrl("");
    setError("");
    setProcessing(false);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            PDF Forms
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Fill existing interactive PDF form fields and
            download the completed document.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() =>
              setDragActive(false)
            }
            onDrop={handleDrop}
            onClick={() =>
              document
                .getElementById("pdf-form-input")
                ?.click()
            }
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              id="pdf-form-input"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleInput}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📝
            </div>

            <p className="font-semibold text-slate-800">
              {file
                ? "Replace PDF Form"
                : "Upload PDF Form"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Drag & drop or click to browse • Max 50MB
            </p>
          </div>

          {/* File info */}
          {file && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="max-w-xl truncate text-sm font-semibold text-slate-800">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatBytes(file.size)} •{" "}
                    {pageCount} pages •{" "}
                    {fields.length} form fields
                  </p>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove PDF
                </button>
              </div>
            </div>
          )}

          {/* Fields */}
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Form Fields
            </h2>

            {!file ? (
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">
                    📝
                  </div>

                  <p className="font-medium text-slate-700">
                    PDF form fields will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload an interactive PDF form to begin.
                  </p>
                </div>
              </div>
            ) : fields.length === 0 ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
                <p className="font-semibold text-amber-900">
                  No editable form fields detected
                </p>

                <p className="mt-1 text-sm text-amber-800">
                  This PDF may be a normal document or a
                  scanned form without interactive fields.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={`${field.name}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <label className="text-sm font-semibold text-slate-800">
                        {field.name}
                      </label>

                      <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {field.type}
                      </span>
                    </div>

                    {field.type === "Checkbox" ? (
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3">
                        <input
                          type="checkbox"
                          checked={
                            field.value === "true"
                          }
                          onChange={(e) =>
                            updateField(
                              index,
                              e.target.checked
                                ? "true"
                                : "false"
                            )
                          }
                          className="h-4 w-4"
                        />

                        <span className="text-sm text-slate-700">
                          {field.value === "true"
                            ? "Checked"
                            : "Unchecked"}
                        </span>
                      </label>
                    ) : (
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) =>
                          updateField(
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${field.name}`}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fill button */}
          <button
            type="button"
            onClick={fillPDF}
            disabled={
              !file ||
              fields.length === 0 ||
              processing
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Creating Filled PDF..."
              : "Fill PDF & Create Document"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Result
            </h2>

            {!resultUrl ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">
                    📄
                  </div>

                  <p className="font-medium text-slate-700">
                    Filled PDF will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Complete the form and create the document.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <iframe
                  src={resultUrl}
                  title="Filled PDF Preview"
                  className="h-[600px] w-full"
                />
              </div>
            )}
          </div>

          {/* Download always visible */}
          <a
            href={resultUrl || undefined}
            download="filled-form.pdf"
            aria-disabled={!resultUrl}
            onClick={(e) => {
              if (!resultUrl) {
                e.preventDefault();
              }
            }}
            className={`mt-5 block w-full rounded-xl px-5 py-3.5 text-center text-sm font-semibold transition ${
              resultUrl
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            Download Filled PDF
          </a>

          {/* Reset */}
          <button
            type="button"
            onClick={reset}
            className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}


