// Renders the WebGL shader surfaces once and saves them as static images, so
// the site ships the look without running a shader every frame.
// Usage: node scripts/capture-shaders.mjs <playwright-runtime> <baseUrl>
// The site no longer mounts the shaders: render components/shaders/shader-flow.tsx
// on a page at <baseUrl> (canvas only) before capturing.
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const runtime = path.resolve(process.argv[2] || ".");
const base = (process.argv[3] || "http://localhost:3000").replace(/\/$/, "");
const require = createRequire(path.join(runtime, "package.json"));
const { chromium } = require("playwright");

const browser = await chromium.launch({ headless: true, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
  for (const theme of ["dark", "light"]) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1, colorScheme: theme });
    await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(4000);
    // Backdrop: hide everything except the shader canvas.
    await page.addStyleTag({
      content:
        "*{visibility:hidden!important} canvas{visibility:visible!important} main canvas{visibility:hidden!important} .site-frame,.site-corner{display:none!important}",
    });
    await page.waitForTimeout(300);
    const backdrop = await page.screenshot({ clip: { x: 0, y: 0, width: 1600, height: 900 } });
    await sharp(backdrop).avif({ quality: 55 }).toFile(`public/img/backdrop-${theme}.avif`);
    console.log(theme, "ok");
    await page.close();
  }
} finally {
  await browser.close();
}
