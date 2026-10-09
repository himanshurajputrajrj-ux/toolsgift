"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PDFDocument, StandardFonts, rgb, type PDFPage } from "pdf-lib";

type Mode = "start" | "goods" | "software" | "services";

type Invoice = {
  id: string;
  number: string;
  date: string;
  currency: string;
  amount: string;
};

type EDFData = {
  formNo: string;
  customsSecurityNo: string;
  shippingBillNo: string;
  shippingBillDate: string;
  transport: string;
  categoryOfExporter: string;
  rbiApproval: string;
  ieCode: string;
  adCode: string;
  exporterNameAddress: string;
  adNameAddress: string;
  consigneeNameAddress: string;
  modeRealisation: string;
  portLoading: string;
  thirdPartyNameAddress: string;
  destinationCountry: string;
  portDischarge: string;
  indianBankAdCode: string;
  acu: string;
  leoDate: string;
  commodityDescription: string;
  stateOrigin: string;
  totalFobWords: string;
  assessableValue: string;
  declarationDate: string;
  place: string;
  exporterName: string;
  exporterDesignation: string;
};

const initialEDF: EDFData = {
  formNo: "",
  customsSecurityNo: "",
  shippingBillNo: "",
  shippingBillDate: "",
  transport: "Air",
  categoryOfExporter: "Custom (DTA units)",
  rbiApproval: "",
  ieCode: "",
  adCode: "",
  exporterNameAddress: "",
  adNameAddress: "",
  consigneeNameAddress: "",
  modeRealisation: "Others",
  portLoading: "",
  thirdPartyNameAddress: "",
  destinationCountry: "",
  portDischarge: "",
  indianBankAdCode: "",
  acu: "No",
  leoDate: "",
  commodityDescription: "",
  stateOrigin: "",
  totalFobWords: "",
  assessableValue: "",
  declarationDate: "",
  place: "",
  exporterName: "",
  exporterDesignation: "",
};

const makeInvoice = (): Invoice => ({
  id: `${Date.now()}-${Math.random()}`,
  number: "",
  date: "",
  currency: "USD",
  amount: "",
});

const sources = [
  ["adsense", "Google AdSense", "G"],
  ["youtube", "YouTube", "▶"],
  ["meta", "Meta / Facebook", "M"],
  ["instagram", "Instagram", "◎"],
  ["upwork", "Upwork", "U"],
  ["fiverr", "Fiverr", "F"],
  ["paypal", "PayPal", "P"],
  ["other", "Other / Manual", "+"],
] as const;

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[62px] w-full resize-y rounded border border-gray-300 bg-white p-2 text-sm outline-none focus:border-black"
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white p-2 text-sm outline-none focus:border-black"
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 bg-white p-2 text-sm outline-none focus:border-black"
      >
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}

