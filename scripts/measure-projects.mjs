import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
const runtime = path.resolve(process.argv[2] || ".");
const require = createRequire(path.join(runtime, "package.json"));
const { chromium } = require("playwright");
const { default: lighthouse } = await import(
  pathToFileURL(require.resolve("lighthouse")).href
);
const browser = await chromium.launch({
  headless: true,
  args: ["--remote-debugging-port=9223"],
});
const summaries = [];
const out = process.argv[3] || "reports/performance";
// BASE_URL picks the production server to audit (run `npm run start` first).
const base = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const routes = [
  ["home", "/"],
  ["projects", "/projects"],
  ["averyn", "/projects/averyn"],
  ["sicap", "/projects/sicap"],
  ["about", "/about"],
].filter(([name]) => !process.env.ROUTES || process.env.ROUTES.split(",").includes(name));
await fs.mkdir(out, { recursive: false });
try {
  // FORM_FACTORS=mobile,desktop (default both). Desktop uses Lighthouse's
  // desktop preset: no CPU throttling, 1350x940 screen.
  const factors = (process.env.FORM_FACTORS || "mobile,desktop").split(",");
  const desktop = {
    formFactor: "desktop",
    screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
  };
  for (const factor of factors)
  for (const [name, route] of routes) {
    // RUNS=n audits each page n times and keeps the median performance run,
    // as Lighthouse recommends for noisy local machines.
    const runs = [];
    for (let i = 0; i < Number(process.env.RUNS || 1); i++) {
      runs.push(
        await lighthouse(
          `${base}${route}`,
          {
            port: 9223,
            output: ["json", "html"],
            logLevel: "error",
            onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
          },
          factor === "desktop"
            ? { extends: "lighthouse:default", settings: desktop }
            : undefined
        )
      );
    }
    runs.sort((a, b) => a.lhr.categories.performance.score - b.lhr.categories.performance.score);
    const result = runs[Math.floor(runs.length / 2)];
    await fs.writeFile(`${out}/${name}-${factor}.json`, result.report[0]);
    await fs.writeFile(`${out}/${name}-${factor}.html`, result.report[1]);
    summaries.push({
      route,
      formFactor: result.lhr.configSettings.formFactor,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ])
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
          "speed-index",
        ].map((k) => [
          k,
          {
            value: result.lhr.audits[k].numericValue,
            display: result.lhr.audits[k].displayValue,
          },
        ])
      ),
    });
  }
  await fs.writeFile(`${out}/summary.json`, JSON.stringify(summaries, null, 2));
  console.log(JSON.stringify(summaries));
} finally {
  await browser.close();
}
