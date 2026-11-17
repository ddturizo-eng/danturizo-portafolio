// Blur personal names in SICAP screenshots before they enter the media pipeline.
// Outputs go to reports/media/anon (ignored by Git); originals stay untouched.
// Usage: node scripts/anonymize-sicap.mjs
import sharp from "sharp";
import path from "node:path";
const root = process.cwd();
const src = (f) => path.join(root, "media/source/sicap", f);
async function blurRegions(input, regions, out, crop) {
  let base = sharp(input);
  const meta = await base.metadata();
  const overlays = [];
  for (const r of regions) {
    const buf = await sharp(input).extract(r).blur(28).toBuffer();
    overlays.push({ input: buf, left: r.left, top: r.top });
  }
  let img = sharp(input).composite(overlays);
  if (crop) img = sharp(await img.png().toBuffer()).extract(crop);
  await img.png().toFile(path.join(root, "reports/media/anon", out));
  console.log(out, meta.width, meta.height);
}
await blurRegions(
  src("Captura de pantalla 2026-11-17 084153.png"),
  [
    { left: 470, top: 140, width: 190, height: 90 },
    { left: 1580, top: 40, width: 250, height: 80 },
  ],
  "sicap-image-03-anon.png"
);
await blurRegions(
  src("Captura de pantalla 2026-11-17 084211.png"),
  [{ left: 1580, top: 40, width: 250, height: 80 }],
  "sicap-image-04-anon.png"
);
// Admin dashboard: keep header + KPI cards, drop the empty revenue row.
await blurRegions(
  src("Captura de pantalla 2026-11-17 083739.png"),
  [],
  "sicap-image-02-crop.png",
  { left: 0, top: 0, width: 1907, height: 810 }
);
