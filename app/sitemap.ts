import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    ...[
      "/projects",
      "/about",
      ...projects.map((project) => `/projects/${project.slug}`),
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
