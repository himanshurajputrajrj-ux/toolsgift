/**
 * Creator-side share deletion. The delete capability is only ever returned in
 * the share creation response, so it is held in component state and sent in
 * the `Authorization` header. It is never written to share metadata, a URL, or
 * a log.
 */
export async function deleteShare(
  shareId: string,
  deleteCapability: string
): Promise<boolean> {
  if (!shareId || !deleteCapability) {
    return false;
  }

  try {
    const response = await fetch(
      `/api/share?id=${encodeURIComponent(shareId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${deleteCapability}`,
        },
      }
    );

    return response.ok;
  } catch {
    return false;
  }
}
