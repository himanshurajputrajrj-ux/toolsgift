import { headers } from "next/headers";
import ShareResultActions from "./ShareResultActions";
type SharePayload = {
  tool: string;
  resultTitle: string;
  kind?: "text" | "image" | "batch" | "video";
  value: string;
  filename: string;
  contentType?: string;
  createdAt: string;
  expiresAt: string;
};
type SharePageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function getShareData(id: string): Promise<SharePayload | null> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  if (!host) {
    return null;
  }
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "development" ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  try {
    const response = await fetch(
      `${baseUrl}/api/share?id=${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as SharePayload;
  } catch (error) {
    console.error("Failed to load share data:", error);
    return null;
  }
}
export default async function SharePage({
  params,
}: SharePageProps) {
  const { id } = await params;
  const share = await getShareData(id);
  if (!share) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl dark:bg-red-950">
              ??
            </div>
            <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              Share Link Not Available
            </h1>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
              This share link may be invalid, expired, or no longer
              available.
            </p>
            <a
              href="/"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Go to ToolsGift
            </a>
          </div>
        </div>
      </main>
    );
  }
  const assetUrl = `/api/share/image?id=${encodeURIComponent(id)}`;
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <a
            href="/"
            className="inline-block text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            ToolsGift
          </a>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Shared result
          </p>
        </header>
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {share.tool === "case-converter"
                  ? "Case Converter"
                  : share.tool === "video-to-link"
                    ? "Video ? Link"
                    : "ToolsGift Result"}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {share.resultTitle}
              </h1>
            </div>
            <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Shared Result
            </span>
          </div>
          <div className="mt-6">
            {share.kind === "video" ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-black dark:border-gray-800">
                <video
                  src={assetUrl}
                  controls
                  playsInline
                  className="mx-auto max-h-[700px] w-full"
                />
              </div>
            ) : share.kind === "image" ? (
              <div className="overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
                <img
                  src={assetUrl}
                  alt={share.resultTitle}
                  className="mx-auto max-h-[800px] w-auto rounded-lg bg-white shadow-sm"
                />
              </div>
            ) : share.kind === "batch" ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-950">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  ZIP
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  Batch Converted Images
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Your converted images are packaged together in a ZIP file.
                </p>
              </div>
            ) : (
              <textarea
                value={share.value}
                readOnly
                className="min-h-80 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-5 text-base leading-7 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                aria-label="Shared result"
              />
            )}
          </div>
          {share.kind === "video" ? (
            <a
              href={assetUrl}
              download={share.filename}
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Download Video
            </a>
          ) : share.kind === "image" ? (
            <a
              href={assetUrl}
              download={share.filename}
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Download Image
            </a>
          ) : share.kind === "batch" ? (
            <a
              href={assetUrl}
              download={share.filename}
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Download ZIP
            </a>
          ) : (
            <ShareResultActions
              value={share.value}
              filename={share.filename}
            />
          )}
          <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-950">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {share.kind === "video"
                ? `This video link expires on ${new Date(
                    share.expiresAt
                  ).toLocaleString()}.`
                : "This shared link expires one month after it was created."}
            </p>
          </div>
        </section>
        <div className="mt-6 text-center">
          <a
            href={
              share.tool === "case-converter"
                ? "/tools/case-converter"
                : share.tool === "word-to-image"
                  ? "/tools/word-to-image"
                  : share.tool === "image-metadata"
                    ? "/tools/image-metadata"
                    : share.tool === "video-to-link"
                      ? "/tools/video-to-link"
                      : "/"
            }
            className="inline-flex rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Try ToolsGift
          </a>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Create, convert and share your results with ToolsGift.
        </p>
      </div>
    </main>
  );
}
