import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const args = process.argv.slice(2);
const option = (key, fallback) =>
  args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const runtime = path.resolve(option("--runtime", process.cwd()));
const require = createRequire(path.join(runtime, "package.json"));
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");
const base = option("--base", "http://localhost:3000");
const out = option("--out", "reports/visual/verified");
await fs.mkdir(out, { recursive: false });
const browser = await chromium.launch();
const slugs = [
  "averyn",
  "glow-makeup",
  "abis-upc",
  "roster",
  "norelo",
  "sicap",
  "hc-efectos",
];
const routes = ["/projects", ...slugs.map((s) => `/projects/${s}`)];
const results = [];
const failures = [];
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    for (const route of routes) {
      const errors = [];
      const videoRequests = [];
      const handler = (e) => errors.push(e.message);
      const requestHandler = (r) => {
        if (/\.mp4(?:\?|$)/.test(r.url())) videoRequests.push(r.url());
      };
      page.on("pageerror", handler);
      page.on("request", requestHandler);
      const response = await page.goto(`${base}${route}`, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth
        ),
        false,
        `Overflow: ${route}`
      );
      assert.equal(
        await page.locator("video").count(),
        0,
        "Videos must not mount before intent"
      );
      assert.equal(videoRequests.length, 0, "No video downloads before intent");
      const axes = await new AxeBuilder({ page })
        .include("#main-content")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (axes.violations.length)
        failures.push({
          route,
          viewport,
          axe: axes.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
      // Scroll through the whole route to exercise lazy images before a full-page capture.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(250);
      const broken = await page
        .locator("main img")
        .evaluateAll((images) =>
          images
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.alt)
        );
      assert.deepEqual(broken, [], `Broken images: ${route}`);
      await page.screenshot({
        path: path.join(
          out,
          `${route.split("/").filter(Boolean).join("-")}-${viewport.width}.png`
        ),
        fullPage: true,
      });
      const metadata = {
        title: await page.title(),
        canonical: await page
          .locator('link[rel="canonical"]')
          .getAttribute("href"),
        og: await page
          .locator('meta[property="og:image"]')
          .getAttribute("content"),
      };
      assert.ok(metadata.canonical.endsWith(route));
      assert.deepEqual(errors, []);
      results.push({
        route,
        viewport,
        axeViolations: axes.violations.length,
        overflow: false,
        videoRequests: 0,
        brokenImages: 0,
        metadata,
      });
      page.off("pageerror", handler);
      page.off("request", requestHandler);
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${base}/projects/averyn`, { waitUntil: "networkidle" });
  const trigger = page
    .getByRole("button", { name: "Ampliar:", exact: false })
    .first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.locator("dialog[open]").waitFor();
  const initial = await page
    .locator("dialog .lightbox-toolbar p")
    .textContent();
  await page.keyboard.press("ArrowRight");
  assert.notEqual(
    await page.locator("dialog .lightbox-toolbar p").textContent(),
    initial
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog[open]").count(), 0);
  assert.equal(
    await trigger.evaluate((e) => e === document.activeElement),
    true,
    "Dialog must restore focus"
  );
  assert.equal(
    await page
      .locator(".case-cover")
      .evaluate((e) => getComputedStyle(e).animationName),
    "none"
  );
  await page.getByRole("button", { name: "Reproducir:", exact: false }).click();
  await page.waitForFunction(
    () => document.querySelector("video")?.readyState >= 2,
    {},
    { timeout: 30000 }
  );
  assert.equal(await page.locator("video").getAttribute("controls"), "");
  const video = await page.locator("video").evaluate((e) => ({
    duration: e.duration,
    width: e.videoWidth,
    height: e.videoHeight,
  }));
  assert.ok(video.duration > 0 && video.duration < 23);
  await page.locator("video").evaluate((e) => e.pause());
  for (const route of [
    "/projects",
    "/projects/averyn",
    "/projects/glow-makeup",
    "/projects/roster",
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Cambiar a tema oscuro" }).click();
    await page.waitForTimeout(100);
    const axe = await new AxeBuilder({ page })
      .include("#main-content")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    if (axe.violations.length)
      failures.push({
        route,
        theme: "dark",
        axe: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
    await page.screenshot({
      path: path.join(
        out,
        `${route.split("/").filter(Boolean).join("-")}-dark.png`
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Cambiar a tema claro" }).click();
  }
  for (const route of ["/", "/about"]) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
  }
  const missing = await page.goto(`${base}/projects/not-a-project`);
  assert.equal(missing.status(), 404);
  // Force only remote optimized images to fail; local fallback must recover.
  await page.route("**/_next/image*", (route) =>
    decodeURIComponent(route.request().url()).includes("https://pub-")
      ? route.fulfill({ status: 502, body: "Simulated remote failure" })
      : route.continue()
  );
  await page.goto(`${base}/projects/averyn`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const image = document.querySelector(".case-cover img");
    return (
      image?.complete &&
      image.naturalWidth > 0 &&
      !decodeURIComponent(image.currentSrc).includes("https://pub-")
    );
  });
  await page.unroute("**/_next/image*");
  await context.close();
  await fs.writeFile(
    path.join(out, "results.json"),
    JSON.stringify(
      {
        results,
        interactionChecks: {
          keyboardGallery: true,
          focusRestored: true,
          video,
          missingRoute404: true,
          homeAbout200: true,
          remoteImageFallback: true,
        },
        failures,
      },
      null,
      2
    )
  );
  console.log(
    JSON.stringify({
      routes: routes.length,
      viewportRuns: results.length,
      failures: failures.length,
      interactions: "passed",
    })
  );
  assert.equal(
    failures.length,
    0,
    "Accessibility violations: see results.json"
  );
} finally {
  await browser.close();
}
