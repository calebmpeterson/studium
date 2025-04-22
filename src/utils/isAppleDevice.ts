export function isAppleDevice(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent;

  // iOS detection (iPhone, iPad, iPod) and macOS (Safari-based macs)
  return /iPad|iPhone|iPod|Macintosh/.test(ua);
}
