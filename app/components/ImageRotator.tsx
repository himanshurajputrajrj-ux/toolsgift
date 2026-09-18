"use client";

import { useRef, useState } from "react";

export default function ImageRotator() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [angle, setAngle] = useState(90);
  const [isRotating, setIsRotating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setDownloadUrl("");
    setMessage("");
  };

  const rotateImage = () => {
    if (!file) return;

    setIsRotating(true);
    setMessage("");

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsRotating(false);
        setMessage("Could not process this image.");
        return;
      }

      const normalizedAngle = ((angle % 360) + 360) % 360;

      if (normalizedAngle === 90 || normalizedAngle === 270) {
        canvas.width = image.naturalHeight;
        canvas.height = image.naturalWidth;
      } else {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((normalizedAngle * Math.PI) / 180);

      ctx.drawImage(
        image,
        -image.naturalWidth / 2,
        -image.naturalHeight / 2
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsRotating(false);
            setMessage("Could not create the rotated image.");
            return;
          }

          if (downloadUrl) {
            URL.revokeObjectURL(downloadUrl);
          }

          const url = URL.createObjectURL(blob);

          setDownloadUrl(url);
          setMessage("Image rotated successfully!");
          setIsRotating(false);
        },
        "image/jpeg",
        0.92
      );
    };

    image.onerror = () => {
      setIsRotating(false);
      setMessage("Could not read this image.");
    };

    image.src = URL.createObjectURL(file);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    setFile(null);
    setPreview("");
    setDownloadUrl("");
    setMessage("");
    setAngle(90);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {!file ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-black transition"
          >
            <div className="text-5xl mb-4">ðŸ”„</div>

            <h2 className="text-xl font-semibold text-gray-900">
              Upload Image
            </h2>

            <p className="text-gray-500 mt-2">
              Rotate your image quickly and easily
            </p>

            <button
              type="button"
              className="mt-6 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              Choose Image
            </button>

            <p className="text-xs text-gray-400 mt-4">
              JPG, PNG, WebP and other common image formats
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Preview
                </p>

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-xl bg-white"
                />
              </div>

              <div className="flex flex-col justify-center">

                <p className="text-sm text-gray-500 mb-2">
                  File
                </p>

                <p className="font-medium text-gray-900 truncate">
                  {file.name}
                </p>

                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-900">
                    Rotation
                  </label>

                  <div className="grid grid-cols-2 gap-3 mt-3">

                    <button
                      type="button"
                      onClick={() => setAngle(90)}
                      className={`px-4 py-3 rounded-xl border font-medium transition ${
                        angle === 90
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      90Â°
                    </button>

                    <button
                      type="button"
                      onClick={() => setAngle(180)}
                      className={`px-4 py-3 rounded-xl border font-medium transition ${
                        angle === 180
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      180Â°
                    </button>

                    <button
                      type="button"
                      onClick={() => setAngle(270)}
                      className={`px-4 py-3 rounded-xl border font-medium transition ${
                        angle === 270
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      270Â°
                    </button>

                    <button
                      type="button"
                      onClick={() => setAngle(360)}
                      className={`px-4 py-3 rounded-xl border font-medium transition ${
                        angle === 360
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      360Â°
                    </button>

                  </div>
                </div>

                <button
                  type="button"
                  onClick={rotateImage}
                  disabled={isRotating}
                  className="w-full mt-6 px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-50 transition"
                >
                  {isRotating ? "Rotating..." : `Rotate ${angle}Â°`}
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="w-full mt-3 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Choose Another Image
                </button>

              </div>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download="ToolsGift-rotated-image.jpg"
                className="block w-full mt-6 text-center px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Download Rotated Image
              </a>
            )}
          </>
        )}

        {message && (
          <div className="mt-5 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}
