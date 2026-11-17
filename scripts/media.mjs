import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.resolve(
  root,
  process.env.MEDIA_SOURCE_ROOT || "media/source"
);
const reportRoot = path.join(root, "reports/media");
const slugs = [
  "abis-upc",
  "averyn",
  "glow-makeup",
  "hc-efectos",
  "norelo",
  "roster",
  "sicap",
];
const json = async (file, data) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
};
const read = async (file) => JSON.parse(await fs.readFile(file, "utf8"));
const hash = async (file) => {
  const h = createHash("sha256");
  for await (const chunk of createReadStream(file)) h.update(chunk);
  return h.digest("hex");
};
async function walk(dir) {
  const result = [];
  for (const entry of (await fs.readdir(dir, { withFileTypes: true })).sort(
    (a, b) => a.name.localeCompare(b.name)
  )) {
    if (entry.isSymbolicLink()) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(file)));
    else if (entry.isFile()) result.push(file);
  }
  return result;
}
function probe(file) {
  return JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_format", "-show_streams", "-of", "json", file],
      { encoding: "utf8", maxBuffer: 4e6 }
    )
  );
}
async function inventory() {
  const assets = [];
  const errors = [];
  const seen = new Map();
  const dirs = await fs.readdir(sourceRoot);
  for (const slug of slugs) {
    const folder = dirs.find((name) => name.toLowerCase() === slug);
    if (!folder) {
      errors.push({ project: slug, reason: "Source directory missing" });
      continue;
    }
    let imageIndex = 0,
      videoIndex = 0;
    for (const file of await walk(path.join(sourceRoot, folder))) {
      try {
        const ext = path.extname(file).toLowerCase();
        const type = /\.(png|jpe?g|webp|avif)$/.test(ext)
          ? "image"
          : /\.(mp4|mov|webm|mkv)$/.test(ext)
            ? "video"
            : "unsupported";
        if (type === "unsupported") {
          errors.push({
            file: path.relative(root, file),
            reason: "Unsupported format",
          });
          continue;
        }
        const sha256 = await hash(file);
        const id = `${slug}-${type}-${String(type === "image" ? ++imageIndex : ++videoIndex).padStart(2, "0")}`;
        const asset = {
          id,
          project: slug,
          type,
          source: path.relative(root, file).replaceAll("\\", "/"),
          bytes: (await fs.stat(file)).size,
          sha256,
          duplicateOf: seen.get(sha256) || null,
          privacy: "pending-review",
        };
        seen.set(sha256, id);
        if (type === "image") {
          const meta = await sharp(file).metadata();
          Object.assign(asset, {
            width: meta.width,
            height: meta.height,
            format: meta.format,
          });
        } else {
          const p = probe(file),
            v = p.streams.find((s) => s.codec_type === "video");
          Object.assign(asset, {
            width: v?.width,
            height: v?.height,
            duration: Number(p.format.duration),
            codec: v?.codec_name,
            audio: p.streams.some((s) => s.codec_type === "audio"),
          });
        }
        assets.push(asset);
      } catch (e) {
        errors.push({
          file: path.relative(root, file),
          reason: e.message.split("\n")[0],
        });
      }
    }
  }
  await json(path.join(reportRoot, "inventory.json"), {
    sourceRoot: path.relative(root, sourceRoot),
    assets,
    errors,
  });
  console.log(
    `Inventory: ${assets.length} assets, ${errors.length} errors, ${assets.filter((a) => a.duplicateOf).length} exact duplicates.`
  );
}
async function review() {
  const { assets } = await read(path.join(reportRoot, "inventory.json"));
  const frames = path.join(reportRoot, "frames");
  await fs.mkdir(frames, { recursive: true });
  const tiles = [];
  for (const asset of assets) {
    const file = path.resolve(root, asset.source);
    if (asset.type === "image") tiles.push({ id: asset.id, file });
    else
      for (const fraction of [0.15, 0.3, 0.5, 0.7, 0.85]) {
        const second = Math.round(asset.duration * fraction * 10) / 10;
        const id = `${asset.id}-t${second}`;
        const output = path.join(frames, `${id}.jpg`);
        execFileSync("ffmpeg", [
          "-hide_banner",
          "-loglevel",
          "error",
          "-y",
          "-ss",
          String(second),
          "-i",
          file,
          "-frames:v",
          "1",
          "-vf",
          "scale=960:-2",
          output,
        ]);
        tiles.push({ id, file: output, second, parent: asset.id });
      }
  }
  await json(
    path.join(reportRoot, "review-candidates.json"),
    tiles.map((t) => ({
      ...t,
      file: path.relative(root, t.file).replaceAll("\\", "/"),
    }))
  );
  for (let start = 0; start < tiles.length; start += 12) {
    const chunk = tiles.slice(start, start + 12);
    const w = 480,
      h = 300;
    const composites = [];
    for (let i = 0; i < chunk.length; i++) {
      const tile = chunk[i];
      const img = await sharp(tile.file)
        .resize(w, h - 30, { fit: "contain", background: "#e8e8e8" })
        .png()
        .toBuffer();
      const label = Buffer.from(
        `<svg width="480" height="30"><rect width="480" height="30" fill="white"/><text x="10" y="21" font-family="Arial" font-size="14">${tile.id}</text></svg>`
      );
      composites.push(
        { input: img, left: (i % 3) * w, top: Math.floor(i / 3) * h },
        { input: label, left: (i % 3) * w, top: Math.floor(i / 3) * h + h - 30 }
      );
    }
    await sharp({
      create: {
        width: w * 3,
        height: Math.ceil(chunk.length / 3) * h,
        channels: 3,
        background: "white",
      },
    })
      .composite(composites)
      .png()
      .toFile(path.join(reportRoot, `sheet-${start / 12 + 1}.png`));
  }
  console.log(
    `Review: ${tiles.length} candidates in ${Math.ceil(tiles.length / 12)} contact sheets.`
  );
}
async function prepare() {
  const { assets } = await read(path.join(reportRoot, "inventory.json"));
  const selections = await read(path.join(root, "media/selections.json"));
  const candidates = await read(
    path.join(reportRoot, "review-candidates.json")
  );
  const manifest = [];
  for (const selection of selections) {
    if (selection.privacy !== "approved") continue;
    const original = assets.find((a) => a.id === selection.id);
    const candidate = candidates.find((a) => a.id === selection.id);
    const parent = original || assets.find((a) => a.id === candidate?.parent);
    if (!parent) throw new Error(`Missing asset ${selection.id}`);
    const file = path.resolve(root, candidate?.file || parent.source);
    const isVideo = original?.type === "video";
    const basename = `${selection.name}-${(await hash(file)).slice(0, 12)}`;
    const type = isVideo ? "video" : "image";
    const key = `projects/${parent.project}/${type}/${basename}.${isVideo ? "mp4" : "webp"}`;
    const dest = path.join(root, "public", key);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    if (isVideo) {
      execFileSync(
        "ffmpeg",
        [
          "-hide_banner",
          "-loglevel",
          "error",
          "-y",
          "-i",
          file,
          "-t",
          String(selection.maxDuration || 60),
          "-vf",
          "scale=min(1280\\,iw):-2",
          "-c:v",
          "libx264",
          "-preset",
          "medium",
          "-crf",
          String(selection.crf || 25),
          "-pix_fmt",
          "yuv420p",
          "-movflags",
          "+faststart",
          "-an",
          dest,
        ],
        { timeout: 180000 }
      );
    } else {
      const input =
        candidate?.second !== undefined
          ? execFileSync(
              "ffmpeg",
              [
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                String(candidate.second),
                "-i",
                path.resolve(root, parent.source),
                "-frames:v",
                "1",
                "-f",
                "image2pipe",
                "-vcodec",
                "png",
                "pipe:1",
              ],
              { maxBuffer: 32e6 }
            )
          : file;
      await sharp(input)
        .rotate()
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(dest);
    }
    const digest = await hash(dest);
    const contentKey = key.replace(
      basename,
      `${selection.name}-${digest.slice(0, 12)}`
    );
    const contentFile = path.join(root, "public", contentKey);
    if (contentFile !== dest) {
      await fs.copyFile(dest, contentFile);
      await fs.unlink(dest);
    }
    const meta = isVideo
      ? probe(contentFile).streams.find((s) => s.codec_type === "video")
      : await sharp(contentFile).metadata();
    manifest.push({
      id: selection.id,
      project: parent.project,
      type,
      role: selection.role,
      title: selection.title,
      alt: selection.alt,
      local: `/${contentKey}`,
      key: contentKey,
      width: meta.width,
      height: meta.height,
      ...(isVideo
        ? { duration: Math.min(parent.duration, selection.maxDuration || 60) }
        : {}),
      bytes: (await fs.stat(contentFile)).size,
      sha256: digest,
      contentType: isVideo ? "video/mp4" : "image/webp",
      privacy: "approved",
      sourceId: parent.id,
      ...(candidate?.second !== undefined ? { second: candidate.second } : {}),
      ...(selection.poster ? { posterId: selection.poster } : {}),
    });
  }
  await json(path.join(root, "lib/generated/media.json"), manifest);
  await json(path.join(reportRoot, "preparation.json"), {
    prepared: manifest.length,
    bytes: manifest.reduce((sum, a) => sum + a.bytes, 0),
    notPublished: assets
      .filter((a) => !manifest.some((m) => m.sourceId === a.id))
      .map((a) => ({
        id: a.id,
        reason:
          "Not selected; privacy or editorial redundancy. See selections and evidence report.",
      })),
  });
  console.log(`Prepared ${manifest.length} assets. Sources preserved.`);
}
async function upload() {
  const assets = await read(path.join(root, "lib/generated/media.json"));
  const dryRun = process.argv.includes("--dry-run");
  const base = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (
    base &&
    (new URL(base).protocol !== "https:" || new URL(base).pathname !== "/")
  )
    throw new Error("R2_PUBLIC_BASE_URL must be an HTTPS origin");
  if (!dryRun)
    for (const name of [
      "R2_ACCOUNT_ID",
      "R2_BUCKET_NAME",
      "R2_ACCESS_KEY_ID",
      "R2_SECRET_ACCESS_KEY",
      "R2_PUBLIC_BASE_URL",
    ])
      if (!process.env[name]) throw new Error(`Missing ${name}`);
  const report = [];
  if (dryRun) {
    for (const a of assets)
      report.push({
        key: a.key,
        bytes: a.bytes,
        url: base ? `${base}/${a.key}` : null,
        status: "dry-run",
      });
  } else {
    const { S3Client, HeadObjectCommand } = await import("@aws-sdk/client-s3");
    const { Upload } = await import("@aws-sdk/lib-storage");
    const client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
      maxAttempts: 3,
    });
    for (const a of assets) {
      if (a.privacy !== "approved") throw new Error("Unreviewed asset");
      const file = path.join(root, "public", a.key);
      if ((await hash(file)) !== a.sha256)
        throw new Error(`Hash mismatch: ${a.key}`);
      let exists = false;
      try {
        const head = await client.send(
          new HeadObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: a.key,
          })
        );
        exists = head.Metadata?.sha256 === a.sha256;
      } catch (e) {
        if (e.$metadata?.httpStatusCode !== 404)
          throw new Error(
            `R2 metadata check failed (${e.$metadata?.httpStatusCode || "network"}): ${a.key}`
          );
      }
      if (!exists)
        await new Upload({
          client,
          params: {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: a.key,
            Body: createReadStream(file),
            ContentType: a.contentType,
            CacheControl: "public, max-age=31536000, immutable",
            Metadata: { sha256: a.sha256 },
          },
          queueSize: 2,
          partSize: 8 * 1024 * 1024,
          leavePartsOnError: false,
        }).done();
      const url = `${base}/${a.key}`;
      const response = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok)
        throw new Error(
          `Public asset unavailable (${response.status}): ${a.key}`
        );
      report.push({
        key: a.key,
        url,
        status: exists ? "unchanged" : "uploaded",
      });
    }
    client.destroy();
    // Publish URL mapping only after every object has passed public validation.
    await json(
      path.join(root, "lib/generated/media-urls.json"),
      Object.fromEntries(report.map((r) => [r.key, r.url]))
    );
  }
  await json(
    path.join(reportRoot, dryRun ? "dry-run.json" : "upload.json"),
    report
  );
  console.log(
    `${dryRun ? "Dry run" : "Upload"}: ${report.length} assets (${report.filter((r) => r.status === "unchanged").length} unchanged).`
  );
}
const command = process.argv[2];
try {
  if (command === "inventory") await inventory();
  else if (command === "review") await review();
  else if (command === "prepare") await prepare();
  else if (command === "upload") await upload();
  else
    throw new Error(
      "Usage: node scripts/media.mjs inventory|review|prepare|upload [--dry-run]"
    );
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
