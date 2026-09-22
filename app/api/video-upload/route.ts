import { handleUpload } from "@vercel/blob/client";
export async function POST(request: Request) {
  const body = await request.json();
  const response = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async (pathname) => {
      if (!pathname.startsWith("video-uploads/")) {
        throw new Error("Invalid upload path.");
      }
      return {
        allowedContentTypes: ["video/*"],
        maximumSizeInBytes: 500 * 1024 * 1024,
        addRandomSuffix: false,
        tokenPayload: JSON.stringify({
          type: "video-to-link",
        }),
      };
    },
    onUploadCompleted: async () => {},
  });
  return Response.json(response);
}
