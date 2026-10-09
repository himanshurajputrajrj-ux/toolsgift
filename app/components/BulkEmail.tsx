"use client";

import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";

type ContactStatus = "valid" | "invalid" | "duplicate";

type EmailRow = {
  row: number;
  name: string;
  email: string;
  status: ContactStatus;
  note: string;
  subject: string;
  body: string;
};

type ContactFormat = "none" | "header" | "table" | "single";

type ParsedContacts = {
  rows: EmailRow[];
  format: ContactFormat;
  message: string;
};

const EMAIL_COLUMN_PATTERN =
  /^(e-?mail(\s*(address|id|addr))?|mail(\s*address)?|correo(\s+electr[oó]nico)?|adresse\s+e-?mail)$/i;

const NAME_COLUMN_PATTERN =
  /^(full\s*name|first\s*name|last\s*name|name|contact(\s*name)?|nombre|nom|naam|nazwa|姓名|имя)$/i;

const EXAMPLE_CONTACTS = `Name, Email
Ava Bennett, ava.bennett@example.com
Noah Carter, noah+news@example.co.uk
"Mia, Delgado", mia.delgado@example.com
Liam Foster, liam.foster@example.org
Duplicate Entry, AVA.BENNETT@example.com
Invalid Entry, not-an-email`;

const EXAMPLE_SUBJECT = "Quick update for {name}";

const EXAMPLE_BODY = `Hi {name},

We are sending this note to {email} because you are on our update list.

Your ToolsGift summary is ready: open the tool, paste your data and the result appears instantly.

Reply to this email if you have any questions.

Thanks,
The ToolsGift team`;

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

const isValidEmail = (value: string): boolean => {
  const email = value.trim();

  if (!email || email.length > 254) return false;

  const at = email.indexOf("@");
  if (at < 1 || at !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (local.length > 64 || domain.length > 253) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return false;
  if (!/^[^\s@,;<>"']+$/.test(local)) return false;
  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes(".."))
    return false;

  const labels = domain.split(".");
  if (labels.length < 2) return false;

  const tld = labels[labels.length - 1];
  if (tld.length < 2 || tld.length > 24) return false;

  return labels.every(
    (label) =>
      label.length > 0 &&
      label.length <= 63 &&
      /^[a-z0-9-]+$/i.test(label) &&
      !label.startsWith("-") &&
      !label.endsWith("-")
  );
};

const normalizeNewlines = (text: string): string =>
  text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

const detectDelimiter = (text: string): string | null => {
  const firstLine =
    text.split("\n").find((line) => line.trim().length > 0) ?? "";

  if (firstLine.includes("\t")) return "\t";
  if (firstLine.includes(",")) return ",";
  if (firstLine.includes(";")) return ";";

  return null;
};

const parseDelimited = (text: string, delimiter: string): string[][] => {
  const rows: string[][] = [];
  let fields: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"' && field === "") {
      inQuotes = true;
    } else if (char === delimiter) {
      fields.push(field.trim());
      field = "";
    } else if (char === "\n") {
      fields.push(field.trim());
      field = "";
      if (fields.some((value) => value.length > 0)) rows.push(fields);
      fields = [];
    } else {
      field += char;
    }
  }

  fields.push(field.trim());
  if (fields.some((value) => value.length > 0)) rows.push(fields);

  return rows;
};

const splitPlainLine = (line: string): string[] => {
  const tokens = line.trim().split(/\s+/);
  const index = tokens.findIndex((token) => token.includes("@"));

  if (index === -1) return [line.trim()];

  return [tokens.slice(0, index).join(" "), tokens[index]];
};

const personalize = (
  template: string,
  contact: { name: string; email: string },
  fallbackName: string
): string =>
  template.replace(/\{(name|email)\}/gi, (_match, token: string) =>
    token.toLowerCase() === "name"
      ? contact.name || fallbackName
      : contact.email
  );

