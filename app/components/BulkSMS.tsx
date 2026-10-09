"use client";

import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";

type ContactStatus = "valid" | "invalid" | "duplicate";

type SmsRow = {
  row: number;
  name: string;
  phone: string;
  normalized: string;
  status: ContactStatus;
  note: string;
  message: string;
};

const GSM7_BASIC =
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";

const GSM7_EXTENDED = "^{}\\[~]|€";

const PHONE_FIELD_PATTERN =
  /^(phone( number)?|mobile( number)?|cell( phone| number)?|tel(ephone)?|contact number|number)$/i;

const EXAMPLE_CONTACTS = `Name, Phone
Ava Bennett, +1 202 555 0143
Noah Carter, +44 20 7946 0958
Mia Delgado, (305) 555-0182
Liam Foster, 00331 42 68 53 00
Invalid Entry, call me later`;

const EXAMPLE_MESSAGE =
  "Hi {name}, this is ToolsGift. Your order is ready for pickup. Reply YES to confirm. Reply STOP to opt out.";

const copyText = async (value: string): Promise<boolean> => {
  if (!value) return false;

  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);

    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (copied) return true;
  } catch (error) {
    console.error("Textarea copy failed:", error);
  }

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (error) {
    console.error("Clipboard API copy failed:", error);
  }

  return false;
};

