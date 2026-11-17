import media from "@/lib/generated/media.json";
import publishedUrls from "@/lib/generated/media-urls.json";

export type MediaAsset = {
  id: string;
  project: string;
  type: string;
  role: string;
  title: string;
  alt: string;
  local: string;
  key: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
  duration?: number;
  posterId?: string;
};

export const assets: MediaAsset[] = media;
const urls: Record<string, string> = publishedUrls;

export function assetUrl(asset: MediaAsset): string {
  const base = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "");
  const published = urls[asset.key];
  return base && published?.startsWith(`${base}/`) ? published : asset.local;
}

export function projectAssets(slug: string): MediaAsset[] {
  return assets.filter((asset) => asset.project === slug);
}

export function projectCover(slug: string): MediaAsset {
  const cover = assets.find(
    (asset) => asset.project === slug && asset.role === "cover"
  );
  if (!cover) throw new Error(`Missing project cover: ${slug}`);
  return cover;
}
