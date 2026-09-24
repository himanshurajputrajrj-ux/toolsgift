"use client";
import { useRef, useState } from "react";
export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrReady, setQrReady] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const generateQR = async () => {
    if (!text.trim() || !canvasRef.current) {
      setQrReady(false);
      return;
    }
    try {
      const QRCode = (await import("qrcode")).default;
      if (!canvasRef.current) return;
      await QRCode.toCanvas(canvasRef.current, text.trim(), {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
        color: {
          dark: "#111827",
          light: "#ffffff",
        },
      });
      setQrReady(true);
      clearShareState();
    } catch (error) {
      console.error("QR generation error:", error);
      setQrReady(false);
    }
  };
  const createShareLink = async (): Promise<string> => {
    if (!canvasRef.current || !qrReady) {
      throw new Error("No QR code is available to share.");
    }
    if (shareUrl) {
      return shareUrl;
    }
    setShareLoading(true);
    setShareMessage("");
    try {
      const imageBlob = await new Promise<Blob>((resolve, reject) => {
        canvasRef.current?.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Unable to prepare the QR code for sharing."));
            }
          },
          "image/png"
        );
      });
      if (imageBlob.size > 4 * 1024 * 1024) {
        throw new Error("QR code is too large to share. Maximum size is 4 MB.");
      }
      const formData = new FormData();
      formData.append("tool", "qr-code-generator");
      formData.append("resultTitle", "QR Code Result");
      formData.append("filename", "toolsgift-qr-code.png");
      formData.append("image", imageBlob, "toolsgift-qr-code.png");
      const response = await fetch("/api/share", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || typeof data.shareUrl !== "string") {
        throw new Error(data.error || "Failed to create share link.");
      }
      setShareUrl(data.shareUrl);
      setShareMessage("Share link generated.");
      return data.shareUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create share link.";
      setShareMessage(message);
      throw error;
    } finally {
      setShareLoading(false);
    }
  };
  const copyShareLink = async () => {
    try {
      const url = await createShareLink();
      await navigator.clipboard.writeText(url);
      setShareMessage("Share link copied.");
    } catch {
      // Error message is already handled by createShareLink.
    }
  };
  const shareResult = async () => {
    try {
      const url = await createShareLink();
      if (navigator.share) {
        await navigator.share({
          title: "ToolsGift - QR Code",
          text: "View my QR Code result on ToolsGift",
          url,
        });
        setShareMessage("Share link ready.");
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Share link copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      if (!(error instanceof Error && error.message)) {
        setShareMessage("Unable to share this result.");
      }
    }
  };
  const clearShareState = () => {
    setShareUrl("");
    setShareMessage("");
  };
  const downloadQR = () => {
    if (!canvasRef.current || !qrReady) return;
    const link = document.createElement("a");
    link.download = "toolsgift-qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const clear = () => {
    setText("");
    setQrReady(false);
    clearShareState();
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    }
  };
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            QR Code Generator
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create a QR code from any URL or text instantly.
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-3xl">
          <label
            htmlFor="qr-text"
            className="mb-2 block font-semibold text-gray-900 dark:text-white"
          >
            Text or URL
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter a website URL, text, contact information or anything else..."
            className="min-h-32 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          <button
            type="button"
            onClick={() => {
              console.log("Generate QR Code button clicked");
              generateQR();
            }}
            disabled={!text.trim() || shareLoading}
            className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate QR Code
          </button>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadQR}
              disabled={!qrReady}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download PNG
            </button>
            <button
              type="button"
              onClick={clear}
              disabled={!text}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Clear
            </button>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                createShareLink().catch(() => {});
              }}
              disabled={!qrReady || shareLoading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {shareLoading ? "Generating..." : "Generate Link"}
            </button>
            <button
              type="button"
              onClick={shareResult}
              disabled={!qrReady || shareLoading}
              className="w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Share
            </button>
          </div>
          {shareUrl && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                />
                <button
                  type="button"
                  onClick={copyShareLink}
                  disabled={shareLoading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Copy Link
                </button>
              </div>
            </div>
          )}
          {shareMessage && (
            <p className="mt-3 text-center text-sm text-slate-500">
              {shareMessage}
            </p>
          )}
        </div>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          QR Code Preview
        </h2>
        <div className="mt-5 flex min-h-80 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
          <div className={qrReady ? "flex items-center justify-center" : "hidden"}>
            <canvas
              ref={canvasRef}
              className="max-w-full rounded-lg bg-white"
              aria-label="Generated QR code"
            />
          </div>
          {!qrReady && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Enter text or a URL above, then click Generate QR Code.
            </p>
          )}
        </div>
      </section>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        QR code generation happens in your browser. Your QR image is uploaded
        to the server only when you choose Generate Link or Share.
      </p>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          About QR Code Generator
        </h2>
        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          ToolsGift QR Code Generator lets you create a QR code from a website
          URL, plain text, contact information or other text. The QR code is
          generated directly in your browser and can be downloaded as a PNG
          image.
        </p>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              What can I use a QR code for?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              You can create QR codes for website URLs, text, contact
              information and other data that can be encoded as text.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Can I create a QR code for a website URL?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. Enter the complete website URL and the QR code will be
              generated automatically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              What format can I download?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              The generated QR code can be downloaded as a PNG image.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is this QR Code Generator free?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. ToolsGift QR Code Generator is free to use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is my data uploaded to a server?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              QR code generation happens directly in your browser. Your QR image is uploaded to the server only when you choose Generate Link or Share.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Related Tools
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Percentage Calculator", "/tools/percentage-calculator"],
            ["Case Converter", "/tools/case-converter"],
            ["Word Counter", "/tools/word-counter"],
            ["Character Counter", "/tools/character-counter"],
            ["Image Compressor", "/tools/compressor"],
            ["Image Resizer", "/tools/resizer"],
          ].map(([title, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-gray-900 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:text-blue-400"
            >
              {title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}