const downloadText = (value: string, filename: string, type: string) => {
  if (!value) return;

  const blob = new Blob([value], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const isGsm7 = (text: string): boolean => {
  for (const char of text) {
    if (!GSM7_BASIC.includes(char) && !GSM7_EXTENDED.includes(char)) {
      return false;
    }
  }
  return true;
};

const smsStats = (text: string) => {
  const gsm7 = isGsm7(text);
  const encoding = gsm7 ? "GSM-7" : "UCS-2 (Unicode)";

  let length = 0;

  if (gsm7) {
    for (const char of text) {
      length += GSM7_EXTENDED.includes(char) ? 2 : 1;
    }
  } else {
    length = text.length;
  }

  const singleLimit = encoding === "GSM-7" ? 160 : 70;
  const multiLimit = encoding === "GSM-7" ? 153 : 67;

  const segments =
    length === 0 ? 0 : length <= singleLimit ? 1 : Math.ceil(length / multiLimit);

  return { encoding, length, segments, singleLimit, multiLimit };
};

const normalizePhone = (raw: string): string | null => {
  const cleaned = raw.replace(/[\s().\-–—/]/g, "");

  if (!/^\+?\d+$/.test(cleaned)) return null;

  const withCountryPrefix = cleaned.startsWith("00")
    ? `+${cleaned.slice(2)}`
    : cleaned;

  const digits = withCountryPrefix.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;

  return withCountryPrefix;
};

const looksLikePhone = (value: string): boolean =>
  /^[+\d][\d\s().\-–—/]{5,}$/.test(value.trim());

const splitCsvLine = (line: string): string[] => {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (inQuotes) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields.map((field) => field.trim());
};

const splitContactLine = (line: string): string[] => {
  const trimmed = line.trim();

  if (trimmed.includes("\t")) {
    return trimmed.split("\t").map((field) => field.trim());
  }

  if (trimmed.includes(",")) {
    return splitCsvLine(trimmed);
  }

  const tokens = trimmed.split(/\s+/);
  if (tokens.length >= 2 && looksLikePhone(tokens[tokens.length - 1])) {
    return [tokens.slice(0, -1).join(" "), tokens[tokens.length - 1]];
  }

  return [trimmed];
};

const isHeaderLine = (fields: string[]): boolean =>
  PHONE_FIELD_PATTERN.test((fields[fields.length - 1] ?? "").trim()) ||
  PHONE_FIELD_PATTERN.test((fields[0] ?? "").trim());

const personalize = (
  template: string,
  row: { name: string; normalized: string; phone: string },
  fallbackName: string
): string =>
  template.replace(/\{(name|phone)\}/gi, (_match, token: string) => {
    if (token.toLowerCase() === "name") {
      return row.name || fallbackName;
    }
    return row.normalized || row.phone;
  });

const buildRows = (
  contacts: string,
  template: string,
  fallbackName: string
): SmsRow[] => {
  const lines = contacts.split(/\r\n|\r|\n/);
  const rows: SmsRow[] = [];
  const seen = new Map<string, number>();
  let sourceRow = 0;
  let checkedHeader = false;

  for (const line of lines) {
    if (!line.trim()) continue;

    const fields = splitContactLine(line);

    if (!checkedHeader) {
      checkedHeader = true;
      if (isHeaderLine(fields)) continue;
    }

    sourceRow += 1;

    const name = fields.length > 1 ? fields.slice(0, -1).join(", ").trim() : "";
    const phone = (fields[fields.length - 1] ?? "").trim();

    if (!phone) {
      rows.push({
        row: sourceRow,
        name,
        phone,
        normalized: "",
        status: "invalid",
        note: "Missing phone number",
        message: "",
      });
      continue;
    }

    const normalized = normalizePhone(phone);

    if (!normalized) {
      rows.push({
        row: sourceRow,
        name,
        phone,
        normalized: "",
        status: "invalid",
        note: "Invalid phone number",
        message: "",
      });
      continue;
    }

    const key = normalized.replace(/\D/g, "");
    const firstSeen = seen.get(key);

    if (firstSeen !== undefined) {
      rows.push({
        row: sourceRow,
        name,
        phone,
        normalized,
        status: "duplicate",
        note: `Duplicate of contact ${firstSeen}`,
        message: "",
      });
      continue;
    }

    seen.set(key, sourceRow);

    rows.push({
      row: sourceRow,
      name,
      phone,
      normalized,
      status: "valid",
      note: "Ready",
      message: personalize(
        template,
        { name, normalized, phone },
        fallbackName
      ),
    });
  }

  return rows;
};

const csvCell = (value: string): string =>
  /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

const MAX_PREVIEW_ROWS = 200;

export default function BulkSMS() {
  const { t } = useLanguage();

  const [contacts, setContacts] = useState("");
  const [template, setTemplate] = useState("");
  const [fallbackName, setFallbackName] = useState("there");
  const [notice, setNotice] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const rows = useMemo(
    () => buildRows(contacts, template, fallbackName),
    [contacts, template, fallbackName]
  );

  const validRows = useMemo(() => rows.filter((row) => row.status === "valid"), [rows]);

  const invalidCount = rows.filter((row) => row.status === "invalid").length;
  const duplicateCount = rows.filter((row) => row.status === "duplicate").length;

  const hasTemplate = template.trim().length > 0;
  const canExport = hasTemplate && validRows.length > 0;

  const previewRows = useMemo(
    () => (rows.length > MAX_PREVIEW_ROWS ? rows.slice(0, MAX_PREVIEW_ROWS) : rows),
    [rows]
  );

  const templateStats = smsStats(template);

  const longest = useMemo(
    () =>
      validRows.reduce(
        (max, row) => Math.max(max, smsStats(row.message).segments),
        0
      ),
    [validRows]
  );

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const handleCopy = async (value: string, key: string) => {
    const copied = await copyText(value);
    setCopiedKey(copied ? key : null);
    showNotice(
      copied
        ? "Copied to clipboard."
        : "Copy failed. Please copy the text manually."
    );
  };

  const allMessages = () => validRows.map((row) => row.message).join("\n");

  const exportCsv = () => {
    const header = ["Name", "Phone", "Message"];
    const body = validRows.map((row) =>
      [row.name, row.normalized, row.message].map(csvCell).join(",")
    );
    downloadText(
      [header.join(","), ...body].join("\r\n"),
      "bulk-sms-messages.csv",
      "text/csv;charset=utf-8"
    );
    showNotice("CSV file downloaded.");
  };

  const exportTxt = () => {
    downloadText(
      allMessages(),
      "bulk-sms-messages.txt",
      "text/plain;charset=utf-8"
    );
    showNotice("Text file downloaded.");
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setContacts(String(reader.result ?? ""));
      showNotice(`Imported ${file.name}.`);
    };
    reader.onerror = () => showNotice("Could not read that file.");
    reader.readAsText(file);
  };

  const loadExample = () => {
    setContacts(EXAMPLE_CONTACTS);
    setTemplate(EXAMPLE_MESSAGE);
    setFallbackName("there");
    showNotice("Example loaded.");
  };

  const clearAll = () => {
    setContacts("");
    setTemplate("");
    setFallbackName("there");
    setNotice("");
    setCopiedKey(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const statusStyles: Record<ContactStatus, string> = {
    valid: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    invalid: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    duplicate:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  };

  const statusLabels: Record<ContactStatus, string> = {
    valid: "Valid",
    invalid: "Invalid",
    duplicate: "Duplicate",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Utility Tool
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Bulk SMS Composer
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
          Paste a contact list, write one message with{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            {"{name}"}
          </code>{" "}
          personalization, and get a ready-to-send message for every valid
          contact.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {/* Contacts */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                1. Contacts
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                One contact per line. Use <strong>Name, Phone</strong>, a tab
                separated row, or a single phone number per line.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.tsv,.txt,text/csv,text/plain"
                className="sr-only"
                aria-label="Import contact list file"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Import file
              </button>
              <button
                type="button"
                onClick={loadExample}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Load example
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={!contacts && !template}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t.common.clear}
              </button>
            </div>
          </div>

          <label
            htmlFor="bulk-sms-contacts"
            className="mt-5 mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Contact list
          </label>
          <textarea
            id="bulk-sms-contacts"
            value={contacts}
            onChange={(event) => setContacts(event.target.value)}
            spellCheck={false}
            className="min-h-64 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 font-mono text-sm leading-6 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder={"Name, Phone\nAva Bennett, +1 202 555 0143\n+44 20 7946 0958"}
            aria-describedby="bulk-sms-contacts-hint"
          />
          <p
            id="bulk-sms-contacts-hint"
            className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400"
          >
            Supported separators: comma, tab or whitespace. Quoted CSV values,
            header rows and the 00 international prefix are handled
            automatically.
          </p>
        </section>

        {/* Message */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            2. Message
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Write one message. The tokens below are replaced for every contact.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTemplate((value) => `${value}{name}`)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              Insert {"{name}"}
            </button>
            <button
              type="button"
              onClick={() => setTemplate((value) => `${value}{phone}`)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              Insert {"{phone}"}
            </button>
          </div>

          <label
            htmlFor="bulk-sms-message"
            className="mt-5 mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Message template
          </label>
          <textarea
            id="bulk-sms-message"
            value={template}
            onChange={(event) => setTemplate(event.target.value)}
            className="min-h-40 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm leading-6 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder={`Hi {name}, your appointment is confirmed. Reply STOP to opt out.`}
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label
                htmlFor="bulk-sms-fallback"
                className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Fallback name when a contact has no name
              </label>
              <input
                id="bulk-sms-fallback"
                type="text"
                value={fallbackName}
                onChange={(event) => setFallbackName(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
            </div>

            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex gap-1.5">
                <dt className="font-semibold text-gray-800 dark:text-gray-200">
                  Characters:
                </dt>
                <dd>{templateStats.length}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="font-semibold text-gray-800 dark:text-gray-200">
                  Encoding:
                </dt>
                <dd>{templateStats.encoding}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="font-semibold text-gray-800 dark:text-gray-200">
                  Segments:
                </dt>
                <dd>{templateStats.segments || 0}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Summary */}
        <section
          aria-label="Contact summary"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              label: "Contacts",
              value: rows.length,
              tone: "text-gray-900 dark:text-white",
            },
            {
              label: "Valid",
              value: validRows.length,
              tone: "text-green-600 dark:text-green-400",
            },
            {
              label: "Invalid",
              value: invalidCount,
              tone: "text-red-600 dark:text-red-400",
            },
            {
              label: "Duplicates",
              value: duplicateCount,
              tone: "text-amber-600 dark:text-amber-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className={`mt-2 text-3xl font-bold ${stat.tone}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {notice && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300"
          >
            {notice}
          </p>
        )}

        {/* Results */}
        <section
          id="bulk-sms-results"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                3. Generated messages
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {hasTemplate
                  ? `${validRows.length} message${validRows.length === 1 ? "" : "s"} ready${longest > 1 ? `, up to ${longest} SMS segments each` : ""}. Invalid and duplicate contacts are excluded.`
                  : `${validRows.length} valid contact${validRows.length === 1 ? "" : "s"}. Add a message template above to generate personalized texts.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCopy(allMessages(), "all")}
                disabled={!canExport}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copiedKey === "all" ? t.common.copied : `Copy all`}
              </button>
              <button
                type="button"
                onClick={exportCsv}
                disabled={!canExport}
                className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={exportTxt}
                disabled={!canExport}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t.common.download} TXT
              </button>
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-950">
              <p className="text-3xl text-gray-400" aria-hidden="true">
                ✉
              </p>
              <p className="mt-3 font-semibold text-gray-800 dark:text-gray-200">
                No contacts yet
              </p>
              <p className="mx-auto mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">
                Paste or import a contact list above. Your preview updates
                automatically as you type.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Generated personalized SMS messages for each contact
                </caption>
                <thead className="bg-gray-50 dark:bg-gray-950">
                  <tr className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <th scope="col" className="px-4 py-3">
                      #
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Message
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row) => (
                    <tr
                      key={row.row}
                      className="border-t border-gray-100 align-top dark:border-gray-800"
                    >
                      <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                        {row.row}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                        {row.name || (
                          <span className="font-normal text-gray-400 dark:text-gray-500">
                            No name
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                        {row.normalized || row.phone || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[row.status]}`}
                        >
                          {statusLabels[row.status]}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                          {row.note}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {row.message || (
                          <span className="text-gray-400 dark:text-gray-500">
                            Not generated
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleCopy(row.message, `row-${row.row}`)}
                          disabled={!row.message}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          {copiedKey === `row-${row.row}`
                            ? t.common.copied
                            : t.common.copy}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rows.length > previewRows.length && (
            <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
              Showing the first {previewRows.length} of {rows.length} contacts
              to keep the preview fast. Copy and export always include every
              valid contact.
            </p>
          )}
        </section>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Everything runs in your browser. No messages are sent and no contact
          data leaves this device.
        </p>
      </div>
    </div>
  );
}
