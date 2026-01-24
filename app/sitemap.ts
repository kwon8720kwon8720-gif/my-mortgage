import { MetadataRoute } from "next";
import { STATES, CREDIT_TIERS, POST_COUNT } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  
  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      priority: 1.0,
    },
  ];
  
  // Generate exactly POST_COUNT pSEO pages
  let count = 0;
  for (const state of STATES) {
    if (count >= POST_COUNT) break;
    for (const tier of CREDIT_TIERS) {
      if (count >= POST_COUNT) break;
      urls.push({
        url: `${baseUrl}/mortgage-rates/${state.slug}/${tier}`,
        priority: 0.8,
      });
      count++;
    }
  }
  
  return urls;
}
