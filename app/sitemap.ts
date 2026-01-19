import { MetadataRoute } from "next";
import { pagesCache } from "@/lib/pseo/pagesCache";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const slugs = pagesCache.getSlugsForBuild();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  for (const slug of slugs) {
    entries.push({
      url: `${baseUrl}/mortgage-payment/${slug}`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}

