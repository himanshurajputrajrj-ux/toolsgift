import type {
  OutputSizeId,
  OutputSizeState,
  ResolvedOutputSize,
  SizeUnit,
} from "./types";

export const PT_PER_INCH = 72;
export const PT_PER_MM = 72 / 25.4;

export const MIN_CUSTOM_MM = 10;
export const MAX_CUSTOM_MM = 1000;

export const DEFAULT_MARGIN_PT = 10;

export type SizePreset = {
  id: OutputSizeId;
  widthPt: number;
  heightPt: number;
};

export const OUTPUT_SIZE_PRESETS: SizePreset[] = [
  { id: "4x6", widthPt: 4 * PT_PER_INCH, heightPt: 6 * PT_PER_INCH },
  {
    id: "100x150",
    widthPt: 100 * PT_PER_MM,
    heightPt: 150 * PT_PER_MM,
  },
  { id: "3x5", widthPt: 3 * PT_PER_INCH, heightPt: 5 * PT_PER_INCH },
  { id: "4x4", widthPt: 4 * PT_PER_INCH, heightPt: 4 * PT_PER_INCH },
  { id: "a4", widthPt: 210 * PT_PER_MM, heightPt: 297 * PT_PER_MM },
];

export function unitToPt(value: number, unit: SizeUnit): number {
  return unit === "in" ? value * PT_PER_INCH : value * PT_PER_MM;
}

export function isValidCustomSize(
  width: number,
  height: number,
  unit: SizeUnit
): boolean {
  const toMm = unit === "in" ? 25.4 : 1;
  const wMm = width * toMm;
  const hMm = height * toMm;
  return (
    Number.isFinite(wMm) &&
    Number.isFinite(hMm) &&
    wMm >= MIN_CUSTOM_MM &&
    hMm >= MIN_CUSTOM_MM &&
    wMm <= MAX_CUSTOM_MM &&
    hMm <= MAX_CUSTOM_MM
  );
}

/** Resolve the selected output size to exact physical PDF dimensions in points. */
export function resolveOutputSize(
  state: OutputSizeState
): ResolvedOutputSize | null {
  if (state.sizeId === "custom") {
    if (
      !isValidCustomSize(
        state.customWidth,
        state.customHeight,
        state.customUnit
      )
    ) {
      return null;
    }
    return {
      widthPt: unitToPt(state.customWidth, state.customUnit),
      heightPt: unitToPt(state.customHeight, state.customUnit),
    };
  }

  const preset = OUTPUT_SIZE_PRESETS.find((p) => p.id === state.sizeId);
  if (!preset) return null;
  return { widthPt: preset.widthPt, heightPt: preset.heightPt };
}

/** Human-readable size label in millimeters for tests and UI hints. */
export function sizeInMm(size: ResolvedOutputSize): {
  widthMm: number;
  heightMm: number;
} {
  return {
    widthMm: size.widthPt / PT_PER_MM,
    heightMm: size.heightPt / PT_PER_MM,
  };
}
