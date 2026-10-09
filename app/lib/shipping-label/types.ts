export type PlatformId =
  | "auto"
  | "meesho"
  | "amazon"
  | "flipkart"
  | "myntra"
  | "snapdeal"
  | "ajio"
  | "jiomart"
  | "shopify"
  | "shiprocket"
  | "delhivery"
  | "custom";

export type RegionKind = "label" | "invoice" | "full";

export type DetectionConfidence = "high" | "medium" | "low";

/** Rectangle in normalized (0..1) displayed-page coordinates, top-left origin. */
export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PageRegion = {
  kind: RegionKind;
  rect: Rect;
  confidence: DetectionConfidence;
  source: "auto" | "manual";
};

export type PageAnalysis = {
  /** 1-based page number in the source PDF. */
  pageNumber: number;
  /** Displayed page size in PDF points (rotation applied). */
  displayWidthPt: number;
  displayHeightPt: number;
  /** /Rotate value normalized to 0, 90, 180 or 270. */
  rotation: 0 | 90 | 180 | 270;
  regions: PageRegion[];
  reviewRequired: boolean;
  accepted: boolean;
  thumbUrl: string;
};

export type FileAnalysisStatus = "analyzing" | "ready" | "error";

export type FileAnalysis = {
  id: string;
  file: File;
  status: FileAnalysisStatus;
  error: string;
  pages: PageAnalysis[];
  detectedPlatform: PlatformId;
  platformConfidence: number;
  platformScores: Partial<Record<PlatformId, number>>;
};

export type OutputMode = "label" | "invoice" | "both";

export type OutputSizeId =
  | "4x6"
  | "100x150"
  | "3x5"
  | "4x4"
  | "a4"
  | "custom";

export type SizeUnit = "mm" | "in";

export type OutputSizeState = {
  sizeId: OutputSizeId;
  customWidth: number;
  customHeight: number;
  customUnit: SizeUnit;
};

export type ResolvedOutputSize = {
  widthPt: number;
  heightPt: number;
};

export type OutputFileResult = {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  pageCount: number;
};
