"use client";

import { useMemo, useState } from "react";
import QRCode from "qrcode";

type Mode = "quick" | "card";

type SocialData = {
  name: string;
  title: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  x: string;
  youtube: string;
  linkedin: string;
  telegram: string;
  website: string;
  email: string;
  phone: string;
};

const initialData: SocialData = {
  name: "",
  title: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  x: "",
  youtube: "",
  linkedin: "",
  telegram: "",
  website: "",
  email: "",
  phone: "",
};

const platforms = [
  { key: "whatsapp", label: "WhatsApp", icon: "WA" },
  { key: "instagram", label: "Instagram", icon: "IG" },
  { key: "facebook", label: "Facebook", icon: "f" },
  { key: "x", label: "X", icon: "𝕏" },
  { key: "youtube", label: "YouTube", icon: "▶" },
  { key: "linkedin", label: "LinkedIn", icon: "in" },
  { key: "telegram", label: "Telegram", icon: "TG" },
  { key: "website", label: "Website", icon: "↗" },
  { key: "email", label: "Email", icon: "@" },
  { key: "phone", label: "Phone", icon: "☎" },
] as const;

const templates = [
  {
    id: "black",
    name: "Black Luxury",
    description: "Bold executive style",
  },
  {
    id: "gold",
    name: "Executive Gold",
    description: "Elegant luxury",
  },
  {
    id: "minimal",
    name: "Minimal Luxe",
    description: "Clean premium",
  },
  {
    id: "navy",
    name: "Midnight",
    description: "Modern business",
  },
  {
    id: "glass",
    name: "Glass Premium",
    description: "Modern & refined",
  },
  {
    id: "white",
    name: "Pure White",
    description: "Classic visiting card",
  },
];