const buildRows = (
  contacts: string,
  subject: string,
  body: string,
  fallbackName: string
): ParsedContacts => {
  const text = normalizeNewlines(contacts);

  if (!text.trim()) {
    return { rows: [], format: "none", message: "" };
  }

  const delimiter = detectDelimiter(text);

  const rawRows: string[][] =
    delimiter === null
      ? text
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map(splitPlainLine)
      : parseDelimited(text, delimiter);

  if (rawRows.length === 0) {
    return { rows: [], format: "none", message: "" };
  }

  const headerFields = rawRows[0];
  const headerEmailIndex = headerFields.findIndex((field) =>
    EMAIL_COLUMN_PATTERN.test(field)
  );
  const headerNameIndex = headerFields.findIndex((field) =>
    NAME_COLUMN_PATTERN.test(field)
  );

  const hasHeader =
    headerEmailIndex !== -1 ||
    (headerNameIndex !== -1 && headerFields.length > 1);

  const startIndex = hasHeader ? 1 : 0;
  const emailIndex = headerEmailIndex;
  const nameIndex = headerNameIndex;

  const format: ContactFormat = hasHeader
    ? "header"
    : delimiter === null
      ? "single"
      : "table";

  let message = "";

  if (format === "header") {
    message =
      emailIndex === -1
        ? "Header row detected, but no email column was found. Email addresses are detected automatically in every row."
        : `Header row detected: ${
            nameIndex !== -1 ? `"${headerFields[nameIndex]}" and ` : ""
          }"${headerFields[emailIndex]}" columns are used.`;
  } else if (format === "single") {
    message =
      "One contact per line detected. The text before an email address is used as the contact name.";
  } else if (format === "table") {
    message =
      "Contact table detected. The column containing an email address is used as the email field.";
  }

  const rows: EmailRow[] = [];
  const seen = new Map<string, number>();
  let sourceRow = 0;

  for (let index = startIndex; index < rawRows.length; index += 1) {
    const fields = rawRows[index];
    if (!fields.some((value) => value.length > 0)) continue;

    sourceRow += 1;

    let name = "";
    let email = "";

    if (emailIndex !== -1) {
      email = fields[emailIndex] ?? "";
      name =
        nameIndex !== -1 && nameIndex !== emailIndex
          ? (fields[nameIndex] ?? "")
          : "";
    } else {
      const found = fields.findIndex((value) => value.includes("@"));

      if (found !== -1) {
        email = fields[found];
        name = fields.find((value, position) => position !== found && value) ?? "";
      } else {
        email = fields[fields.length - 1] ?? "";
        name =
          fields.length > 1 ? fields.slice(0, -1).join(", ").trim() : "";
      }
    }

    const trimmedEmail = email.trim();
    const contact = { name: name.trim(), email: trimmedEmail };

    if (!trimmedEmail) {
      rows.push({
        row: sourceRow,
        name: contact.name,
        email: trimmedEmail,
        status: "invalid",
        note: "Missing email address",
        subject: "",
        body: "",
      });
      continue;
    }

    if (!isValidEmail(trimmedEmail)) {
      rows.push({
        row: sourceRow,
        name: contact.name,
        email: trimmedEmail,
        status: "invalid",
        note: "Invalid email address",
        subject: "",
        body: "",
      });
      continue;
    }

    const key = trimmedEmail.toLowerCase();
    const firstSeen = seen.get(key);

    if (firstSeen !== undefined) {
      rows.push({
        row: sourceRow,
        name: contact.name,
        email: trimmedEmail,
        status: "duplicate",
        note: `Duplicate of contact ${firstSeen}`,
        subject: "",
        body: "",
      });
      continue;
    }

    seen.set(key, sourceRow);

    rows.push({
      row: sourceRow,
      name: contact.name,
      email: trimmedEmail,
      status: "valid",
      note: "Ready",
      subject: personalize(subject, contact, fallbackName),
      body: personalize(body, contact, fallbackName),
    });
  }

  return { rows, format, message };
};

const csvCell = (value: string): string =>
  /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

const emailBlock = (row: EmailRow): string =>
  `To: ${row.email}\nSubject: ${row.subject}\n\n${row.body}`;

const EMAIL_SEPARATOR = "--------------------";

const MAX_PREVIEW_ROWS = 200;

