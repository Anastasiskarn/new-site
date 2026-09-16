import type { MetadataRoute } from "next";
import { indexableRoutes, SITE_URL, pathFor } from "../lib/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map(({ lang, slug, path }) => ({
    url: SITE_URL + path,
    alternates: {
      languages: {
        en: SITE_URL + pathFor("en", slug),
        el: SITE_URL + pathFor("gr", slug),
        "x-default": SITE_URL + pathFor("gr", slug),
      },
    },
  }));
}
