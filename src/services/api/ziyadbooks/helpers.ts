export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function toText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return "";
}

export function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.round(value));
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value.replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value > 0;
  }

  if (typeof value === "string") {
    return ["true", "1", "yes", "y", "featured", "best seller"].includes(value.toLowerCase().trim());
  }

  return false;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function inferCategoryFromName(name: string, preorder: boolean): string {
  if (preorder) {
    return "Preorder";
  }

  if (/buy1get1|promo/i.test(name)) {
    return "Promo Bundle";
  }

  if (/al-quran|quran|iqra|iqro|juz amma/i.test(name)) {
    return "Al-Quran & Iqra";
  }

  if (/anak|kids/i.test(name)) {
    return "Anak & Keluarga";
  }

  return "Katalog Buku";
}

export function buildCoverArt(title: string, primary: string, secondary: string): string {
  const safeTitle = escapeXml(title);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
        <radialGradient id="glow" cx="0.25" cy="0.2" r="0.8">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="800" rx="40" fill="url(#bg)" />
      <circle cx="470" cy="110" r="160" fill="url(#glow)" />
      <circle cx="110" cy="660" r="120" fill="#ffffff" fill-opacity="0.08" />
      <rect x="56" y="78" width="488" height="644" rx="28" stroke="#ffffff" stroke-opacity="0.25" />
      <rect x="108" y="142" width="184" height="20" rx="10" fill="#ffffff" fill-opacity="0.45" />
      <rect x="108" y="178" width="312" height="18" rx="9" fill="#ffffff" fill-opacity="0.25" />
      <rect x="108" y="234" width="384" height="12" rx="6" fill="#ffffff" fill-opacity="0.22" />
      <rect x="108" y="260" width="352" height="12" rx="6" fill="#ffffff" fill-opacity="0.18" />
      <rect x="108" y="286" width="286" height="12" rx="6" fill="#ffffff" fill-opacity="0.18" />
      <rect x="108" y="342" width="380" height="278" rx="26" fill="#ffffff" fill-opacity="0.12" stroke="#ffffff" stroke-opacity="0.2" />
      <path d="M148 546C205 490 262 468 320 468C378 468 435 490 492 546" stroke="#ffffff" stroke-opacity="0.45" stroke-width="10" stroke-linecap="round" />
      <path d="M176 604C228 556 274 538 320 538C366 538 412 556 464 604" stroke="#ffffff" stroke-opacity="0.36" stroke-width="8" stroke-linecap="round" />
      <text x="108" y="690" fill="#ffffff" fill-opacity="0.82" font-family="Arial, sans-serif" font-size="34" font-weight="700">Ziyad Books</text>
      <text x="108" y="732" fill="#ffffff" fill-opacity="0.72" font-family="Arial, sans-serif" font-size="23">${safeTitle}</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
