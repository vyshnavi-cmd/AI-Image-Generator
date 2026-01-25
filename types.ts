export interface GenerationSettings {
  prompt: string;
  style: string;
  aspectRatio: string;
}

export type AspectRatioOption = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export const ART_STYLES = [
  "Photorealistic",
  "Anime",
  "Cinematic",
  "Surreal",
  "Watercolor",
  "Moebius",
  "Hyper-realistic",
  "Cyberpunk",
  "Oil Painting",
  "3D Render",
  "Sketch",
  "Pop Art"
];

// Note: 4:5 and 3:2 are not natively supported by the API config, so we map to the closest supported or restrict options.
// Supported: "1:1", "3:4", "4:3", "9:16", "16:9"
export const ASPECT_RATIOS: { label: string; value: AspectRatioOption }[] = [
  { label: "Square (1:1)", value: "1:1" },
  { label: "Widescreen (16:9)", value: "16:9" },
  { label: "Portrait (9:16)", value: "9:16" },
  { label: "Landscape (4:3)", value: "4:3" },
  { label: "Tall Portrait (3:4)", value: "3:4" },
];
