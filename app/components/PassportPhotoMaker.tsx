"use client";

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { removeBackground } from "@imgly/background-removal";

type SizePreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  label: string;
};

const SIZE_PRESETS: SizePreset[] = [
  {
    id: "india",
    name: "India Passport",
    width: 35,
    height: 45,
    label: "35 × 45 mm",
  },
  {
    id: "standard",
    name: "Standard Passport",
    width: 35,
    height: 45,
    label: "35 × 45 mm",
  },
  {
    id: "us",
    name: "US Passport",
    width: 51,
    height: 51,
    label: "2 × 2 inch",
  },
  {
    id: "uk",
    name: "UK Passport",
    width: 35,
    height: 45,
    label: "35 × 45 mm",
  },
];

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const BACKGROUNDS = [
  {
    name: "White",
    value: "#ffffff",
  },
  {
    name: "Light Gray",
    value: "#f3f4f6",
  },
  {
    name: "Light Blue",
    value: "#dbeafe",
  },
  {
    name: "Blue",
    value: "#2563eb",
  },
  {
    name: "Transparent",
    value: "transparent",
  },
];

export default function PassportPhotoMaker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageUrlRef = useRef("");
  const enhancedUrlRef = useRef("");
  const removedUrlRef = useRef("");
  const resultUrlRef = useRef("");

  const [file, setFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [enhancedUrl, setEnhancedUrl] = useState("");
  const [removedUrl, setRemovedUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const [preset, setPreset] = useState("india");

  const [background, setBackground] =
    useState("#ffffff");

  /*
   * IMPORTANT:
   * Both premium-type features are OFF by default.
   */
  const [enhance, setEnhance] =
    useState(false);

  const [removeBg, setRemoveBg] =
    useState(false);

  const [copies, setCopies] =
    useState(8);

  const [outputMode, setOutputMode] =
    useState<"single" | "sheet">("single");

  const [positionX, setPositionX] =
    useState(50);

  const [positionY, setPositionY] =
    useState(50);

  const [zoom, setZoom] =
    useState(100);

  const [loading, setLoading] =
    useState(false);

  const [processingEnhance, setProcessingEnhance] =
    useState(false);

  const [removingBackground, setRemovingBackground] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const selectedSize =
    SIZE_PRESETS.find(
      (item) => item.id === preset
    ) || SIZE_PRESETS[0];

  /*
   * Keep object URL refs synchronized.
   */
  useEffect(() => {
    imageUrlRef.current = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    enhancedUrlRef.current = enhancedUrl;
  }, [enhancedUrl]);

  useEffect(() => {
    removedUrlRef.current = removedUrl;
  }, [removedUrl]);

  useEffect(() => {
    resultUrlRef.current = resultUrl;
  }, [resultUrl]);

  /*
   * Cleanup only when component unmounts.
   */
  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(
          imageUrlRef.current
        );
      }

      if (enhancedUrlRef.current) {
        URL.revokeObjectURL(
          enhancedUrlRef.current
        );
      }

      if (removedUrlRef.current) {
        URL.revokeObjectURL(
          removedUrlRef.current
        );
      }

      if (resultUrlRef.current) {
        URL.revokeObjectURL(
          resultUrlRef.current
        );
      }
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(
        resultUrlRef.current
      );

      resultUrlRef.current = "";
    }

    setResultUrl("");
  }

  function clearEnhanced() {
    if (enhancedUrlRef.current) {
      URL.revokeObjectURL(
        enhancedUrlRef.current
      );

      enhancedUrlRef.current = "";
    }

    setEnhancedUrl("");
  }

  function clearRemoved() {
    if (removedUrlRef.current) {
      URL.revokeObjectURL(
        removedUrlRef.current
      );

      removedUrlRef.current = "";
    }

    setRemovedUrl("");
  }

  function handleFile(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {
      setMessage(
        "Please select a JPG, PNG or WebP image."
      );

      return;
    }

    if (imageUrlRef.current) {
      URL.revokeObjectURL(
        imageUrlRef.current
      );

      imageUrlRef.current = "";
    }

    clearEnhanced();
    clearRemoved();
    clearResult();

    const url =
      URL.createObjectURL(
        selectedFile
      );

    imageUrlRef.current = url;

    setFile(selectedFile);
    setImageUrl(url);

    setMessage("");

    setPositionX(50);
    setPositionY(50);
    setZoom(100);
  }

  function clearAll() {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(
        imageUrlRef.current
      );

      imageUrlRef.current = "";
    }

    clearEnhanced();
    clearRemoved();
    clearResult();

    setFile(null);
    setImageUrl("");

    setMessage("");

    setLoading(false);
    setProcessingEnhance(false);
    setRemovingBackground(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function mmToPx(
    mm: number,
    dpi = 300
  ) {
    return Math.round(
      (mm / 25.4) * dpi
    );
  }

  function loadImage(
    url: string
  ): Promise<HTMLImageElement> {
    return new Promise(
      (resolve, reject) => {
        const image =
          new Image();

        image.onload = () => {
          if (
            image.naturalWidth <= 0 ||
            image.naturalHeight <= 0
          ) {
            reject(
              new Error(
                "The selected image is invalid."
              )
            );

            return;
          }

          resolve(image);
        };

        image.onerror = () => {
          reject(
            new Error(
              "Unable to load this image. Please try JPG, PNG or WebP."
            )
          );
        };

        image.src = url;
      }
    );
  }

  /*
   * PHOTO ENHANCEMENT
   *
   * Lightweight browser-based enhancement:
   * brightness + contrast + saturation + sharpening.
   */
  async function createEnhancedImage(
    sourceFile: File
  ): Promise<Blob> {
    const sourceUrl =
      URL.createObjectURL(
        sourceFile
      );

    try {
      const image =
        await loadImage(
          sourceUrl
        );

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width =
        image.naturalWidth;

      canvas.height =
        image.naturalHeight;

      const ctx =
        canvas.getContext(
          "2d",
          {
            willReadFrequently: true,
          }
        );

      if (!ctx) {
        throw new Error(
          "Unable to create image canvas."
        );
      }

      /*
       * Basic enhancement.
       */
      ctx.filter =
        "brightness(1.04) contrast(1.08) saturate(1.03)";

      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      /*
       * Light sharpening.
       */
      const imageData =
        ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

      const source =
        imageData.data;

      const output =
        new Uint8ClampedArray(
          source
        );

      const width =
        canvas.width;

      const height =
        canvas.height;

      if (
        width <= 5000 &&
        height <= 5000
      ) {
        const strength = 0.18;

        for (
          let y = 1;
          y < height - 1;
          y++
        ) {
          for (
            let x = 1;
            x < width - 1;
            x++
          ) {
            const index =
              (y * width + x) * 4;

            const left =
              index - 4;

            const right =
              index + 4;

            const top =
              index -
              width * 4;

            const bottom =
              index +
              width * 4;

            for (
              let channel = 0;
              channel < 3;
              channel++
            ) {
              const center =
                source[
                  index + channel
                ];

              const neighbour =
                (
                  source[
                    left + channel
                  ] +
                  source[
                    right + channel
                  ] +
                  source[
                    top + channel
                  ] +
                  source[
                    bottom + channel
                  ]
                ) / 4;

              output[
                index + channel
              ] = Math.max(
                0,
                Math.min(
                  255,
                  center +
                    (center -
                      neighbour) *
                      strength
                )
              );
            }
          }
        }

        const sharpened =
          new ImageData(
            output,
            width,
            height
          );

        ctx.putImageData(
          sharpened,
          0,
          0
        );
      }

      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/png",
              1
            );
          }
        );

      if (!blob) {
        throw new Error(
          "Unable to create enhanced image."
        );
      }

      return blob;
    } finally {
      URL.revokeObjectURL(
        sourceUrl
      );
    }
  }

  async function processEnhancement() {
    if (!file) {
      throw new Error(
        "Please upload a photo first."
      );
    }

    setProcessingEnhance(true);

    try {
      const blob =
        await createEnhancedImage(
          file
        );

      const url =
        URL.createObjectURL(
          blob
        );

      if (
        enhancedUrlRef.current
      ) {
        URL.revokeObjectURL(
          enhancedUrlRef.current
        );
      }

      enhancedUrlRef.current =
        url;

      setEnhancedUrl(url);

      return url;
    } catch (error) {
      console.error(
        "Enhancement error:",
        error
      );

      throw new Error(
        "Photo enhancement failed. Please try another image."
      );
    } finally {
      setProcessingEnhance(false);
    }
  }

  /*
   * AI BACKGROUND REMOVAL
   */
  async function processBackground(
    source: File | Blob
  ) {
    setRemovingBackground(true);

    try {
      const blob =
        await removeBackground(
          source
        );

      const url =
        URL.createObjectURL(
          blob
        );

      if (
        removedUrlRef.current
      ) {
        URL.revokeObjectURL(
          removedUrlRef.current
        );
      }

      removedUrlRef.current =
        url;

      setRemovedUrl(url);

      return url;
    } catch (error) {
      console.error(
        "Background removal error:",
        error
      );

      throw new Error(
        "Background removal failed. Please try another clear photo."
      );
    } finally {
      setRemovingBackground(false);
    }
  }

  /*
   * Enhancement → Background Removal
   */
  async function prepareSubject() {
    if (!file) {
      throw new Error(
        "Please upload a photo first."
      );
    }

    let source:
      | File
      | Blob = file;

    /*
     * ENHANCE
     */
    if (enhance) {
      if (
        enhancedUrlRef.current
      ) {
        const response =
          await fetch(
            enhancedUrlRef.current
          );

        source =
          await response.blob();
      } else {
        setMessage(
          "Enhancing photo..."
        );

        const enhancedBlob =
          await createEnhancedImage(
            file
          );

        const enhancedUrl =
          URL.createObjectURL(
            enhancedBlob
          );

        if (
          enhancedUrlRef.current
        ) {
          URL.revokeObjectURL(
            enhancedUrlRef.current
          );
        }

        enhancedUrlRef.current =
          enhancedUrl;

        setEnhancedUrl(
          enhancedUrl
        );

        source =
          enhancedBlob;
      }
    }

    /*
     * BACKGROUND REMOVE
     */
    if (removeBg) {
      if (
        removedUrlRef.current
      ) {
        return removedUrlRef.current;
      }

      setMessage(
        "Removing background with AI..."
      );

      return await processBackground(
        source
      );
    }

    /*
     * Enhancement only.
     */
    if (
      enhance &&
      enhancedUrlRef.current
    ) {
      return enhancedUrlRef.current;
    }

    /*
     * Original.
     */
    return imageUrlRef.current;
  }

  function drawPhoto(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    /*
     * Background.
     */
    if (
      background ===
      "transparent"
    ) {
      ctx.clearRect(
        x,
        y,
        width,
        height
      );
    } else {
      ctx.fillStyle =
        background;

      ctx.fillRect(
        x,
        y,
        width,
        height
      );
    }

    const imageWidth =
      image.naturalWidth ||
      image.width;

    const imageHeight =
      image.naturalHeight ||
      image.height;

    if (
      imageWidth <= 0 ||
      imageHeight <= 0
    ) {
      throw new Error(
        "Unable to read image dimensions."
      );
    }

    const imageRatio =
      imageWidth /
      imageHeight;

    const targetRatio =
      width / height;

    let drawWidth = width;
    let drawHeight = height;

    /*
     * Cover passport frame.
     */
    if (
      imageRatio > targetRatio
    ) {
      drawHeight = height;

      drawWidth =
        drawHeight *
        imageRatio;
    } else {
      drawWidth = width;

      drawHeight =
        drawWidth /
        imageRatio;
    }

    /*
     * Zoom.
     */
    const scale =
      zoom / 100;

    drawWidth *= scale;
    drawHeight *= scale;

    const availableX =
      width -
      drawWidth;

    const availableY =
      height -
      drawHeight;

    const offsetX =
      availableX *
      (positionX / 100);

    const offsetY =
      availableY *
      (positionY / 100);

    ctx.save();

    ctx.beginPath();

    ctx.rect(
      x,
      y,
      width,
      height
    );

    ctx.clip();

    ctx.imageSmoothingEnabled =
      true;

    ctx.imageSmoothingQuality =
      "high";

    ctx.drawImage(
      image,
      x + offsetX,
      y + offsetY,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  }

  async function canvasToBlob(
    canvas: HTMLCanvasElement
  ) {
    const transparent =
      background ===
      "transparent";

    const mimeType =
      transparent
        ? "image/png"
        : "image/jpeg";

    const quality =
      transparent
        ? undefined
        : 0.95;

    const blob =
      await new Promise<Blob | null>(
        (resolve) => {
          canvas.toBlob(
            resolve,
            mimeType,
            quality
          );
        }
      );

    if (!blob) {
      throw new Error(
        "Unable to create output image."
      );
    }

    return blob;
  }

  async function createPassportPhoto() {
    if (!imageUrl || !file) {
      setMessage(
        "Please upload a photo first."
      );

      return;
    }

    setLoading(true);
    setMessage("");

    try {
      /*
       * Processing order:
       *
       * Enhancement (if ON)
       * ↓
       * Background Removal (if ON)
       * ↓
       * Passport Size
       */
      const subjectUrl =
        await prepareSubject();

      if (!subjectUrl) {
        throw new Error(
          "Unable to prepare the photo."
        );
      }

      setMessage(
        "Creating passport photo..."
      );

      const image =
        await loadImage(
          subjectUrl
        );

      const photoWidth =
        mmToPx(
          selectedSize.width
        );

      const photoHeight =
        mmToPx(
          selectedSize.height
        );

      const canvas =
        canvasRef.current;

      if (!canvas) {
        throw new Error(
          "Canvas is not available."
        );
      }

      /*
       * SINGLE PHOTO
       */
      if (
        outputMode ===
        "single"
      ) {
        canvas.width =
          photoWidth;

        canvas.height =
          photoHeight;

        const ctx =
          canvas.getContext(
            "2d"
          );

        if (!ctx) {
          throw new Error(
            "Canvas context unavailable."
          );
        }

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        drawPhoto(
          ctx,
          image,
          0,
          0,
          photoWidth,
          photoHeight
        );

        const blob =
          await canvasToBlob(
            canvas
          );

        clearResult();

        const outputUrl =
          URL.createObjectURL(
            blob
          );

        resultUrlRef.current =
          outputUrl;

        setResultUrl(
          outputUrl
        );

        setMessage(
          "Passport photo created successfully."
        );

        return;
      }

      /*
       * A4 SHEET
       */
      const margin =
        mmToPx(8);

      const gap =
        mmToPx(4);

      const a4Width =
        mmToPx(
          A4_WIDTH_MM
        );

      const a4Height =
        mmToPx(
          A4_HEIGHT_MM
        );

      const usableWidth =
        a4Width -
        margin * 2;

      const usableHeight =
        a4Height -
        margin * 2;

      const columns =
        Math.max(
          1,
          Math.floor(
            (usableWidth + gap) /
              (photoWidth + gap)
          )
        );

      const rows =
        Math.max(
          1,
          Math.floor(
            (usableHeight + gap) /
              (photoHeight + gap)
          )
        );

      const maxCopies =
        columns * rows;

      const finalCopies =
        Math.min(
          copies,
          maxCopies
        );

      canvas.width =
        a4Width;

      canvas.height =
        a4Height;

      const ctx =
        canvas.getContext(
          "2d"
        );

      if (!ctx) {
        throw new Error(
          "Canvas context unavailable."
        );
      }

      /*
       * White A4 paper.
       */
      ctx.fillStyle =
        "#ffffff";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /*
       * Draw copies.
       */
      for (
        let i = 0;
        i < finalCopies;
        i++
      ) {
        const column =
          i % columns;

        const row =
          Math.floor(
            i / columns
          );

        const x =
          margin +
          column *
            (photoWidth + gap);

        const y =
          margin +
          row *
            (photoHeight + gap);

        drawPhoto(
          ctx,
          image,
          x,
          y,
          photoWidth,
          photoHeight
        );
      }

      const blob =
        await canvasToBlob(
          canvas
        );

      clearResult();

      const outputUrl =
        URL.createObjectURL(
          blob
        );

      resultUrlRef.current =
        outputUrl;

      setResultUrl(
        outputUrl
      );

      setMessage(
        `A4 sheet created successfully with ${finalCopies} photos.`
      );
    } catch (error) {
      console.error(
        "Passport Photo Maker:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the photo."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleEnhanceToggle(
    enabled: boolean
  ) {
    setEnhance(enabled);

    clearResult();

    /*
     * Turn OFF.
     */
    if (!enabled) {
      clearEnhanced();
      clearRemoved();

      setMessage(
        "Photo enhancement disabled."
      );

      return;
    }

    /*
     * Turn ON.
     */
    if (!file) {
      setMessage(
        "Upload a photo to enhance it."
      );

      return;
    }

    try {
      setMessage(
        "Enhancing photo..."
      );

      await processEnhancement();

      /*
       * Background removal from the
       * previous source is no longer valid.
       */
      clearRemoved();

      setMessage(
        "Photo enhanced successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Photo enhancement failed."
      );
    }
  }

  async function handleBackgroundToggle(
    enabled: boolean
  ) {
    setRemoveBg(enabled);

    clearResult();

    /*
     * Turn OFF.
     */
    if (!enabled) {
      clearRemoved();

      setMessage(
        "Background removal disabled."
      );

      return;
    }

    /*
     * Turn ON.
     */
    if (!file) {
      setMessage(
        "Upload a photo to remove its background."
      );

      return;
    }

    try {
      let source:
        | File
        | Blob = file;

      /*
       * If Enhance is ON,
       * enhance first.
       */
      if (enhance) {
        setMessage(
          "Enhancing photo first..."
        );

        if (
          enhancedUrlRef.current
        ) {
          const response =
            await fetch(
              enhancedUrlRef.current
            );

          source =
            await response.blob();
        } else {
          const enhancedBlob =
            await createEnhancedImage(
              file
            );

          const enhancedUrl =
            URL.createObjectURL(
              enhancedBlob
            );

          if (
            enhancedUrlRef.current
          ) {
            URL.revokeObjectURL(
              enhancedUrlRef.current
            );
          }

          enhancedUrlRef.current =
            enhancedUrl;

          setEnhancedUrl(
            enhancedUrl
          );

          source =
            enhancedBlob;
        }
      }

      setMessage(
        "Removing background with AI..."
      );

      await processBackground(
        source
      );

      setMessage(
        "Background removed successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Background removal failed."
      );
    }
  }

  function downloadSinglePhoto() {
    if (
      !resultUrl ||
      outputMode !==
        "single"
    ) {
      return;
    }

    const link =
      document.createElement(
        "a"
      );

    link.href =
      resultUrl;

    link.download =
      background ===
      "transparent"
        ? `passport-photo-${selectedSize.width}x${selectedSize.height}mm.png`
        : `passport-photo-${selectedSize.width}x${selectedSize.height}mm.jpg`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  }

  function downloadSheet() {
    if (
      !resultUrl ||
      outputMode !==
        "sheet"
    ) {
      return;
    }

    const link =
      document.createElement(
        "a"
      );

    link.href =
      resultUrl;

    link.download =
      "passport-photo-a4-sheet.jpg";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  }

  return (
    <section className="min-h-screen px-4 py-10 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="text-center">

          <p className="text-xs font-bold tracking-[0.28em] text-black/60">
            IMAGE TOOL
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
            Passport Size Photo Maker
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/70 sm:text-base">
            Create passport-size photos with optional enhancement,
            AI background removal, custom backgrounds and printable A4 sheets.
          </p>

        </div>

        {/* MAIN */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT PANEL */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-xl font-bold text-black">
              Upload Photo
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/70">
              Use a clear front-facing photo for the best result.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="hidden"
            />

            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="mt-6 flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/15 bg-[#f7f7f5] px-5 text-center transition hover:border-black/30 hover:bg-white"
            >

              <span className="text-4xl">
                📷
              </span>

              <span className="mt-4 font-bold text-black">
                {file
                  ? "Change Photo"
                  : "Choose Photo"}
              </span>

              <span className="mt-1 text-xs text-black/65">
                JPG, PNG or WebP
              </span>

            </button>

            {/* ORIGINAL */}
            {imageUrl && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5] p-3">

                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-black/60">
                  Original Photo
                </p>

                <img
                  src={imageUrl}
                  alt="Original photo"
                  className="mx-auto max-h-64 rounded-xl object-contain"
                />

              </div>
            )}

            {/* ENHANCEMENT */}
            <div className="mt-7 rounded-2xl border border-black/10 bg-[#f7f7f5] p-4">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <div className="text-sm font-bold text-black">
                      ✨ Photo Enhancement
                    </div>

                    <span className="rounded-full bg-black/[0.07] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black/60">
                      Optional
                    </span>

                  </div>

                  <p className="mt-1 text-xs leading-5 text-black/65">
                    Improve brightness, contrast, color and sharpness.
                  </p>

                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={enhance}
                  onClick={() =>
                    handleEnhanceToggle(
                      !enhance
                    )
                  }
                  disabled={
                    processingEnhance ||
                    removingBackground
                  }
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    enhance
                      ? "bg-black"
                      : "bg-black/20"
                  } disabled:opacity-50`}
                >

                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      enhance
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>

              {processingEnhance && (
                <div className="mt-4 rounded-xl bg-white p-3 text-center text-xs font-bold text-black">
                  ✨ Enhancing photo...
                </div>
              )}

              {enhancedUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white p-3">

                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-black/60">
                    Enhanced Photo
                  </p>

                  <img
                    src={enhancedUrl}
                    alt="Enhanced photo"
                    className="mx-auto max-h-64 rounded-lg object-contain"
                  />

                </div>
              )}

            </div>

            {/* BACKGROUND REMOVAL */}
            <div className="mt-5 rounded-2xl border border-black/10 bg-[#f7f7f5] p-4">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <div className="text-sm font-bold text-black">
                      ✂️ AI Background Removal
                    </div>

                    <span className="rounded-full bg-black/[0.07] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black/60">
                      Optional
                    </span>

                  </div>

                  <p className="mt-1 text-xs leading-5 text-black/65">
                    Automatically remove the original background.
                  </p>

                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={removeBg}
                  onClick={() =>
                    handleBackgroundToggle(
                      !removeBg
                    )
                  }
                  disabled={
                    processingEnhance ||
                    removingBackground
                  }
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    removeBg
                      ? "bg-black"
                      : "bg-black/20"
                  } disabled:opacity-50`}
                >

                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      removeBg
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>

              {removingBackground && (
                <div className="mt-4 rounded-xl bg-white p-3 text-center text-xs font-bold text-black">
                  ✂️ AI is removing the background...
                </div>
              )}

              {removedUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white p-3">

                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-black/60">
                    Background Removed
                  </p>

                  <div
                    className="rounded-lg p-2"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",
                      backgroundSize:
                        "16px 16px",
                      backgroundPosition:
                        "0 0,0 8px,8px -8px,-8px 0px",
                    }}
                  >

                    <img
                      src={removedUrl}
                      alt="Background removed"
                      className="mx-auto max-h-64 rounded-lg object-contain"
                    />

                  </div>

                </div>
              )}

            </div>

            {/* SIZE */}
            <div className="mt-7">

              <label className="text-sm font-bold text-black">
                Photo Size
              </label>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">

                {SIZE_PRESETS.map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setPreset(
                          item.id
                        );

                        clearResult();
                      }}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        preset ===
                        item.id
                          ? "border-black bg-[#202124] text-white"
                          : "border-black/10 bg-[#f7f7f5] text-black hover:border-black/25"
                      }`}
                    >

                      <div className="text-sm font-bold">
                        {item.name}
                      </div>

                      <div
                        className={`mt-1 text-xs ${
                          preset ===
                          item.id
                            ? "text-white/75"
                            : "text-black/65"
                        }`}
                      >
                        {item.label}
                      </div>

                    </button>
                  )
                )}

              </div>
            </div>

            {/* BACKGROUND COLOR */}
            <div className="mt-7">

              <label className="text-sm font-bold text-black">
                Background Color
              </label>

              <div className="mt-3 grid grid-cols-5 gap-2">

                {BACKGROUNDS.map(
                  (item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setBackground(
                          item.value
                        );

                        clearResult();
                      }}
                      className={`rounded-xl border p-2 transition ${
                        background ===
                        item.value
                          ? "border-black shadow-sm"
                          : "border-black/10 hover:border-black/30"
                      }`}
                    >

                      <div
                        className="mx-auto h-9 w-9 rounded-full border border-black/10"
                        style={{
                          backgroundColor:
                            item.value ===
                            "transparent"
                              ? "#ffffff"
                              : item.value,
                        }}
                      />

                      <div className="mt-1 text-[10px] font-bold text-black">
                        {item.name}
                      </div>

                    </button>
                  )
                )}

              </div>
            </div>

            {/* OUTPUT MODE */}
            <div className="mt-7">

              <label className="text-sm font-bold text-black">
                Output Mode
              </label>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() => {
                    setOutputMode(
                      "single"
                    );

                    clearResult();
                  }}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    outputMode ===
                    "single"
                      ? "border-black bg-[#202124] text-white"
                      : "border-black/10 bg-[#f7f7f5] text-black hover:border-black/25"
                  }`}
                >

                  <div className="text-sm font-bold">
                    👤 Single Photo
                  </div>

                  <div
                    className={`mt-1 text-xs ${
                      outputMode ===
                      "single"
                        ? "text-white/70"
                        : "text-black/60"
                    }`}
                  >
                    Download one passport photo
                  </div>

                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOutputMode(
                      "sheet"
                    );

                    clearResult();
                  }}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    outputMode ===
                    "sheet"
                      ? "border-black bg-[#202124] text-white"
                      : "border-black/10 bg-[#f7f7f5] text-black hover:border-black/25"
                  }`}
                >

                  <div className="text-sm font-bold">
                    ▦ A4 Photo Sheet
                  </div>

                  <div
                    className={`mt-1 text-xs ${
                      outputMode ===
                      "sheet"
                        ? "text-white/70"
                        : "text-black/60"
                    }`}
                  >
                    Multiple photos on A4
                  </div>

                </button>

              </div>
            </div>

            {/* COPIES */}
            {outputMode ===
              "sheet" && (
              <div className="mt-6">

                <div className="flex items-center justify-between">

                  <label className="text-sm font-bold text-black">
                    Number of Copies
                  </label>

                  <span className="rounded-lg bg-black/[0.05] px-3 py-1 text-sm font-bold text-black">
                    {copies}
                  </span>

                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  value={copies}
                  onChange={(e) => {
                    setCopies(
                      Number(
                        e.target.value
                      )
                    );

                    clearResult();
                  }}
                  className="mt-4 w-full"
                />

              </div>
            )}

            {/* POSITION */}
            <div className="mt-7">

              <label className="text-sm font-bold text-black">
                Photo Position
              </label>

              <div className="mt-4">

                <div className="flex justify-between text-xs text-black/65">
                  <span>Left</span>
                  <span>Right</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={positionX}
                  onChange={(e) => {
                    setPositionX(
                      Number(
                        e.target.value
                      )
                    );

                    clearResult();
                  }}
                  className="mt-2 w-full"
                />

              </div>

              <div className="mt-4">

                <div className="flex justify-between text-xs text-black/65">
                  <span>Top</span>
                  <span>Bottom</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={positionY}
                  onChange={(e) => {
                    setPositionY(
                      Number(
                        e.target.value
                      )
                    );

                    clearResult();
                  }}
                  className="mt-2 w-full"
                />

              </div>

            </div>

            {/* ZOOM */}
            <div className="mt-7">

              <div className="flex items-center justify-between">

                <label className="text-sm font-bold text-black">
                  Zoom
                </label>

                <span className="text-sm text-black/65">
                  {zoom}%
                </span>

              </div>

              <input
                type="range"
                min="80"
                max="160"
                value={zoom}
                onChange={(e) => {
                  setZoom(
                    Number(
                      e.target.value
                    )
                  );

                  clearResult();
                }}
                className="mt-3 w-full"
              />

            </div>

            {/* BUTTONS */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={
                  createPassportPhoto
                }
                disabled={
                  !imageUrl ||
                  loading ||
                  processingEnhance ||
                  removingBackground
                }
                className="rounded-xl bg-[#202124] px-5 py-3.5 text-sm font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              >

                {processingEnhance
                  ? "✨ Enhancing..."
                  : removingBackground
                  ? "✂️ Removing Background..."
                  : loading
                  ? "Creating..."
                  : "Create Passport Photo"}

              </button>

              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm font-bold text-black transition hover:bg-black/[0.03]"
              >
                Clear All
              </button>

            </div>

            {message && (
              <p className="mt-4 rounded-xl bg-black/[0.04] p-3 text-center text-sm font-medium text-black/75">
                {message}
              </p>
            )}

          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-black">
                  Preview
                </h2>

                <p className="mt-1 text-sm text-black/65">
                  {selectedSize.label}
                </p>

              </div>

              <span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/60">
                {outputMode ===
                "sheet"
                  ? "A4 SHEET"
                  : "SINGLE PHOTO"}
              </span>

            </div>

            {/* RESULT PREVIEW */}
            <div className="mt-6 min-h-[520px] overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5] p-4">

              {resultUrl ? (
                <div className="flex min-h-[480px] items-center justify-center">

                  <img
                    src={resultUrl}
                    alt="Passport photo result"
                    className="mx-auto max-h-[650px] max-w-full rounded-lg object-contain shadow-sm"
                  />

                </div>
              ) : removedUrl ? (
                <div className="flex min-h-[480px] items-center justify-center">

                  <div className="text-center">

                    <div
                      className="mx-auto inline-block rounded-xl p-2"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",
                        backgroundSize:
                          "16px 16px",
                        backgroundPosition:
                          "0 0,0 8px,8px -8px,-8px 0px",
                      }}
                    >

                      <img
                        src={removedUrl}
                        alt="Background removed preview"
                        className="mx-auto max-h-96 max-w-full rounded-xl object-contain"
                      />

                    </div>

                    <p className="mt-5 text-sm font-medium text-black/70">
                      Background removed successfully. Click{" "}
                      <span className="font-bold text-black">
                        Create Passport Photo
                      </span>
                      .
                    </p>

                  </div>

                </div>
              ) : enhancedUrl ? (
                <div className="flex min-h-[480px] items-center justify-center">

                  <div className="text-center">

                    <img
                      src={enhancedUrl}
                      alt="Enhanced preview"
                      className="mx-auto max-h-96 max-w-full rounded-xl object-contain"
                    />

                    <p className="mt-5 text-sm font-medium text-black/70">
                      Photo enhanced successfully.
                    </p>

                  </div>

                </div>
              ) : imageUrl ? (
                <div className="flex min-h-[480px] items-center justify-center">

                  <div className="text-center">

                    <img
                      src={imageUrl}
                      alt="Photo preview"
                      className="mx-auto max-h-96 max-w-full rounded-xl object-contain"
                    />

                    <p className="mt-5 text-sm font-medium text-black/70">
                      Configure your photo and click{" "}
                      <span className="font-bold text-black">
                        Create Passport Photo
                      </span>
                      .
                    </p>

                  </div>

                </div>
              ) : (
                <div className="flex min-h-[480px] items-center justify-center text-center">

                  <div>

                    <div className="text-5xl">
                      🪪
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-black">
                      Your passport photo will appear here
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-black/70">
                      Upload a photo to create a standard passport-size photograph.
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* DOWNLOAD */}
            <div className="mt-6">

              <h3 className="text-lg font-bold text-black">
                Download Options
              </h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={
                    downloadSinglePhoto
                  }
                  disabled={
                    !resultUrl ||
                    outputMode !==
                      "single"
                  }
                  className="rounded-xl bg-[#202124] px-5 py-4 text-left text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <div className="text-sm font-bold">
                    ↓ Download Single Photo
                  </div>

                  <div className="mt-1 text-xs text-white/70">
                    {background ===
                    "transparent"
                      ? "PNG"
                      : "JPG"}{" "}
                    •{" "}
                    {
                      selectedSize.label
                    }
                  </div>

                </button>

                <button
                  type="button"
                  onClick={
                    downloadSheet
                  }
                  disabled={
                    !resultUrl ||
                    outputMode !==
                      "sheet"
                  }
                  className="rounded-xl border border-black/10 bg-white px-5 py-4 text-left text-black transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <div className="text-sm font-bold">
                    ▦ Download A4 Sheet
                  </div>

                  <div className="mt-1 text-xs text-black/60">
                    Multiple photos on A4
                  </div>

                </button>

              </div>
            </div>

            {/* PROCESSING INFO */}
            <div className="mt-5 rounded-2xl bg-[#f7f7f5] p-4">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  ⚙️
                </span>

                <div>

                  <div className="text-sm font-bold text-black">
                    Current Settings
                  </div>

                  <p className="mt-1 text-xs leading-5 text-black/65">
                    Enhancement:{" "}
                    {enhance
                      ? "ON"
                      : "OFF"}
                    {" • "}
                    Background Removal:{" "}
                    {removeBg
                      ? "ON"
                      : "OFF"}
                  </p>

                </div>

              </div>

            </div>

            {/* TIPS */}
            <div className="mt-5 rounded-2xl bg-[#f7f7f5] p-4">

              <h3 className="text-sm font-bold text-black">
                💡 Tips for best results
              </h3>

              <ul className="mt-2 space-y-1 text-xs leading-5 text-black/65">

                <li>
                  • Use a clear, front-facing photo.
                </li>

                <li>
                  • Make sure the face is well lit.
                </li>

                <li>
                  • Avoid strong shadows and glare.
                </li>

                <li>
                  • AI background removal works best when the subject is clearly visible.
                </li>

              </ul>

            </div>

          </div>
        </div>

        {/* Hidden canvas */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />

      </div>
    </section>
  );
}
