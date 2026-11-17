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
await fs.mkdir(out, { recursive: false });
try {
  for (const [name, route] of [
    ["projects", "/projects"],
    ["averyn", "/projects/averyn"],
  ]) {
    const result = await lighthouse(`http://localhost:3000${route}`, {
      port: 9223,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    await fs.writeFile(`${out}/${name}.json`, result.report[0]);
    await fs.writeFile(`${out}/${name}.html`, result.report[1]);
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
