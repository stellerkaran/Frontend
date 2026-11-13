/**
 * Google Drive URL utilities — shared across all data files.
 * Provides extraction of file IDs and generation of preview/download URLs.
 */

/**
 * Extract Google Drive file ID from various URL formats.
 * Supports:
 *   - https://drive.google.com/file/d/{id}/view
 *   - https://drive.google.com/open?id={id}
 *   - https://docs.google.com/file/d/{id}/edit
 */
export function extractDriveId(url) {
  if (!url) return null;
  // Match /d/{id} pattern (with optional surrounding path)
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  // Match ?id= or &id= query parameter
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];
  return null;
}

/**
 * Generate Google Drive embed preview URL.
 * Returns the original URL if no ID can be extracted.
 */
export function getDrivePreviewUrl(url) {
  const fileId = extractDriveId(url);
  if (!fileId) return url;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Generate Google Drive direct download URL.
 * Returns the original URL if no ID can be extracted.
 */
export function getDriveDirectDownloadUrl(url) {
  const fileId = extractDriveId(url);
  if (!fileId) return url;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
