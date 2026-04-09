import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import settings from "../data/settings.json";
import { entrySlug, sortArticles } from "../utils/helpers";

export async function GET(context: APIContext) {
  const articles = sortArticles(await getCollection("articles"));
  const site = context.site ?? new URL(process.env.SITE_URL ?? "https://kullanici.github.io");

  return rss({
    title: settings.siteTitle,
    description: settings.siteDescription,
    site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/makaleler/${entrySlug(article.id)}/`
    })),
    customData: "<language>tr-tr</language>"
  });
}