export default function BulkEmail() {
  const { t } = useLanguage();

  const [contacts, setContacts] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [fallbackName, setFallbackName] = useState("there");
  const [notice, setNotice] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<"subject" | "body">(
    "subject"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const parsed = useMemo(
    () => buildRows(contacts, subject, body, fallbackName),
    [contacts, subject, body, fallbackName]
  );

  const rows = parsed.rows;
  const validRows = useMemo(
    () => rows.filter((row) => row.status === "valid"),
    [rows]
  );

  const invalidCount = rows.filter((row) => row.status === "invalid").length;
  const duplicateCount = rows.filter((row) => row.status === "duplicate").length;

  const hasSubject = subject.trim().length > 0;
  const hasBody = body.trim().length > 0;
  const hasContent = hasSubject || hasBody;
  const canExport = hasContent && validRows.length > 0;

  const previewRows = useMemo(
    () => (rows.length > MAX_PREVIEW_ROWS ? rows.slice(0, MAX_PREVIEW_ROWS) : rows),
    [rows]
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

  const allEmails = () =>
    validRows.map(emailBlock).join(`\n${EMAIL_SEPARATOR}\n`);

  const exportCsv = () => {
    const header = ["Name", "Email", "Subject", "Body"];
    const lines = validRows.map((row) =>
      [row.name, row.email, row.subject, row.body].map(csvCell).join(",")
    );

    downloadText(
      [header.join(","), ...lines].join("\r\n"),
      "bulk-email-messages.csv",
      "text/csv;charset=utf-8"
    );
    showNotice("CSV file downloaded.");
  };

  const exportTxt = () => {
    downloadText(
      allEmails(),
      "bulk-email-messages.txt",
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
    setSubject(EXAMPLE_SUBJECT);
    setBody(EXAMPLE_BODY);
    setFallbackName("there");
    showNotice("Example loaded.");
  };

  const clearAll = () => {
    setContacts("");
    setSubject("");
    setBody("");
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

  const insertToken = (token: string) => {
    const chunk = `{${token}}`;

    if (activeField === "body" && bodyRef.current) {
      const element = bodyRef.current;
      const start = element.selectionStart ?? body.length;
      const end = element.selectionEnd ?? body.length;
      setBody(body.slice(0, start) + chunk + body.slice(end));
      window.requestAnimationFrame(() => {
        element.focus();
        element.setSelectionRange(start + chunk.length, start + chunk.length);
      });
      return;
    }

    const element = subjectRef.current;
    const start = element?.selectionStart ?? subject.length;
    const end = element?.selectionEnd ?? subject.length;
    setSubject(subject.slice(0, start) + chunk + subject.slice(end));
    window.requestAnimationFrame(() => {
      element?.focus();
      element?.setSelectionRange(start + chunk.length, start + chunk.length);
    });
  };

  const resultsSummary = !hasContent
    ? `${validRows.length} valid contact${
        validRows.length === 1 ? "" : "s"
      }. Add a subject or body above to generate personalized emails.`
    : `${validRows.length} personalized email${
        validRows.length === 1 ? "" : "s"
      } ready. ${
        invalidCount + duplicateCount > 0
          ? `${
              invalidCount + duplicateCount
            } invalid or duplicate contact${
              invalidCount + duplicateCount === 1 ? " is" : "s are"
            } excluded.`
          : "Invalid and duplicate contacts are excluded."
      }`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Utility Tool
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Bulk Email Composer
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
          Paste a contact list, write one subject and body with{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            {"{name}"}
          </code>{" "}
          and{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            {"{email}"}
          </code>{" "}
          personalization, and get a ready-to-copy email for every valid
          contact.
        </p>
      </header>

      <div
        role="note"
        className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300"
      >
        <strong className="font-bold">Prepares, never sends.</strong> This tool
        builds personalized emails in your browser so you can copy or export
        them. No emails are sent and nothing is uploaded to a server.
      </div>

      <div className="mt-8 space-y-6">
        {/* Contacts */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                1. Contacts
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                One contact per line. Use <strong>Name, Email</strong>, a tab
                separated row, an imported CSV/TSV file, or a single email
                address per line.
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
                disabled={!contacts && !subject && !body}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t.common.clear}
              </button>
            </div>
          </div>

          <label
            htmlFor="bulk-email-contacts"
            className="mt-5 mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Contact list
          </label>
          <textarea
            id="bulk-email-contacts"
            value={contacts}
            onChange={(event) => setContacts(event.target.value)}
            spellCheck={false}
            className="min-h-64 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 font-mono text-sm leading-6 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder={"Name, Email\nAva Bennett, ava.bennett@example.com\nnoah.carter@example.co.uk"}
            aria-describedby="bulk-email-contacts-hint"
          />
          <p
            id="bulk-email-contacts-hint"
            className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400"
          >
            Supported separators: comma, semicolon, tab or whitespace. Quoted
            CSV values, embedded commas and header rows are handled
            automatically. Emails are checked for a valid format and duplicates
            are detected case-insensitively.
          </p>

          {parsed.message && (
            <p className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs leading-5 font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              {parsed.message}
            </p>
          )}
        </section>

        {/* Compose */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            2. Compose email
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Write one subject and one body. The tokens below are replaced for
            every contact.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => insertToken("name")}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              Insert {"{name}"}
            </button>
            <button
              type="button"
              onClick={() => insertToken("email")}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              Insert {"{email}"}
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Inserted at the cursor in the{" "}
              <strong className="font-semibold text-gray-700 dark:text-gray-300">
                {activeField === "body" ? "body" : "subject"}
              </strong>
              .
            </span>
          </div>

          <label
            htmlFor="bulk-email-subject"
            className="mt-5 mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Subject
          </label>
          <input
            id="bulk-email-subject"
            ref={subjectRef}
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            onFocus={() => setActiveField("subject")}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="Quick update for {name}"
            aria-describedby="bulk-email-subject-hint"
          />
          <p
            id="bulk-email-subject-hint"
            className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400"
          >
            {subject.length} characters. Enter a subject to include it in every
            generated email.
          </p>

          <label
            htmlFor="bulk-email-body"
            className="mt-5 mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Body
          </label>
          <textarea
            id="bulk-email-body"
            ref={bodyRef}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            onFocus={() => setActiveField("body")}
            className="min-h-56 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm leading-6 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder={"Hi {name},\n\nWe are sending this note to {email}...\n\nThanks,\nThe ToolsGift team"}
            aria-describedby="bulk-email-body-hint"
          />
          <p
            id="bulk-email-body-hint"
            className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400"
          >
            {body.length} characters. Line breaks are kept exactly as you type
            them.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label
                htmlFor="bulk-email-fallback"
                className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Fallback name when a contact has no name
              </label>
              <input
                id="bulk-email-fallback"
                type="text"
                value={fallbackName}
                onChange={(event) => setFallbackName(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
            </div>

            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex gap-1.5">
                <dt className="font-semibold text-gray-800 dark:text-gray-200">
                  Subject chars:
                </dt>
                <dd>{subject.length}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="font-semibold text-gray-800 dark:text-gray-200">
                  Body chars:
                </dt>
                <dd>{body.length}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="font-semibold text-gray-800 dark:text-gray-200">
                  Total:
                </dt>
                <dd>{subject.length + body.length}</dd>
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

        {!hasContent && rows.length > 0 && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300"
          >
            Add a subject or a body to generate personalized emails for your{" "}
            {validRows.length} valid contact
            {validRows.length === 1 ? "" : "s"}.
          </p>
        )}

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
          id="bulk-email-results"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                3. Generated emails
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {resultsSummary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCopy(allEmails(), "all")}
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
                Export TXT
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
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Generated personalized emails for each contact
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
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Subject
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Body
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
                      <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                        {row.email || "—"}
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
                      <td className="max-w-[16rem] px-4 py-3 text-gray-700 dark:text-gray-300">
                        {row.subject || (
                          <span className="text-gray-400 dark:text-gray-500">
                            {row.status === "valid" ? "No subject" : "—"}
                          </span>
                        )}
                      </td>
                      <td className="max-w-[22rem] whitespace-pre-wrap break-words px-4 py-3 text-gray-700 dark:text-gray-300">
                        {row.body || (
                          <span className="text-gray-400 dark:text-gray-500">
                            {row.status === "valid" ? "No body" : "Not generated"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(emailBlock(row), `row-${row.row}`)
                          }
                          disabled={row.status !== "valid"}
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
          Everything runs in your browser. No emails are sent, no SMTP or mail
          service is used, and no contact data leaves this device.
        </p>
      </div>
    </div>
  );
}
