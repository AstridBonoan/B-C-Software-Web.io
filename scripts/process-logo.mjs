// Generates theme-aware variants of the B&C Software & Web logo.
//
// Reads `public/logo.png` (the source: dark "B" + blue-gradient "&C" mark +
// dark "SOFTWARE & WEB" wordmark on a solid white canvas) and writes:
//
//   - public/logo-dark.png  -> transparent bg + light wordmark/B   (use on dark UIs)
//   - public/logo-light.png -> transparent bg + dark wordmark/B    (use on light UIs)
//
// Saturated blue gradient pixels ("&C") are preserved in both variants.
//
// Run with: `node scripts/process-logo.mjs`

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'public', 'logo.png');
const lightOutPath = path.join(projectRoot, 'public', 'logo-light.png');
const darkOutPath = path.join(projectRoot, 'public', 'logo-dark.png');
const markLightOutPath = path.join(projectRoot, 'public', 'logo-mark-light.png');
const markDarkOutPath = path.join(projectRoot, 'public', 'logo-mark-dark.png');

// Near-white background: remove / fade to transparent.
const BG_LUMA_CUTOFF = 245;
const BG_LUMA_FADE_START = 220;
// Saturation below this = grayscale-ish (navy B + wordmark), not the blue &C.
const GRAYSCALE_SAT = 35;
// Dark variant remaps the navy mark/wordmark to near-white for dark pages.
const WORDMARK_DARK = { r: 248, g: 250, b: 252 };

const luma = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

const { data, info } = await sharp(sourcePath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

if (info.channels !== 4) {
  throw new Error(`Expected 4 channels (RGBA), got ${info.channels}`);
}

const lightBuf = Buffer.alloc(data.length);
const darkBuf = Buffer.alloc(data.length);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  const l = luma(r, g, b);
  const sat = Math.max(r, g, b) - Math.min(r, g, b);

  lightBuf[i] = r;
  lightBuf[i + 1] = g;
  lightBuf[i + 2] = b;
  lightBuf[i + 3] = a;
  darkBuf[i] = r;
  darkBuf[i + 1] = g;
  darkBuf[i + 2] = b;
  darkBuf[i + 3] = a;

  if (l >= BG_LUMA_CUTOFF) {
    lightBuf[i + 3] = 0;
    darkBuf[i + 3] = 0;
    continue;
  }

  if (l > BG_LUMA_FADE_START && sat < GRAYSCALE_SAT) {
    // Soft fade on anti-aliased white edges.
    const t = (BG_LUMA_CUTOFF - l) / (BG_LUMA_CUTOFF - BG_LUMA_FADE_START);
    const faded = Math.round(255 * t);
    lightBuf[i + 3] = Math.min(a, faded);
    darkBuf[i + 3] = Math.min(a, faded);
    continue;
  }

  if (sat < GRAYSCALE_SAT && l < BG_LUMA_FADE_START) {
    // Dark navy / gray mark + wordmark.
    // Light variant: keep as-is (already dark for white pages).
    // Dark variant: remap to near-white so it reads on dark UIs.
    darkBuf[i] = WORDMARK_DARK.r;
    darkBuf[i + 1] = WORDMARK_DARK.g;
    darkBuf[i + 2] = WORDMARK_DARK.b;
  }
  // Saturated blue (&C) preserved in both.
}

const baseInfo = {
  raw: { width: info.width, height: info.height, channels: 4 },
};

const trimOpts = { background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 };

await sharp(lightBuf, baseInfo)
  .trim(trimOpts)
  .png({ compressionLevel: 9 })
  .toFile(lightOutPath);
await sharp(darkBuf, baseInfo)
  .trim(trimOpts)
  .png({ compressionLevel: 9 })
  .toFile(darkOutPath);

// Find the first all-transparent row after the "B&C" mark (gap before wordmark).
function findGapAfterMark(buf, width, height) {
  let sawPixel = false;
  for (let y = 0; y < height; y++) {
    let rowHasPixel = false;
    for (let x = 0; x < width; x++) {
      if (buf[(y * width + x) * 4 + 3] > 0) {
        rowHasPixel = true;
        break;
      }
    }
    if (rowHasPixel) {
      sawPixel = true;
    } else if (sawPixel) {
      return y;
    }
  }
  return height;
}

const markCropHeight = Math.max(1, findGapAfterMark(lightBuf, info.width, info.height));

const lightPng = await sharp(lightBuf, baseInfo).png().toBuffer();
const darkPng = await sharp(darkBuf, baseInfo).png().toBuffer();

const lightMarkPng = await sharp(lightPng)
  .extract({ left: 0, top: 0, width: info.width, height: markCropHeight })
  .png()
  .toBuffer();
const darkMarkPng = await sharp(darkPng)
  .extract({ left: 0, top: 0, width: info.width, height: markCropHeight })
  .png()
  .toBuffer();

await sharp(lightMarkPng).trim(trimOpts).png({ compressionLevel: 9 }).toFile(markLightOutPath);
await sharp(darkMarkPng).trim(trimOpts).png({ compressionLevel: 9 }).toFile(markDarkOutPath);

console.log(`Wrote ${path.relative(projectRoot, lightOutPath)} (light, full lockup)`);
console.log(`Wrote ${path.relative(projectRoot, darkOutPath)} (dark, full lockup)`);
console.log(`Wrote ${path.relative(projectRoot, markLightOutPath)} (light, mark only)`);
console.log(`Wrote ${path.relative(projectRoot, markDarkOutPath)} (dark, mark only)`);