function Button({
  children,
  onClick,
  primary = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        primary
          ? "bg-black text-white hover:bg-gray-800"
          : "border border-gray-300 bg-white hover:border-black"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

function SelectionCard({
  icon,
  title,
  text,
  onClick,
}: {
  icon: string;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-black hover:shadow-md"
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
        {icon}
      </div>
      <div className="font-bold">{title}</div>
      <div className="mt-1 text-sm text-gray-500">{text}</div>
    </button>
  );
}

export default function EDFForm() {
  const [mode, setMode] = useState<Mode>("start");
  const [goodsRoute, setGoodsRoute] = useState("");
  const [softwareType, setSoftwareType] = useState("");
  const [edf, setEdf] = useState<EDFData>(initialEDF);
  const [invoices, setInvoices] = useState<Invoice[]>([makeInvoice()]);
  const [paymentSource, setPaymentSource] = useState("other");
  const [sourceOpen, setSourceOpen] = useState(false);
  const [sourceSearch, setSourceSearch] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [bankLoading, setBankLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [busy, setBusy] = useState(false);

  const update = (key: keyof EDFData, value: string) =>
    setEdf((p) => ({ ...p, [key]: value }));

  const selectedSource =
    sources.find((x) => x[0] === paymentSource) || sources[sources.length - 1];

  const filteredSources = useMemo(() => {
    const q = sourceSearch.toLowerCase().trim();
    if (!q) return sources;
    return sources.filter((x) => x[1].toLowerCase().includes(q));
  }, [sourceSearch]);

  useEffect(() => {
    const trimmed = ifsc.trim();
    if (!trimmed) {
      const t = window.setTimeout(() => setBankInfo(""), 0);
      return () => window.clearTimeout(t);
    }
    const code = trimmed.toUpperCase();
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(code)) {
      const t = window.setTimeout(() => setBankInfo(""), 0);
      return () => window.clearTimeout(t);
    }

    const timer = window.setTimeout(async () => {
      try {
        setBankLoading(true);
        const r = await fetch(
          `https://ifsc.razorpay.com/${encodeURIComponent(code)}`
        );
        if (!r.ok) {
          setBankInfo("Bank details not found");
          return;
        }
        const d = await r.json();
        setBankInfo(
          [d.BANK, d.BRANCH, d.ADDRESS, d.CITY, d.DISTRICT, d.STATE]
            .filter(Boolean)
            .join(" • ")
        );
      } catch {
        setBankInfo("Unable to fetch bank details");
      } finally {
        setBankLoading(false);
      }
    }, 500);

    return () => window.clearTimeout(timer);
  }, [ifsc]);

  function setSource(id: string) {
    setPaymentSource(id);
    setSourceOpen(false);
    setSourceSearch("");

    const source = sources.find((x) => x[0] === id);
    if (!source || id === "other") return;

    const payer =
      id === "meta" || id === "instagram"
        ? "Meta Platforms, Inc."
        : id === "upwork"
          ? "Upwork Global Inc."
          : id === "fiverr"
            ? "Fiverr International Ltd."
            : id === "paypal"
              ? "PayPal, Inc."
              : "Google LLC";

    setEdf((p) => ({
      ...p,
      consigneeNameAddress: `${payer}\nForeign payer / platform`,
    }));
  }

  const buildEDF = useMemo(() => async (): Promise<Uint8Array> => {
    const r = await fetch("/templates/rbi-edf-template.pdf");
    if (!r.ok) throw new Error("RBI EDF template could not be loaded.");

    const source = await PDFDocument.load(await r.arrayBuffer());
    const out = await PDFDocument.create();
    const pages = await out.copyPages(source, [0, 1]);
    pages.forEach((p) => out.addPage(p));

    const font = await out.embedFont(StandardFonts.Helvetica);
    const bold = await out.embedFont(StandardFonts.HelveticaBold);
    const page1 = out.getPages()[0];
    const page2 = out.getPages()[1];
    const size = page1.getSize();

    const write = (
      page: PDFPage,
      value: string,
      x: number,
      top: number,
      fontSize = 7,
      strong = false
    ) => {
      if (!value) return;
      const clean = String(value).replace(/\r/g, "").trim();
      if (!clean) return;
      page.drawText(clean, {
        x,
        y: size.height - top - fontSize,
        size: fontSize,
        font: strong ? bold : font,
        color: rgb(0, 0, 0),
      });
    };

    const multiline = (
      page: PDFPage,
      value: string,
      x: number,
      top: number,
      fontSize = 6.5,
      maxLines = 4
    ) => {
      String(value || "")
        .split(/\r?\n/)
        .slice(0, maxLines)
        .forEach((line, i) => write(page, line, x, top + i * 8, fontSize));
    };

    // Marks the matching printed checkbox on the official template.
    const markChoice = (
      page: PDFPage,
      options: { text: string; x0: number; x1: number }[],
      value: string,
      top: number,
      fallbackX: number,
      fontSize = 6.5
    ) => {
      const v = String(value || "").trim();
      if (!v) return;
      const hit = options.find(
        (o) => o.text.toLowerCase() === v.toLowerCase()
      );
      if (!hit) {
        write(page, v, fallbackX, top, fontSize);
        return;
      }
      const w = bold.widthOfTextAtSize("X", fontSize);
      write(
        page,
        "X",
        hit.x0 + (hit.x1 - hit.x0 - w) / 2,
        top,
        fontSize,
        true
      );
    };

    // These coordinates overlay the official RBI EDF template
    // (source pages 139-140 = printed pages 137-138).
    // Page 0: General Information + Invoice-wise details.
    write(page1, edf.customsSecurityNo, 155, 67.1);
    write(page1, edf.formNo, 326, 67.1);
    write(page1, edf.shippingBillNo, 266, 90.6);
    write(page1, edf.shippingBillDate, 266, 106, 6.5);
    write(page1, edf.rbiApproval, 396, 137.1);
    write(page1, edf.ieCode, 97, 183.6);
    write(page1, edf.adCode, 305, 183.6);
    multiline(page1, edf.exporterNameAddress, 57.7, 219);
    multiline(page1, edf.adNameAddress, 262.9, 219);
    multiline(page1, edf.consigneeNameAddress, 57.7, 300);
    markChoice(
      page1,
      [
        { text: "L/C", x0: 358.2, x1: 375.7 },
        { text: "BG", x0: 415.4, x1: 430.4 },
        { text: "Others", x0: 465.9, x1: 485.9 },
      ],
      edf.modeRealisation,
      288.9,
      519.5
    );
    write(page1, edf.portLoading, 451, 333.3);
    multiline(page1, edf.thirdPartyNameAddress, 57.7, 366);
    write(page1, edf.destinationCountry, 262.9, 386);
    write(page1, edf.portDischarge, 468, 368.2);
    multiline(page1, edf.indianBankAdCode, 57.7, 422, 6.5, 2);
    markChoice(
      page1,
      [
        { text: "Yes", x0: 266.2, x1: 286.3 },
        { text: "No", x0: 318.4, x1: 333.5 },
      ],
      edf.acu,
      437.3,
      361
    );
    write(page1, edf.leoDate, 390.8, 427, 6.5);
    multiline(page1, edf.commodityDescription, 57.7, 451, 6.5, 3);
    write(page1, edf.stateOrigin, 371, 454);
    write(page1, edf.totalFobWords, 57.7, 491, 6.5);
    write(page1, edf.assessableValue, 403, 477.5);

    const inv = invoices[0];
    if (inv) {
      write(page1, inv.number, 107.5, 542.8, 6.5);
      write(page1, inv.date, 111.5, 565.9, 6.5);
      write(page1, inv.currency, 233, 542.8, 6.5);
      write(page1, inv.amount, 229, 565.9, 6.5);
    }

    // Page 1: Declaration by Exporters + signature block.
    write(page2, edf.declarationDate, 66.5, 286.2);
    write(page2, edf.place, 200, 286.2);
    write(page2, edf.exporterName, 421, 263);
    write(page2, edf.exporterDesignation, 421, 274);

    return new Uint8Array(await out.save());
  }, [edf, invoices]);

  const buildEDFRef = useMemo(() => buildEDF, [buildEDF]);
  useEffect(() => {
    if (mode !== "goods" || goodsRoute !== "non-edi") return;

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const bytes = await buildEDFRef();
        if (cancelled) return;
        setPdfBytes(bytes);
        const url = URL.createObjectURL(
          new Blob([new Uint8Array(bytes)], { type: "application/pdf" })
        );
        setPreviewUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return url;
        });
      } catch (e) {
        console.error("EDF preview error", e);
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [mode, goodsRoute, edf, invoices, buildEDFRef]);

  async function download() {
    setBusy(true);
    try {
      const bytes = pdfBytes || (await buildEDF());
      const blob = new Blob([new Uint8Array(bytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `RBI-EDF-${edf.formNo || "draft"}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setBusy(false);
    }
  }

  async function print() {
    const bytes = pdfBytes || (await buildEDF());
    const url = URL.createObjectURL(
      new Blob([new Uint8Array(bytes)], { type: "application/pdf" })
    );
    const w = window.open(url, "_blank");
    if (w) w.onload = () => w.print();
  }

  async function share() {
    const bytes = pdfBytes || (await buildEDF());
    const blob = new Blob([new Uint8Array(bytes)], {
      type: "application/pdf",
    });
    const file = new File([blob], `RBI-EDF-${edf.formNo || "draft"}.pdf`, {
      type: "application/pdf",
    });

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        title: "RBI Export Declaration Form",
        text: "Completed EDF form",
        files: [file],
      });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  function reset() {
    setMode("start");
    setGoodsRoute("");
    setSoftwareType("");
    setEdf(initialEDF);
    setInvoices([makeInvoice()]);
    setPaymentSource("other");
    setIfsc("");
    setBankInfo("");
  }

  const start = (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          RBI Export Forms
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500">
          आपको form का नाम याद रखने की जरूरत नहीं। बस बताइए आप क्या export कर रहे हैं।
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SelectionCard
          icon="📦"
          title="Goods Export"
          text="Goods export के लिए सही RBI declaration route चुनें।"
          onClick={() => setMode("goods")}
        />
        <SelectionCard
          icon="💻"
          title="Software Export"
          text="SOFTEX workflow के लिए सही option चुनें।"
          onClick={() => setMode("software")}
        />
        <SelectionCard
          icon="🌐"
          title="Services / Online Earnings"
          text="Platform या foreign client से service payment के लिए।"
          onClick={() => setMode("services")}
        />
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
        <b>Need help choosing?</b> ऊपर सिर्फ अपना काम चुनें। बाकी route हम आसान भाषा में दिखाएँगे।
      </div>
    </div>
  );

  if (mode === "start") {
    return <div className="min-h-screen bg-gray-50">{start}</div>;
  }

  if (mode === "goods" && !goodsRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <Button onClick={() => setMode("start")}>← Back</Button>
          <h1 className="mt-6 text-2xl font-bold">Goods Export</h1>
          <p className="mt-1 text-sm text-gray-500">
            आपका export किस तरह के customs route से है?
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SelectionCard
              icon="📄"
              title="Non-EDI Port"
              text="Official RBI EDF — actual RBI format."
              onClick={() => setGoodsRoute("non-edi")}
            />
            <SelectionCard
              icon="🛃"
              title="EDI Port"
              text="Current EDI shipping-bill workflow. Separate old-style SDF generator नहीं।"
              onClick={() => setGoodsRoute("edi")}
            />
          </div>
        </div>
      </div>
    );
  }

  if (mode === "goods" && goodsRoute === "edi") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <Button onClick={() => setGoodsRoute("")}>← Back</Button>
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-2xl font-bold">EDI Export</div>
            <p className="mt-2 text-sm text-gray-600">
              EDI port के लिए current workflow में shipping bill मुख्य export declaration document है।
              इस page पर हम अलग पुराना SDF form fabricate नहीं करेंगे।
            </p>
            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
              <b>Next:</b> अपने shipping bill और bank/AD requirements के अनुसार documents तैयार करें।
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "software" && !softwareType) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <Button onClick={() => setMode("start")}>← Back</Button>
          <h1 className="mt-6 text-2xl font-bold">Software Export</h1>
          <p className="mt-1 text-sm text-gray-500">
            SOFTEX workflow चुनें।
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SelectionCard
              icon="1"
              title="Single SOFTEX"
              text="एक export / invoice के लिए."
              onClick={() => setSoftwareType("single")}
            />
            <SelectionCard
              icon="≡"
              title="Bulk SOFTEX"
              text="Multiple eligible software export declarations के लिए."
              onClick={() => setSoftwareType("bulk")}
            />
          </div>
          <div className="mt-5 rounded-xl border bg-white p-4 text-xs text-gray-500">
            SOFTEX का exact official RBI template जोड़ने के बाद इसी screen पर official template-based editor खुलेगा।
          </div>
        </div>
      </div>
    );
  }

  if (mode === "software") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <Button onClick={() => setSoftwareType("")}>← Back</Button>
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold">
              {softwareType === "single" ? "Single SOFTEX" : "Bulk SOFTEX"}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Official RBI SOFTEX template को source PDF के रूप में जोड़कर ही final PDF generator activate किया जाएगा।
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "services") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Button onClick={() => setMode("start")}>← Back</Button>
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Services / Online Earnings</h1>
            <p className="mt-2 text-sm text-gray-600">
              Meta, YouTube, AdSense, Upwork, Fiverr, PayPal या foreign client से service payment के लिए platform चुनें।
            </p>

            <button
              type="button"
              onClick={() => setSourceOpen(true)}
              className="mt-5 flex w-full items-center gap-3 rounded-xl border-2 border-gray-200 p-4 text-left hover:border-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">
                {selectedSource[2]}
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{selectedSource[1]}</span>
                <span className="text-xs text-gray-500">
                  Select payment source
                </span>
              </span>
              <span>⌄</span>
            </button>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field
                label="Exporter / Your Name"
                value={edf.exporterName}
                onChange={(v) => update("exporterName", v)}
              />
              <Field
                label="IEC (if applicable)"
                value={edf.ieCode}
                onChange={(v) => update("ieCode", v)}
              />
              <Field
                label="Foreign Payer / Client"
                value={edf.consigneeNameAddress}
                onChange={(v) => update("consigneeNameAddress", v)}
                multiline
              />
              <Field
                label="Service Description"
                value={edf.commodityDescription}
                onChange={(v) => update("commodityDescription", v)}
                multiline
              />
            </div>

            <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
              यह section bank-supporting document workflow के लिए है। इसे official RBI EDF form के रूप में represent नहीं किया जाएगा।
            </div>
          </div>
        </div>

        {sourceOpen &&
          createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
              <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <b>Payment Source</b>
                    <button onClick={() => setSourceOpen(false)}>✕</button>
                  </div>
                  <input
                    autoFocus
                    value={sourceSearch}
                    onChange={(e) => setSourceSearch(e.target.value)}
                    placeholder="Search platform..."
                    className="mt-3 w-full rounded-lg border p-3 outline-none focus:border-black"
                  />
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
                  {filteredSources.map((s) => (
                    <button
                      key={s[0]}
                      type="button"
                      onClick={() => setSource(s[0])}
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-100"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">
                        {s[2]}
                      </span>
                      <span className="font-medium">{s[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-[1600px] px-3 py-4 md:px-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm">
          <div>
            <div className="text-lg font-bold">Official RBI EDF — Online Fill</div>
            <div className="text-xs text-gray-500">
              Goods export through Non-EDI port
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={download} primary disabled={busy}>
              {busy ? "Generating..." : "Download PDF"}
            </Button>
            <Button onClick={print}>Print</Button>
            <Button onClick={share}>Share</Button>
            <Button onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(430px,0.75fr)]">
          <div className="rounded-xl border-2 border-black bg-white shadow-sm">
            <div className="border-b-2 border-black p-4 text-center">
              <div className="text-[10px] font-semibold">
                PART IX : TRADE — ANNEX I
              </div>
              <div className="text-xl font-bold uppercase">
                Export Declaration Form
              </div>
              <div className="mt-1 text-[10px] text-gray-500">
                Fill only the fields you need; the PDF preview updates automatically.
              </div>
            </div>

            <div className="border-b border-black p-3">
              <div className="mb-2 text-xs font-bold">
                2. General Information
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Customs Security No."
                  value={edf.customsSecurityNo}
                  onChange={(v) => update("customsSecurityNo", v)}
                />
                <Field
                  label="Form No."
                  value={edf.formNo}
                  onChange={(v) => update("formNo", v)}
                />
                <Field
                  label="Shipping Bill No."
                  value={edf.shippingBillNo}
                  onChange={(v) => update("shippingBillNo", v)}
                />
                <Field
                  label="Shipping Bill Date"
                  value={edf.shippingBillDate}
                  onChange={(v) => update("shippingBillDate", v)}
                />
                <SelectField
                  label="Mode of Transport"
                  value={edf.transport}
                  onChange={(v) => update("transport", v)}
                  options={["Air", "Land", "Sea", "Post/Couriers", "Others"]}
                />
                <SelectField
                  label="Category of Exporter"
                  value={edf.categoryOfExporter}
                  onChange={(v) => update("categoryOfExporter", v)}
                  options={[
                    "Custom (DTA units)",
                    "SEZ",
                    "Status holder exporters",
                    "100% EOU",
                    "Warehouse export",
                    "Others",
                  ]}
                />
                <Field
                  label="RBI Approval No. & Date, if any"
                  value={edf.rbiApproval}
                  onChange={(v) => update("rbiApproval", v)}
                />
                <Field
                  label="IE Code"
                  value={edf.ieCode}
                  onChange={(v) => update("ieCode", v)}
                />
                <Field
                  label="AD Code"
                  value={edf.adCode}
                  onChange={(v) => update("adCode", v)}
                />
                <Field
                  label="Exporter Name & Address"
                  value={edf.exporterNameAddress}
                  onChange={(v) => update("exporterNameAddress", v)}
                  multiline
                />
                <Field
                  label="AD Name & Address"
                  value={edf.adNameAddress}
                  onChange={(v) => update("adNameAddress", v)}
                  multiline
                />
                <Field
                  label="Consignee Name & Address"
                  value={edf.consigneeNameAddress}
                  onChange={(v) => update("consigneeNameAddress", v)}
                  multiline
                />
                <SelectField
                  label="Mode of Realisation"
                  value={edf.modeRealisation}
                  onChange={(v) => update("modeRealisation", v)}
                  options={["L/C", "BG", "Others"]}
                />
                <Field
                  label="Port of Loading / Source Port in case of SEZ"
                  value={edf.portLoading}
                  onChange={(v) => update("portLoading", v)}
                />
                <Field
                  label="Third Party Name & Address"
                  value={edf.thirdPartyNameAddress}
                  onChange={(v) => update("thirdPartyNameAddress", v)}
                  multiline
                />
                <Field
                  label="Country of Destination"
                  value={edf.destinationCountry}
                  onChange={(v) => update("destinationCountry", v)}
                />
                <Field
                  label="Port of Discharge"
                  value={edf.portDischarge}
                  onChange={(v) => update("portDischarge", v)}
                />
                <Field
                  label="Indian Bank and AD Code (LC/BG)"
                  value={edf.indianBankAdCode}
                  onChange={(v) => update("indianBankAdCode", v)}
                />
                <SelectField
                  label="Payment through ACU?"
                  value={edf.acu}
                  onChange={(v) => update("acu", v)}
                  options={["Yes", "No"]}
                />
                <Field
                  label="Let Export Order (LEO) Date"
                  value={edf.leoDate}
                  onChange={(v) => update("leoDate", v)}
                />
                <Field
                  label="State of Origin of Goods"
                  value={edf.stateOrigin}
                  onChange={(v) => update("stateOrigin", v)}
                />
                <Field
                  label="General Commodity Description"
                  value={edf.commodityDescription}
                  onChange={(v) => update("commodityDescription", v)}
                  multiline
                />
                <Field
                  label="Total FOB Value in Words (INR)"
                  value={edf.totalFobWords}
                  onChange={(v) => update("totalFobWords", v)}
                />
                <Field
                  label="Custom Assessable Value (INR)"
                  value={edf.assessableValue}
                  onChange={(v) => update("assessableValue", v)}
                />
              </div>
            </div>

            <div className="border-b border-black p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold">
                  3. Invoice-Wise details of Export Value
                </div>
                <Button
                  onClick={() => setInvoices((p) => [...p, makeInvoice()])}
                >
                  + Add Invoice
                </Button>
              </div>

              <div className="mt-3 space-y-3">
                {invoices.map((inv, i) => (
                  <div key={inv.id} className="rounded-lg border p-3">
                    <div className="mb-2 text-xs font-bold">
                      Invoice {i + 1}
                    </div>
                    <div className="grid gap-3 md:grid-cols-4">
                      <Field
                        label="Invoice No."
                        value={inv.number}
                        onChange={(v) =>
                          setInvoices((p) =>
                            p.map((x) =>
                              x.id === inv.id ? { ...x, number: v } : x
                            )
                          )
                        }
                      />
                      <Field
                        label="Invoice Date"
                        value={inv.date}
                        onChange={(v) =>
                          setInvoices((p) =>
                            p.map((x) =>
                              x.id === inv.id ? { ...x, date: v } : x
                            )
                          )
                        }
                      />
                      <Field
                        label="Invoice Currency"
                        value={inv.currency}
                        onChange={(v) =>
                          setInvoices((p) =>
                            p.map((x) =>
                              x.id === inv.id ? { ...x, currency: v } : x
                            )
                          )
                        }
                      />
                      <Field
                        label="Invoice Amount"
                        value={inv.amount}
                        onChange={(v) =>
                          setInvoices((p) =>
                            p.map((x) =>
                              x.id === inv.id ? { ...x, amount: v } : x
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Declaration Date"
                  value={edf.declarationDate}
                  onChange={(v) => update("declarationDate", v)}
                />
                <Field
                  label="Place"
                  value={edf.place}
                  onChange={(v) => update("place", v)}
                />
                <Field
                  label="Exporter Name"
                  value={edf.exporterName}
                  onChange={(v) => update("exporterName", v)}
                />
                <Field
                  label="Designation"
                  value={edf.exporterDesignation}
                  onChange={(v) => update("exporterDesignation", v)}
                />
              </div>
            </div>

            <div className="border-t bg-gray-50 p-3">
              <div className="text-xs font-semibold">
                Official-form note
              </div>
              <div className="mt-1 text-xs text-gray-600">
                This EDF template is for goods exports through Non-EDI ports. Check the current RBI/Customs/AD-bank requirements for your transaction before submission.
              </div>
            </div>
          </div>

          <div className="xl:sticky xl:top-4 xl:self-start">
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b p-3">
                <div>
                  <div className="font-bold">Live RBI PDF Preview</div>
                  <div className="text-xs text-gray-500">
                    Form changes appear automatically
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={print}>Print</Button>
                  <Button onClick={download} primary disabled={busy}>
                    Download
                  </Button>
                </div>
              </div>

              <div className="h-[78vh] bg-gray-200">
                {previewUrl ? (
                  <iframe
                    title="RBI EDF PDF Preview"
                    src={previewUrl}
                    className="h-full w-full border-0"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Preparing RBI PDF preview…
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm">
              <div className="text-sm font-bold">Bank / AD details helper</div>
              <div className="mt-3">
                <Field
                  label="IFSC"
                  value={ifsc}
                  onChange={(v) => setIfsc(v.toUpperCase())}
                  placeholder="Example: HDFC0001234"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {bankLoading ? "Searching bank…" : bankInfo || "IFSC डालने पर bank/branch details दिखेंगी।"}
              </div>
            </div>

            <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm">
              <div className="text-sm font-bold">Payment source</div>
              <button
                type="button"
                onClick={() => setSourceOpen(true)}
                className="mt-2 flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:border-black"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded bg-gray-100 font-bold">
                  {selectedSource[2]}
                </span>
                <span className="flex-1 text-sm font-semibold">
                  {selectedSource[1]}
                </span>
                <span>⌄</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {sourceOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <b>Payment Source</b>
                  <button type="button" onClick={() => setSourceOpen(false)}>
                    ✕
                  </button>
                </div>
                <input
                  autoFocus
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  placeholder="Search..."
                  className="mt-3 w-full rounded-lg border p-3 outline-none focus:border-black"
                />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
                {filteredSources.map((s) => (
                  <button
                    key={s[0]}
                    type="button"
                    onClick={() => setSource(s[0])}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-100"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">
                      {s[2]}
                    </span>
                    <span className="font-medium">{s[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
