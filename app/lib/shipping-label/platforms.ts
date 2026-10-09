import type { PlatformId } from "./types";

export type PlatformKeyword = {
  term: string;
  weight: number;
};

export type PlatformPreset = {
  id: Exclude<PlatformId, "auto">;
  label: string;
  /** Keywords scanned (case-insensitive) in extracted page text. */
  keywords: PlatformKeyword[];
  /**
   * Preferred label position as a fraction of displayed page height
   * (top-left origin). Used only as a gentle prior when choosing between
   * multiple whitespace gutters — never to force a crop.
   */
  labelHeightHint?: { min: number; max: number };
};

/**
 * Platform preset registry. Add new marketplaces here — detection and UI
 * pick the entry up automatically. Detection is heuristic and never
 * guaranteed; low-confidence results always fall back to manual review.
 */
export const PLATFORM_PRESETS: PlatformPreset[] = [
  {
    id: "meesho",
    label: "Meesho",
    keywords: [
      { term: "meesho", weight: 5 },
      { term: "meesho private limited", weight: 3 },
      { term: "supplier", weight: 1 },
    ],
    labelHeightHint: { min: 0.35, max: 0.62 },
  },
  {
    id: "amazon",
    label: "Amazon",
    keywords: [
      { term: "amazon", weight: 5 },
      { term: "amazon.in", weight: 3 },
      { term: "sold by", weight: 2 },
      { term: "shipped by", weight: 1 },
    ],
    labelHeightHint: { min: 0.3, max: 0.6 },
  },
  {
    id: "flipkart",
    label: "Flipkart",
    keywords: [
      { term: "flipkart", weight: 5 },
      { term: "ekart", weight: 3 },
      { term: "fk-", weight: 2 },
      { term: "flipkart private limited", weight: 2 },
    ],
    labelHeightHint: { min: 0.35, max: 0.62 },
  },
  {
    id: "myntra",
    label: "Myntra",
    keywords: [
      { term: "myntra", weight: 5 },
      { term: "myntra designs", weight: 3 },
      { term: "way2online", weight: 1 },
    ],
    labelHeightHint: { min: 0.3, max: 0.6 },
  },
  {
    id: "snapdeal",
    label: "Snapdeal",
    keywords: [
      { term: "snapdeal", weight: 5 },
      { term: "snapdeal online", weight: 2 },
      { term: "sdpl", weight: 1 },
    ],
    labelHeightHint: { min: 0.35, max: 0.62 },
  },
  {
    id: "ajio",
    label: "AJIO",
    keywords: [
      { term: "ajio", weight: 5 },
      { term: "reliance brands", weight: 2 },
      { term: "rel jio", weight: 1 },
    ],
    labelHeightHint: { min: 0.3, max: 0.6 },
  },
  {
    id: "jiomart",
    label: "JioMart",
    keywords: [
      { term: "jiomart", weight: 5 },
      { term: "reliance retail", weight: 2 },
      { term: "jio mart", weight: 2 },
    ],
    labelHeightHint: { min: 0.3, max: 0.65 },
  },
  {
    id: "shopify",
    label: "Shopify",
    keywords: [
      { term: "shopify", weight: 5 },
      { term: "shipping label", weight: 2 },
      { term: "thank you for your order", weight: 1 },
    ],
  },
  {
    id: "shiprocket",
    label: "Shiprocket",
    keywords: [
      { term: "shiprocket", weight: 5 },
      { term: "shp-", weight: 2 },
      { term: "pickup address", weight: 1 },
    ],
  },
  {
    id: "delhivery",
    label: "Delhivery",
    keywords: [
      { term: "delhivery", weight: 5 },
      { term: "dl-", weight: 1 },
    ],
  },
  {
    id: "custom",
    label: "Other / Custom",
    keywords: [],
  },
];

export const AUTO_PLATFORM_ID: PlatformId = "auto";

export function getPlatformPreset(
  id: PlatformId
): PlatformPreset | undefined {
  if (id === "auto" || id === undefined) return undefined;
  return PLATFORM_PRESETS.find((p) => p.id === id);
}

export function getPlatformLabel(id: PlatformId): string {
  if (id === "auto") return "Auto Detect";
  return getPlatformPreset(id)?.label ?? "Other / Custom";
}

/** Shared (platform-agnostic) markers used to classify label vs invoice text. */
export const LABEL_KEYWORDS: PlatformKeyword[] = [
  { term: "ship to", weight: 3 },
  { term: "shipping address", weight: 3 },
  { term: "delivery address", weight: 3 },
  { term: "consignment", weight: 2 },
  { term: "air waybill", weight: 3 },
  { term: "awb", weight: 3 },
  { term: "tracking id", weight: 2 },
  { term: "tracking number", weight: 2 },
  { term: "order id", weight: 2 },
  { term: "order no", weight: 2 },
  { term: "order number", weight: 2 },
  { term: "placement date", weight: 2 },
  { term: "package", weight: 1 },
  { term: "courier", weight: 1 },
];

export const INVOICE_KEYWORDS: PlatformKeyword[] = [
  { term: "tax invoice", weight: 4 },
  { term: "invoice", weight: 2 },
  { term: "bill to", weight: 3 },
  { term: "billing address", weight: 3 },
  { term: "gstin", weight: 3 },
  { term: "hsn", weight: 2 },
  { term: "invoice no", weight: 3 },
  { term: "invoice number", weight: 3 },
  { term: "invoice date", weight: 2 },
  { term: "taxable value", weight: 3 },
  { term: "sgst", weight: 2 },
  { term: "cgst", weight: 2 },
  { term: "igst", weight: 2 },
  { term: "total amount", weight: 2 },
  { term: "amount payable", weight: 2 },
  { term: "product description", weight: 2 },
  { term: "quantity", weight: 1 },
  { term: "seller", weight: 1 },
];
