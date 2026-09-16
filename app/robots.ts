import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/routes";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/client", "/auth", "/reset-password"],
    },
    sitemap: SITE_URL + "/sitemap.xml",
  };
}
