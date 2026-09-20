"use client";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
type FaviconSize = {
  label: string;
  size: number;
};
const FAVICON_SIZES: FaviconSize[] = [
  { label: "16 × 16", size: 16 },
  { label: "32 × 32", size: 32 },
  { label: "48 × 48", size: 48 },
  { label: "180 × 180", size: 180 },
  { label: "192 × 192", size: 192 },
  { label: "512 × 512", size: 512 },
];
type GeneratedIcon = {
  label: string;
  size: number;
  url: string;
};
export default function FaviconGenerator() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const clearIcons = () => {
    icons.forEach((icon) => URL.revokeObjectURL(icon.url));
    if (sourceUrl) {
      URL.revokeObjectURL(sourceUrl);
    }
    setSourceUrl("");
    setSourceName("");
    setIcons([]);
    setError("");
    setLoading(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  useEffect(() => {
    return () => {
      icons.forEach((icon) => URL.revokeObjectURL(icon.url));
      if (sourceUrl) {
        URL.revokeObjectURL(sourceUrl);
      }
    };
  }, [icons, sourceUrl]);
  const processImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be 10MB or smaller.");
      return;
    }
    setError("");
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const generated: GeneratedIcon[] = [];
        FAVICON_SIZES.forEach(({ label, size }) => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const context = canvas.getContext("2d");
          if (!context) {
            return;
          }
          context.clearRect(0, 0, size, size);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";
          const sourceRatio = image.width / image.height;
          let drawWidth = size;
          let drawHeight = size;
          let offsetX = 0;
          let offsetY = 0;
          if (sourceRatio > 1) {
            drawHeight = size / sourceRatio;
            offsetY = (size - drawHeight) / 2;
          } else if (sourceRatio < 1) {
            drawWidth = size * sourceRatio;
            offsetX = (size - drawWidth) / 2;
          }
          context.drawImage(
            image,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight
          );
          const dataUrl = canvas.toDataURL("image/png");
          generated.push({
            label,
            size,
            url: dataUrl,
          });
        });
        setIcons(generated);
        setLoading(false);
      };
      image.onerror = () => {
        setError("The selected image could not be processed.");
        setLoading(false);
      };
      image.src = reader.result as string;
    };
    reader.onerror = () => {
      setError("The selected image could not be read.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
    setSourceName(file.name);
    setSourceUrl(URL.createObjectURL(file));
  };
  const handleFile = (file?: File) => {
    if (!file) return;
    icons.forEach((icon) => URL.revokeObjectURL(icon.url));
    if (sourceUrl) {
      URL.revokeObjectURL(sourceUrl);
    }
    setIcons([]);
    processImage(file);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };
  const downloadIcon = (icon: GeneratedIcon) => {
    const link = document.createElement("a");
    link.href = icon.url;
    link.download = `favicon-${icon.size}x${icon.size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadAll = () => {
    icons.forEach((icon, index) => {
      window.setTimeout(() => {
        downloadIcon(icon);
      }, index * 150);
    });
  };
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <div
          className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/40"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
            🖼️
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Upload an image
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Drag & drop an image here, or click to browse
          </p>
          <p className="mt-2 text-xs text-slate-500">
            PNG, JPG, WebP or SVG • Maximum 10MB
          </p>
        </div>
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
      </section>
      {sourceUrl && (
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={sourceUrl}
                alt="Uploaded source"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-500">
                Source image
              </p>
              <p className="mt-1 truncate font-bold text-slate-900">
                {sourceName}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Your favicon sizes are generated automatically in your browser.
              </p>
            </div>
            {loading && (
              <div className="text-sm font-semibold text-blue-600">
                Generating...
              </div>
            )}
          </div>
        </section>
      )}
      {icons.length > 0 && (
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Generated Favicons
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Download individual sizes or download them all.
              </p>
            </div>
            <button
              type="button"
              onClick={downloadAll}
              className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Download All
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {icons.map((icon) => (
              <div
                key={icon.size}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex h-36 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]">
                  <img
                    src={icon.url}
                    alt={`${icon.label} favicon`}
                    className="max-h-32 max-w-32 object-contain"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-900">
                    {icon.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => downloadIcon(icon)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={clearIcons}
            className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Clear & Reset
          </button>
        </section>
      )}
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Create a favicon from any image
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
          <p>
            Upload a PNG, JPG, WebP or SVG image and generate common favicon
            sizes directly in your browser.
          </p>
          <p>
            ToolsGift creates multiple PNG favicon sizes including 16×16,
            32×32, 48×48, 180×180, 192×192 and 512×512.
          </p>
          <p>
            Your image is processed locally in your browser, so you do not
            need to upload it to a server.
          </p>
        </div>
      </section>
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-5">
          <div>
            <h3 className="font-bold text-slate-900">What is a favicon?</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              A favicon is a small icon used to identify a website in browser
              tabs, bookmarks, search results and other places where a site
              identity is displayed.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              How do I create a favicon from an image?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Upload your PNG, JPG, WebP or SVG image to the Favicon Generator.
              ToolsGift automatically creates multiple favicon sizes in your
              browser.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              What image formats can I use?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              You can use PNG, JPG, WebP and SVG images. The generated favicon
              files are provided as PNG images.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              What favicon sizes does ToolsGift generate?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              ToolsGift generates 16×16, 32×32, 48×48, 180×180, 192×192 and
              512×512 PNG favicon sizes.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              Is this favicon generator free?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Yes. You can use the ToolsGift Favicon Generator for free in your
              browser.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              Is my image uploaded to a server?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              No. The image is processed directly in your browser, so the
              favicon generation does not require uploading the image to a
              server.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              Can I use the generated favicon on my website?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Yes. The generated PNG favicon sizes can be used for website
              icons, app icons and other web projects that support PNG images.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Related Tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/tools/converter" className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
            <h3 className="font-bold text-slate-900">Image Converter</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Convert images between popular formats quickly in your browser.
            </p>
          </a>
          <a href="/tools/resizer" className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
            <h3 className="font-bold text-slate-900">Image Resizer</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Resize images to the dimensions you need for websites and apps.
            </p>
          </a>
          <a href="/tools/compressor" className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
            <h3 className="font-bold text-slate-900">Image Compressor</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reduce image file size while keeping your images useful for web
              and everyday use.
            </p>
          </a>
          <a href="/tools/image-to-text" className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
            <h3 className="font-bold text-slate-900">Image to Text</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Extract readable text from images with browser-based OCR.
            </p>
          </a>
          <a href="/tools/compress-image-to-kb" className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
            <h3 className="font-bold text-slate-900">Compress Image to KB</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Compress images to a target file size such as 20KB, 50KB or
              100KB.
            </p>
          </a>
          <a href="/tools/heic-to-jpg" className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
            <h3 className="font-bold text-slate-900">HEIC to JPG</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Convert HEIC and HEIF images to JPG directly in your browser.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
