import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL || "https://guido-paris.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString();
  return [
    {
      url: `${siteUrl}/it`,
      lastModified: lastmod,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/en`,
      lastModified: lastmod,
      changeFrequency: "monthly",
      priority: 0.9
    }
  ];
}