function normalizeUrl(value: string, type: string) {
  const v = value.trim();

  if (!v) return "";

  if (
    v.startsWith("http://") ||
    v.startsWith("https://") ||
    v.startsWith("mailto:") ||
    v.startsWith("tel:")
  ) {
    return v;
  }

  if (type === "whatsapp") {
    const digits = v.replace(/[^\d]/g, "");
    return digits ? `https://wa.me/${digits}` : v;
  }

  if (type === "instagram") {
    return `https://instagram.com/${v.replace(/^@/, "")}`;
  }

  if (type === "facebook") {
    return `https://facebook.com/${v}`;
  }

  if (type === "x") {
    return `https://x.com/${v.replace(/^@/, "")}`;
  }

  if (type === "youtube") {
    return `https://youtube.com/${v.replace(/^@/, "")}`;
  }

  if (type === "linkedin") {
    return `https://linkedin.com/in/${v}`;
  }

  if (type === "telegram") {
    return `https://t.me/${v.replace(/^@/, "")}`;
  }

  if (type === "website") {
    return `https://${v}`;
  }

  if (type === "email") {
    return `mailto:${v}`;
  }

  if (type === "phone") {
    return `tel:${v.replace(/[^\d+]/g, "")}`;
  }

  return v;
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function SocialQRCard() {
  const [mode, setMode] = useState<Mode>("quick");

  const [quickValue, setQuickValue] = useState("");
  const [quickQR, setQuickQR] = useState("");

  const [data, setData] = useState<SocialData>(initialData);
  const [template, setTemplate] = useState("black");
  const [accent, setAccent] = useState("#c9a227");
  const [cardQR, setCardQR] = useState("");
  const [cardCreated, setCardCreated] = useState(false);

  const activeLinks = useMemo(() => {
    return platforms
      .map((item) => ({
        ...item,
        value: data[item.key],
        url: normalizeUrl(data[item.key], item.key),
      }))
      .filter((item) => item.value.trim());
  }, [data]);

  const updateData = (key: keyof SocialData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setCardCreated(false);
  };

  /* ---------------- QUICK QR ---------------- */

  const generateQuickQR = async () => {
    const value = quickValue.trim();

    if (!value) {
      setQuickQR("");
      return;
    }

    try {
      const qr = await QRCode.toDataURL(value, {
        width: 1000,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#111827",
          light: "#ffffff",
        },
      });

      setQuickQR(qr);
    } catch (error) {
      console.error(error);
      setQuickQR("");
    }
  };

  const downloadQuickQR = () => {
    if (!quickQR) return;

    downloadDataUrl(
      quickQR,
      "imgswift-qr-code.png"
    );
  };

  /* ---------------- PREMIUM CARD ---------------- */

  const generateCardQR = async () => {
    if (!data.name.trim() && activeLinks.length === 0) {
      setCardQR("");
      setCardCreated(false);
      return;
    }

    const payload = {
      type: "ImgSwiftPremiumQRCard",
      name: data.name.trim(),
      profession: data.title.trim(),
      contacts: activeLinks.map((item) => ({
        platform: item.label,
        value: item.value.trim(),
        url: item.url,
      })),
    };

    try {
      const qr = await QRCode.toDataURL(
        JSON.stringify(payload),
        {
          width: 1000,
          margin: 2,
          errorCorrectionLevel: "H",
          color: {
            dark: "#111111",
            light: "#ffffff",
          },
        }
      );

      setCardQR(qr);
      setCardCreated(true);
    } catch (error) {
      console.error(error);
      setCardQR("");
      setCardCreated(false);
    }
  };

  /* ---------------- PREMIUM CARD PNG ---------------- */

  const downloadPremiumCard = async () => {
    if (!cardQR || !cardCreated) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    /*
      Compact visiting-card ratio
      1500 x 900
    */
    const width = 1500;
    const height = 900;

    canvas.width = width;
    canvas.height = height;

    /*
      BACKGROUND
    */

    if (template === "black") {
      ctx.fillStyle = "#0b0b0d";
      ctx.fillRect(0, 0, width, height);
    }

    if (template === "gold") {
      ctx.fillStyle = "#15120d";
      ctx.fillRect(0, 0, width, height);
    }

    if (template === "minimal") {
      ctx.fillStyle = "#f7f7f5";
      ctx.fillRect(0, 0, width, height);
    }

    if (template === "navy") {
      ctx.fillStyle = "#0b1424";
      ctx.fillRect(0, 0, width, height);
    }

    if (template === "glass") {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(0, "#eef2ff");
      gradient.addColorStop(0.5, "#ffffff");
      gradient.addColorStop(1, "#dbeafe");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    if (template === "white") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
    }

    /*
      OUTER BORDER
    */

    ctx.lineWidth = 3;

    if (
      template === "black" ||
      template === "gold" ||
      template === "navy"
    ) {
      ctx.strokeStyle = accent;
    } else {
      ctx.strokeStyle = "#d1d5db";
    }

    ctx.strokeRect(
      28,
      28,
      width - 56,
      height - 56
    );

    /*
      INNER PREMIUM LINE
    */

    if (template === "gold" || template === "elegant") {
      ctx.lineWidth = 1;
      ctx.strokeStyle = accent;

      ctx.strokeRect(
        42,
        42,
        width - 84,
        height - 84
      );
    }

    const darkTemplate =
      template === "black" ||
      template === "gold" ||
      template === "navy";

    const mainText = darkTemplate
      ? "#ffffff"
      : "#111827";

    const mutedText = darkTemplate
      ? "#bfc3ca"
      : "#6b7280";

    /*
      LEFT SIDE
    */

    ctx.textAlign = "left";

    ctx.fillStyle = accent;

    ctx.font =
      "bold 22px Arial";

    ctx.fillText(
      "DIGITAL PROFILE",
      110,
      145
    );

    /*
      NAME
    */

    ctx.fillStyle = mainText;

    ctx.font =
      "bold 68px Arial";

    ctx.fillText(
      data.name.trim() || "Your Name",
      110,
      270
    );

    /*
      PROFESSION
    */

    ctx.fillStyle = mutedText;

    ctx.font =
      "32px Arial";

    ctx.fillText(
      data.title.trim() || "Your Profession",
      110,
      325
    );

    /*
      DECORATIVE LINE
    */

    ctx.fillStyle = accent;

    ctx.fillRect(
      110,
      375,
      130,
      5
    );

    /*
      SMALL DESCRIPTION
    */

    ctx.fillStyle = mutedText;

    ctx.font =
      "20px Arial";

    ctx.fillText(
      "Scan to connect",
      110,
      430
    );

    /*
      QR IMAGE
    */

    const qrImage = new Image();

    await new Promise<void>((resolve) => {
      qrImage.onload = () => resolve();
      qrImage.src = cardQR;
    });

    const qrSize = 420;

    const qrX =
      width - qrSize - 130;

    const qrY =
      (height - qrSize) / 2;

    /*
      QR SHADOW
    */

    ctx.shadowColor =
      "rgba(0,0,0,0.22)";

    ctx.shadowBlur = 30;

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
      qrX - 25,
      qrY - 25,
      qrSize + 50,
      qrSize + 50
    );

    ctx.shadowBlur = 0;

    ctx.drawImage(
      qrImage,
      qrX,
      qrY,
      qrSize,
      qrSize
    );

    /*
      QR LABEL
    */

    ctx.textAlign = "center";

    ctx.fillStyle = darkTemplate
      ? "#d1d5db"
      : "#6b7280";

    ctx.font =
      "bold 18px Arial";

    ctx.fillText(
      "SCAN TO CONNECT",
      qrX + qrSize / 2,
      qrY + qrSize + 65
    );

    /*
      DOWNLOAD
    */

    downloadDataUrl(
      canvas.toDataURL(
        "image/png",
        1
      ),
      "premium-qr-profile-card.png"
    );
  };

  const clearQuick = () => {
    setQuickValue("");
    setQuickQR("");
  };

  const clearCard = () => {
    setData(initialData);
    setCardQR("");
    setCardCreated(false);
    setTemplate("black");
    setAccent("#c9a227");
  };

  /* ---------------- PREVIEW STYLES ---------------- */

  const previewBackground =
    template === "black"
      ? "bg-[#0b0b0d]"
      : template === "gold"
      ? "bg-[#15120d]"
      : template === "minimal"
      ? "bg-[#f7f7f5]"
      : template === "navy"
      ? "bg-[#0b1424]"
      : template === "glass"
      ? "bg-gradient-to-br from-indigo-50 via-white to-blue-100"
      : "bg-white";

  const previewText =
    template === "black" ||
    template === "gold" ||
    template === "navy"
      ? "text-white"
      : "text-[#111827]";

  const previewMuted =
    template === "black" ||
    template === "gold" ||
    template === "navy"
      ? "text-slate-300"
      : "text-slate-500";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="mx-auto max-w-3xl text-center">

        <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#202124] shadow-sm">
          QR Code Studio
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#202124] sm:text-5xl">
          QR Code Generator
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Create a simple QR code or a premium digital visiting card.
        </p>

      </div>

      {/* MODE SWITCH */}

      <div className="mx-auto mt-8 flex max-w-xl rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">

        <button
          type="button"
          onClick={() => setMode("quick")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition ${
            mode === "quick"
              ? "bg-[#202124] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Quick QR
        </button>

        <button
          type="button"
          onClick={() => setMode("card")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition ${
            mode === "card"
              ? "bg-[#202124] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Premium Card
        </button>

      </div>

      {/* =====================================================
          QUICK QR
      ===================================================== */}

      {mode === "quick" && (

        <div className="mx-auto mt-8 max-w-3xl">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold text-[#202124]">
              Create a QR Code
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter any text, URL, website, contact information or
              other content.
            </p>

            <div className="mt-7">

              <label className="mb-2 block text-sm font-bold text-[#202124]">
                Text or URL
              </label>

              <textarea
                value={quickValue}
                onChange={(e) =>
                  setQuickValue(e.target.value)
                }
                placeholder="https://example.com or any text..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-4 text-[#202124] outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
              />

            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={generateQuickQR}
                disabled={!quickValue.trim()}
                className="flex-1 rounded-xl bg-[#202124] px-5 py-3.5 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate QR Code
              </button>

              <button
                type="button"
                onClick={clearQuick}
                className="rounded-xl border border-slate-300 px-5 py-3.5 font-bold text-[#202124] hover:bg-slate-50"
              >
                Clear
              </button>

            </div>

          </div>

          {/* QUICK RESULT */}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="text-lg font-bold text-[#202124]">
              QR Result
            </h3>

            <div className="mt-5 flex flex-col items-center">

              {quickQR ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <img
                    src={quickQR}
                    alt="Generated QR Code"
                    className="h-72 w-72"
                  />
                </div>
              ) : (
                <div className="flex h-72 w-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center text-sm font-medium text-slate-400">
                  Your QR code will appear here
                </div>
              )}

              <button
                type="button"
                onClick={downloadQuickQR}
                disabled={!quickQR}
                className="mt-6 w-full rounded-xl bg-[#202124] px-5 py-3.5 font-bold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Download QR Code
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          PREMIUM CARD
      ===================================================== */}

      {mode === "card" && (

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_520px]">

          {/* SETTINGS */}

          <div className="space-y-6">

            {/* PERSONAL */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#202124]">
                Card Information
              </h2>

              <div className="mt-5 grid gap-5">

                <div>

                  <label className="mb-2 block text-sm font-bold text-[#202124]">
                    Name
                  </label>

                  <input
                    value={data.name}
                    onChange={(e) =>
                      updateData("name", e.target.value)
                    }
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[#202124] font-medium outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-bold text-[#202124]">
                    Profession / Business
                  </label>

                  <input
                    value={data.title}
                    onChange={(e) =>
                      updateData("title", e.target.value)
                    }
                    placeholder="Designer / Entrepreneur / Business"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[#202124] font-medium outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                  />

                </div>

              </div>

            </div>

            {/* CONTACTS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#202124]">
                Contact & Social Details
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Add the details you want to store inside the single QR code.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {platforms.map((item) => (

                  <div key={item.key}>

                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#202124]">

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-[#202124]">
                        {item.icon}
                      </span>

                      {item.label}

                    </label>

                    <input
                      value={data[item.key]}
                      onChange={(e) =>
                        updateData(
                          item.key,
                          e.target.value
                        )
                      }
                      placeholder={
                        item.key === "website"
                          ? "example.com"
                          : item.key === "email"
                          ? "you@example.com"
                          : item.key === "phone"
                          ? "+91 9876543210"
                          : `Your ${item.label}`
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[#202124] font-medium outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                    />

                  </div>

                ))}

              </div>

            </div>

            {/* TEMPLATES */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#202124]">
                Premium Templates
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {templates.map((item) => (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTemplate(item.id);
                      setCardCreated(false);
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      template === item.id
                        ? "border-[#202124] bg-slate-100 ring-2 ring-slate-200"
                        : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >

                    <div className="font-bold text-[#202124]">
                      {item.name}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </div>

                  </button>

                ))}

              </div>

            </div>

            {/* COLORS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#202124]">
                Luxury Accent
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {[
                  "#c9a227",
                  "#d4af37",
                  "#2563eb",
                  "#7c3aed",
                  "#db2777",
                  "#059669",
                  "#dc2626",
                  "#111827",
                ].map((color) => (

                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setAccent(color);
                      setCardCreated(false);
                    }}
                    className={`h-10 w-10 rounded-full border-4 border-white transition ${
                      accent === color
                        ? "ring-2 ring-slate-500"
                        : "ring-1 ring-slate-200"
                    }`}
                    style={{
                      backgroundColor: color,
                    }}
                  />

                ))}

              </div>

            </div>

            {/* ACTIONS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <button
                type="button"
                onClick={generateCardQR}
                disabled={
                  !data.name.trim() &&
                  activeLinks.length === 0
                }
                className="w-full rounded-xl bg-[#202124] px-5 py-4 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create Premium Card
              </button>

              <button
                type="button"
                onClick={downloadPremiumCard}
                disabled={!cardCreated || !cardQR}
                className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-4 font-bold text-[#202124] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download Premium Card
              </button>

              <button
                type="button"
                onClick={clearCard}
                className="mt-3 w-full rounded-xl border border-slate-300 px-5 py-3.5 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Clear
              </button>

            </div>

          </div>

          {/* =================================================
              LIVE PREMIUM CARD
          ================================================= */}

          <div className="lg:sticky lg:top-6 lg:self-start">

            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6">

              <div className="mb-4 flex items-center justify-between">

                <div>

                  <h2 className="font-bold text-[#202124]">
                    Premium Card Preview
                  </h2>

                  <p className="text-xs text-slate-500">
                    Visiting-card style
                  </p>

                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                  LIVE
                </span>

              </div>

              {/* CARD */}

              <div
                className={`relative aspect-[5/3] w-full overflow-hidden rounded-[24px] p-7 shadow-2xl ${previewBackground}`}
              >

                {/* Border */}

                <div
                  className="pointer-events-none absolute inset-3 rounded-[19px] border"
                  style={{
                    borderColor: accent,
                  }}
                />

                {/* LEFT */}

                <div className="absolute left-[9%] top-1/2 w-[50%] -translate-y-1/2">

                  <div
                    className="text-[9px] font-black tracking-[0.35em] sm:text-xs"
                    style={{ color: accent }}
                  >
                    DIGITAL PROFILE
                  </div>

                  <h3
                    className={`mt-5 break-words text-xl font-black leading-tight sm:text-3xl lg:text-4xl ${previewText}`}
                  >
                    {data.name.trim() || "Your Name"}
                  </h3>

                  <p
                    className={`mt-2 max-w-[270px] truncate text-xs sm:text-sm ${previewMuted}`}
                  >
                    {data.title.trim() ||
                      "Your Profession"}
                  </p>

                  <div
                    className="mt-5 h-1 w-16 rounded-full"
                    style={{
                      backgroundColor: accent,
                    }}
                  />

                  <p
                    className={`mt-4 text-[9px] font-medium sm:text-xs ${previewMuted}`}
                  >
                    Scan to connect
                  </p>

                </div>

                {/* QR */}

                <div className="absolute right-[8%] top-1/2 -translate-y-1/2">

                  <div className="rounded-xl bg-white p-2 shadow-xl sm:rounded-2xl sm:p-3">

                    {cardQR ? (
                      <img
                        src={cardQR}
                        alt="Premium QR Code"
                        className="h-28 w-28 sm:h-40 sm:w-40 lg:h-44 lg:w-44"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center bg-slate-100 text-center text-[9px] font-bold text-slate-400 sm:h-40 sm:w-40 sm:text-xs lg:h-44 lg:w-44">
                        QR
                        <br />
                        Preview
                      </div>
                    )}

                  </div>

                  <p
                    className={`mt-2 text-center text-[7px] font-black tracking-widest sm:text-[9px] ${
                      darkTemplateForTemplate(template)
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    SCAN TO CONNECT
                  </p>

                </div>

              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                Your social and contact details stay inside one QR code.
              </p>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

/*
  Helper used only for preview text color.
*/
function darkTemplateForTemplate(template: string) {
  return (
    template === "black" ||
    template === "gold" ||
    template === "navy"
  );
}