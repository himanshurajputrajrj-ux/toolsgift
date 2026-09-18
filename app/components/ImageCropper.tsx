"use client";

import { DragEvent, useRef, useState } from "react";

export default function ImageCropper() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeight, setCropHeight] = useState(0);

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const maxFileSize = 25 * 1024 * 1024;

  const handleFile = (selectedFile: File) => {
    setError("");
    setResult(null);
    setResultSize(null);

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setError("File size must be less than 25 MB.");
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    const image = new Image();

    image.onload = () => {
      setFile(selectedFile);
      setPreview(url);

      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);

      // Start with the complete image selected.
      setCropX(0);
      setCropY(0);
      setCropWidth(image.naturalWidth);
      setCropHeight(image.naturalHeight);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError("Could not load the image.");
    };

    image.src = url;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const cropImage = () => {
    if (!file) return;

    if (cropWidth <= 0 || cropHeight <= 0) {
      setError("Crop width and height must be greater than 0.");
      return;
    }

    if (cropX < 0 || cropY < 0) {
      setError("Crop position cannot be negative.");
      return;
    }

    if (cropX + cropWidth > originalWidth) {
      setError("Crop area exceeds the image width.");
      return;
    }

    if (cropY + cropHeight > originalHeight) {
      setError("Crop area exceeds the image height.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setResultSize(null);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError("Could not process the image.");
        setLoading(false);
        return;
      }

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const outputType =
        file.type === "image/png"
          ? "image/png"
          : file.type === "image/webp"
          ? "image/webp"
          : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Image cropping failed.");
            setLoading(false);
            return;
          }

          const outputUrl = URL.createObjectURL(blob);

          setResult(outputUrl);
          setResultSize(blob.size);
          setLoading(false);
        },
        outputType,
        0.92
      );
    };

    image.onerror = () => {
      setError("Could not load the image.");
      setLoading(false);
    };

    image.src = URL.createObjectURL(file);
  };

  const downloadResult = () => {
    if (!result || !file) return;

    const extension =
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
        ? "webp"
        : "jpg";

    const link = document.createElement("a");

    link.href = result;
    link.download = `cropped-image.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
    setResult(null);
    setResultSize(null);

    setCropX(0);
    setCropY(0);
    setCropWidth(0);
    setCropHeight(0);

    setOriginalWidth(0);
    setOriginalHeight(0);

    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Image Tools
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Image Cropper
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Crop your images to a custom area with precise width, height,
            and position controls.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          {/* Upload Area */}
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            {!file ? (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                  ✂️
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  Upload an Image
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Drag & drop your image here or choose a file
                </p>

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Choose File
                </button>

                <p className="mt-4 text-xs text-slate-400">
                  JPG, PNG, WebP and other image formats • Max 25 MB
                </p>
              </>
            ) : (
              <div className="space-y-5">

                {/* Preview */}
                <div className="mx-auto max-h-80 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                  <img
                    src={preview}
                    alt="Selected image preview"
                    className="mx-auto max-h-72 max-w-full object-contain"
                  />
                </div>

                <div>
                  <p className="break-all font-semibold text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {originalWidth} × {originalHeight}px •{" "}
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Crop Settings */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Crop Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Set the position and dimensions of the area you want to crop.
            </p>

            {/* X / Y */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  X Position (px)
                </label>

                <input
                  type="number"
                  min="0"
                  max={Math.max(0, originalWidth - cropWidth)}
                  value={cropX}
                  onChange={(event) =>
                    setCropX(Math.max(0, Number(event.target.value)))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Y Position (px)
                </label>

                <input
                  type="number"
                  min="0"
                  max={Math.max(0, originalHeight - cropHeight)}
                  value={cropY}
                  onChange={(event) =>
                    setCropY(Math.max(0, Number(event.target.value)))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Width / Height */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Crop Width (px)
                </label>

                <input
                  type="number"
                  min="1"
                  max={originalWidth}
                  value={cropWidth || ""}
                  onChange={(event) =>
                    setCropWidth(Math.max(1, Number(event.target.value)))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Crop Height (px)
                </label>

                <input
                  type="number"
                  min="1"
                  max={originalHeight}
                  value={cropHeight || ""}
                  onChange={(event) =>
                    setCropHeight(Math.max(1, Number(event.target.value)))
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Info */}
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Original dimensions
                </span>

                <span className="font-semibold text-slate-900">
                  {originalWidth > 0
                    ? `${originalWidth} × ${originalHeight}px`
                    : "—"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Crop area
                </span>

                <span className="font-semibold text-blue-600">
                  {cropWidth > 0
                    ? `${cropWidth} × ${cropHeight}px`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Crop Button */}
          <button
            type="button"
            onClick={cropImage}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Cropping Image..." : "Crop Image"}
          </button>

          {/* Result - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Cropped Image
            </h2>

            {!result ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  ✂️
                </div>

                <p className="font-medium text-slate-600">
                  Your cropped image will appear here.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Crop an image to see the result.
                </p>
              </div>
            ) : (
              <>
                {/* Result Preview */}
                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
                  <img
                    src={result}
                    alt="Cropped image preview"
                    className="mx-auto max-h-96 max-w-full object-contain"
                  />
                </div>

                {/* Result Info */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Dimensions
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {cropWidth} × {cropHeight}px
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Output Size
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {resultSize
                        ? `${(resultSize / 1024 / 1024).toFixed(2)} MB`
                        : "-"}
                    </p>
                  </div>

                </div>
              </>
            )}

            {/* DOWNLOAD BUTTON - ALWAYS VISIBLE */}
            <button
              type="button"
              onClick={downloadResult}
              disabled={!result}
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download Cropped Image
            </button>

          </div>
        </div>
      </div>

      <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">What is an Image Cropper?</h2>
        <p className="mt-3 leading-7 text-slate-600">
          An image cropper lets you remove unwanted areas from an image and keep only the part you need. ToolsGift Image Cropper provides precise controls for selecting the crop position and dimensions.
        </p>

        <h2 className="mt-7 text-2xl font-bold text-slate-900">How to Crop an Image</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Upload an image, set the X and Y position, choose the crop width and height, and select Crop Image. You can preview the cropped result and download it when processing is complete.
        </p>

        <h2 className="mt-7 text-2xl font-bold text-slate-900">Crop JPG, PNG and WebP Images</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Crop common image formats including JPG, PNG and WebP for websites, documents, social media and everyday image editing.
        </p>

        <h2 className="mt-7 text-2xl font-bold text-slate-900">Image Cropping in Your Browser</h2>
        <p className="mt-3 leading-7 text-slate-600">
          ToolsGift processes image cropping directly in your web browser using standard image and canvas features. The selected image is processed locally in the browser rather than being uploaded to a server by this tool.
        </p>
      </section>

      <section className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Can I crop an image online?</h3>
        <p className="mt-2 leading-7 text-slate-600">Yes, ToolsGift lets you crop images online by setting the exact crop area and downloading the result.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">What image formats can I crop?</h3>
        <p className="mt-2 leading-7 text-slate-600">You can crop JPG, PNG, WebP and other browser-supported image formats. PNG and WebP inputs keep their respective output formats, while other image types are exported as JPG.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Can I crop an image to an exact size?</h3>
        <p className="mt-2 leading-7 text-slate-600">Yes. You can set the X position, Y position, crop width and crop height using exact pixel values.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Can I crop images without uploading them to a server?</h3>
        <p className="mt-2 leading-7 text-slate-600">Yes. The cropping process is performed locally in your browser using image and canvas features rather than uploading the selected image to a server by this tool.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Is the Image Cropper free to use?</h3>
        <p className="mt-2 leading-7 text-slate-600">Yes. You can use the ToolsGift Image Cropper online to crop images and download the processed result.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Can I crop an image for social media?</h3>
        <p className="mt-2 leading-7 text-slate-600">Yes. You can enter specific pixel dimensions to create a crop suitable for social media posts, profiles and other online uses.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Will cropping reduce image quality?</h3>
        <p className="mt-2 leading-7 text-slate-600">Cropping removes the parts of the image outside the selected area. The output is then created in the corresponding image format using browser-based canvas processing.</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">How large can the uploaded image be?</h3>
        <p className="mt-2 leading-7 text-slate-600">The Image Cropper accepts image files up to 25 MB.</p>
      </section>
    </main>
  );
}




