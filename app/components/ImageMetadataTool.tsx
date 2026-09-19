"use client";

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import exifr from "exifr";

type MetadataItem = {
  label: string;
  value: string;
};

function formatBytes(bytes: number) {
  if (!bytes) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  return String(value);
}

function getAspectRatio(
  width: number,
  height: number
) {
  if (!width || !height) return "—";

  const gcd = (a: number, b: number): number => {
    while (b) {
      const temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  };

  const divisor = gcd(width, height);

  return `${width / divisor}:${height / divisor}`;
}

function getFileFormat(file: File) {
  if (file.type) {
    return file.type
      .replace("image/", "")
      .toUpperCase();
  }

  return (
    file.name
      .split(".")
      .pop()
      ?.toUpperCase() || "UNKNOWN"
  );
}

function loadImage(
  url: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      if (
        image.naturalWidth <= 0 ||
        image.naturalHeight <= 0
      ) {
        reject(
          new Error(
            "Unable to read image dimensions."
          )
        );

        return;
      }

      resolve(image);
    };

    image.onerror = () => {
      reject(
        new Error(
          "Unable to load this image."
        )
      );
    };

    image.src = url;
  });
}

export default function ImageMetadataTool() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const previewUrlRef =
    useRef("");

  const cleanUrlRef =
    useRef("");

  const [file, setFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [cleanUrl, setCleanUrl] =
    useState("");

  const [metadata, setMetadata] =
    useState<MetadataItem[]>([]);

  const [rawMetadata, setRawMetadata] =
    useState<Record<string, unknown> | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [cleaning, setCleaning] =
    useState(false);

  const [, setMessage] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    previewUrlRef.current =
      previewUrl;
  }, [previewUrl]);

  useEffect(() => {
    cleanUrlRef.current =
      cleanUrl;
  }, [cleanUrl]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(
          previewUrlRef.current
        );
      }

      if (cleanUrlRef.current) {
        URL.revokeObjectURL(
          cleanUrlRef.current
        );
      }
    };
  }, []);

  function clearPreviewUrl() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(
        previewUrlRef.current
      );

      previewUrlRef.current = "";
    }

    setPreviewUrl("");
  }

  function clearCleanUrl() {
    if (cleanUrlRef.current) {
      URL.revokeObjectURL(
        cleanUrlRef.current
      );

      cleanUrlRef.current = "";
    }

    setCleanUrl("");
  }

  async function readImageDimensions(
    imageFile: File
  ) {
    const url =
      URL.createObjectURL(
        imageFile
      );

    try {
      const image =
        await loadImage(url);

      return {
        width: image.naturalWidth,
        height: image.naturalHeight,
      };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function analyzeImage(
    imageFile: File
  ) {
    setLoading(true);
    setMessage("");
    setCopied(false);

    try {
      const dimensions =
        await readImageDimensions(
          imageFile
        );

      let exifData:
        | Record<string, unknown>
        | null = null;

      try {
        exifData =
          await exifr.parse(
            imageFile,
            {
              tiff: true,
              exif: true,
              gps: true,
              xmp: true,
              icc: true,
              iptc: true,
              jfif: true,
              ihdr: true,
              translateValues: true,
            }
          );
      } catch (error) {
        console.warn(
          "Metadata parsing warning:",
          error
        );

        exifData = null;
      }

      const basicMetadata: MetadataItem[] = [
        {
          label: "File Name",
          value: imageFile.name,
        },
        {
          label: "File Size",
          value: formatBytes(
            imageFile.size
          ),
        },
        {
          label: "Format",
          value: getFileFormat(
            imageFile
          ),
        },
        {
          label: "MIME Type",
          value:
            imageFile.type ||
            "Unknown",
        },
        {
          label: "Width",
          value:
            `${dimensions.width}px`,
        },
        {
          label: "Height",
          value:
            `${dimensions.height}px`,
        },
        {
          label: "Aspect Ratio",
          value:
            getAspectRatio(
              dimensions.width,
              dimensions.height
            ),
        },
        {
          label: "Last Modified",
          value:
            new Date(
              imageFile.lastModified
            ).toLocaleString(),
        },
      ];

      if (exifData) {
        const importantFields: Array<
          [string, string]
        > = [
          ["Make", "Camera Make"],
          ["Model", "Camera Model"],
          ["LensModel", "Lens Model"],
          ["Software", "Software"],
          [
            "DateTimeOriginal",
            "Date Taken",
          ],
          [
            "CreateDate",
            "Create Date",
          ],
          [
            "ModifyDate",
            "Modify Date",
          ],
          ["Artist", "Artist"],
          [
            "Copyright",
            "Copyright",
          ],
          [
            "ExposureTime",
            "Exposure Time",
          ],
          [
            "FNumber",
            "F-Number",
          ],
          ["ISO", "ISO"],
          [
            "FocalLength",
            "Focal Length",
          ],
          ["Flash", "Flash"],
          [
            "WhiteBalance",
            "White Balance",
          ],
          [
            "ColorSpace",
            "Color Space",
          ],
          [
            "Orientation",
            "Orientation",
          ],
          [
            "Latitude",
            "GPS Latitude",
          ],
          [
            "Longitude",
            "GPS Longitude",
          ],
          [
            "GPSAltitude",
            "GPS Altitude",
          ],
        ];

        for (
          const [
            key,
            label,
          ] of importantFields
        ) {
          const value =
            exifData[key];

          if (
            value !== undefined &&
            value !== null &&
            value !== ""
          ) {
            basicMetadata.push({
              label,
              value:
                formatValue(
                  value
                ),
            });
          }
        }
      }

      setMetadata(
        basicMetadata
      );

      setRawMetadata(
        exifData
      );

      setMessage(
        exifData
          ? "Image metadata loaded successfully."
          : "Basic image information loaded. No readable EXIF metadata was found."
      );
    } catch (error) {
      console.error(
        "Metadata viewer error:",
        error
      );

      setMetadata([]);
      setRawMetadata(null);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to analyze this image."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleFile(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) return;

    if (
      selectedFile.type &&
      !selectedFile.type.startsWith(
        "image/"
      )
    ) {
      setMessage(
        "Please select an image file."
      );

      return;
    }

    clearPreviewUrl();
    clearCleanUrl();

    const url =
      URL.createObjectURL(
        selectedFile
      );

    previewUrlRef.current =
      url;

    setFile(selectedFile);
    setPreviewUrl(url);

    setMetadata([]);
    setRawMetadata(null);
    setMessage("");
    setCopied(false);

    analyzeImage(
      selectedFile
    );
  }

  function clearAll() {
    clearPreviewUrl();
    clearCleanUrl();

    setFile(null);
    setMetadata([]);
    setRawMetadata(null);
    setMessage("");
    setCopied(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function createReport() {
    if (!file) return "";

    let report =
      "IMAGE METADATA REPORT\n";

    report +=
      "====================\n\n";

    for (const item of metadata) {
      report +=
        `${item.label}: ${item.value}\n`;
    }

    if (rawMetadata) {
      report +=
        "\n\nRAW METADATA\n";

      report +=
        "============\n\n";

      report += JSON.stringify(
        rawMetadata,
        null,
        2
      );
    }

    return report;
  }

  async function copyMetadata() {
    const report =
      createReport();

    if (!report) return;

    try {
      await navigator.clipboard.writeText(
        report
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setMessage(
        "Unable to copy metadata."
      );
    }
  }

  function downloadReport() {
    const report =
      createReport();

    if (!report) return;

    const blob =
      new Blob(
        [report],
        {
          type:
            "text/plain;charset=utf-8",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    const baseName =
      file?.name.replace(
        /\.[^/.]+$/,
        ""
      ) || "image";

    link.download =
      `${baseName}-metadata.txt`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );
  }

  /*
   * REMOVE ALL EMBEDDED METADATA
   *
   * The original image is decoded and
   * rendered onto a fresh canvas.
   *
   * The newly exported image does not
   * copy the original EXIF/IPTC/XMP
   * metadata into the output.
   */
  async function removeAllMetadata() {
    if (!file || !previewUrl) {
      return;
    }

    setCleaning(true);

    setMessage(
      "Removing image metadata..."
    );

    try {
      const image =
        await loadImage(
          previewUrl
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
          "2d"
        );

      if (!ctx) {
        throw new Error(
          "Unable to create image canvas."
        );
      }

      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      let mimeType =
        "image/jpeg";

      if (
        file.type ===
        "image/png"
      ) {
        mimeType =
          "image/png";

      } else if (
        file.type ===
        "image/webp"
      ) {
        mimeType =
          "image/webp";

      }

      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              mimeType,
              mimeType ===
                "image/jpeg"
                ? 0.95
                : 1
            );
          }
        );

      if (!blob) {
        throw new Error(
          "Unable to create cleaned image."
        );
      }

      clearCleanUrl();

      const url =
        URL.createObjectURL(
          blob
        );

      cleanUrlRef.current =
        url;

      setCleanUrl(url);

      setMessage(
        "Metadata removed successfully. Your clean image is ready to download."
      );
    } catch (error) {
      console.error(
        "Metadata removal error:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to remove metadata."
      );
    } finally {
      setCleaning(false);
    }
  }

  function downloadCleanImage() {
    if (!cleanUrl || !file) {
      return;
    }

    const extension =
      "jpg";

    if (
      file.type ===
      "image/png"
    ) {
    } else if (
      file.type ===
      "image/webp"
    ) {
    }

    const baseName =
      file.name.replace(
        /\.[^/.]+$/,
        ""
      ) || "image";

    const link =
      document.createElement(
        "a"
      );

    link.href =
      cleanUrl;

    link.download =
      `${baseName}-clean.${extension}`;

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

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Image Metadata Tool
          </h1>

          <p className="image-metadata-subtitle mx-auto mt-4 max-w-2xl text-sm leading-6 sm:text-base">
            View image metadata, inspect EXIF information,
            remove embedded metadata and download a clean
            image copy.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT PANEL */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-xl font-bold">
              Upload Image
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/65">
              Upload an image to view its information
              and remove embedded metadata.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />

            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="mt-6 flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/15 bg-[#f7f7f5] px-5 text-center transition hover:border-black/30 hover:bg-white"
            >

              <span className="text-5xl">
                🖼️
              </span>

              <span className="mt-4 text-sm font-bold">
                {file
                  ? "Choose Another Image"
                  : "Choose Image"}
              </span>

              <span className="mt-1 text-xs text-black/60">
                JPG, PNG, WebP and other image formats
              </span>

            </button>

            {/* ORIGINAL */}
            {previewUrl && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5] p-3">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-xs font-bold uppercase tracking-wide text-black/60">
                    Original Image
                  </p>

                  {loading && (
                    <span className="text-xs font-bold text-black/60">
                      Analyzing...
                    </span>
                  )}

                </div>

                <div className="flex min-h-64 items-center justify-center rounded-xl bg-white p-3">

                  <img
                    src={previewUrl}
                    alt="Original image preview"
                    className="max-h-80 max-w-full rounded-lg object-contain"
                  />

                </div>

              </div>
            )}

            {/* CLEAN IMAGE */}
            {cleanUrl && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5] p-3">

                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-black/60">
                  Clean Image
                </p>

                <div className="flex min-h-64 items-center justify-center rounded-xl bg-white p-3">

                  <img
                    src={cleanUrl}
                    alt="Clean image without metadata"
                    className="max-h-80 max-w-full rounded-lg object-contain"
                  />

                </div>

                <div className="mt-3 rounded-xl bg-black/[0.04] p-3 text-center text-xs font-medium leading-5 text-black/65">
                  The clean copy has been created
                  without carrying over the original
                  embedded metadata.
                </div>

              </div>
            )}

            {/* REMOVE */}
            <button
              type="button"
              onClick={
                removeAllMetadata
              }
              disabled={
                !file ||
                cleaning ||
                loading
              }
              className="mt-6 w-full rounded-xl bg-[#202124] px-5 py-4 text-sm font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >

              {cleaning
                ? "🧹 Removing Metadata..."
                : "🧹 Remove All Metadata"}

            </button>

            {/* DOWNLOAD CLEAN */}
            <button
              type="button"
              onClick={
                downloadCleanImage
              }
              disabled={
                !cleanUrl
              }
              className="mt-3 w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↓ Download Clean Image
            </button>

            {/* REPORT */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={
                  copyMetadata
                }
                disabled={
                  metadata.length ===
                  0
                }
                className="rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm font-bold text-black transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied
                  ? "✓ Copied"
                  : "📋 Copy Metadata"}
              </button>

              <button
                type="button"
                onClick={
                  downloadReport
                }
                disabled={
                  metadata.length ===
                  0
                }
                className="rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm font-bold text-black transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↓ Metadata Report
              </button>

            </div>

            <button
              type="button"
              onClick={clearAll}
              className="mt-3 w-full rounded-xl border border-black/10 px-5 py-3 text-sm font-bold text-black/70 transition hover:bg-black/[0.03]"
            >
              Clear Image
            </button>

            {/* PRIVACY */}
            <div className="mt-6 rounded-2xl bg-[#f7f7f5] p-4">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  🔒
                </span>

                <div>

                  <p className="text-sm font-bold">
                    Browser Processing
                  </p>

                  <p className="mt-1 text-xs leading-5 text-black/65">
                    Your image is processed directly
                    in your browser. No image upload
                    to a server is required for this tool.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Metadata
                </h2>

                <p className="mt-1 text-sm text-black/60">
                  Available information found in your image
                </p>

              </div>

              {metadata.length > 0 && (
                <span className="w-fit rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/60">
                  {metadata.length} fields
                </span>
              )}

            </div>

            {loading ? (
              <div className="mt-6 flex min-h-[500px] items-center justify-center rounded-2xl border border-black/10 bg-[#f7f7f5]">

                <div className="text-center">

                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-black" />

                  <p className="mt-4 text-sm font-bold">
                    Reading metadata...
                  </p>

                  <p className="mt-1 text-xs text-black/60">
                    Please wait
                  </p>

                </div>

              </div>
            ) : metadata.length > 0 ? (
              <div className="mt-6">

                <div className="overflow-hidden rounded-2xl border border-black/10">

                  <div className="divide-y divide-black/10">

                    {metadata.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={`${item.label}-${index}`}
                          className="grid gap-1 px-4 py-4 sm:grid-cols-[180px_1fr]"
                        >

                          <div className="text-xs font-bold uppercase tracking-wide text-black/50">
                            {item.label}
                          </div>

                          <div className="break-words text-sm font-medium text-black">
                            {item.value}
                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* RAW */}
                {rawMetadata && (
                  <details className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5]">

                    <summary className="cursor-pointer px-4 py-4 text-sm font-bold">
                      View Raw Metadata
                    </summary>

                    <pre className="max-h-[500px] overflow-auto border-t border-black/10 bg-white p-4 text-xs leading-5 text-black/75">
                      {JSON.stringify(
                        rawMetadata,
                        null,
                        2
                      )}
                    </pre>

                  </details>
                )}

                {/* REMOVE INFO */}
                <div className="mt-5 rounded-2xl border border-black/10 bg-[#f7f7f5] p-4">

                  <div className="flex items-start gap-3">

                    <span className="text-xl">
                      🧹
                    </span>

                    <div>

                      <p className="text-sm font-bold">
                        Remove Metadata
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/65">
                        Create a fresh copy of the
                        image without carrying over
                        the original embedded metadata.
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            ) : (
              <div className="mt-6 flex min-h-[500px] items-center justify-center rounded-2xl border border-black/10 bg-[#f7f7f5] text-center">

                <div>

                  <div className="text-5xl">
                    🔎
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    No image selected
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/65">
                    Upload an image and its available
                    metadata will appear here.
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* INFORMATION */}
        <div className="mt-6 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-lg font-bold">
            What can this tool do?
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {[
              [
                "🔎",
                "View Metadata",
                "Inspect available image information.",
              ],
              [
                "📷",
                "Camera Data",
                "View camera, lens and shooting information when available.",
              ],
              [
                "📍",
                "GPS Information",
                "Check whether location coordinates are embedded.",
              ],
              [
                "🧹",
                "Clean Image",
                "Create a fresh copy without the original embedded metadata.",
              ],
            ].map((item) => (
              <div
                key={item[1]}
                className="rounded-2xl bg-[#f7f7f5] p-4"
              >

                <div className="text-2xl">
                  {item[0]}
                </div>

                <div className="mt-3 text-sm font-bold">
                  {item[1]}
                </div>

                <p className="mt-1 text-xs leading-5 text-black/60">
                  {item[2]}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
