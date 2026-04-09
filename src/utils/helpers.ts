import type { CollectionEntry } from "astro:content";

type ArticleEntry = CollectionEntry<"articles">;

const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

export const BASE_URL = import.meta.env.BASE_URL ?? "/";

export function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function withBase(path = "/") {
  if (!path) return BASE_URL;
  if (ABSOLUTE_URL_PATTERN.test(path) || path.startsWith("#") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }

  const normalizedBase = BASE_URL === "/" ? "" : BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}` || "/";
}

export function absoluteUrl(path: string, site?: string | URL) {
  if (!site) return withBase(path);
  return new URL(withBase(path), site).toString();
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/>\s?/g, "")
    .replace(/[*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, length = 140) {
  if (text.length <= length) return text;
  return `${text.slice(0, Math.max(0, length - 1)).trimEnd()}…`;
}

export function calculateReadingTime(content = "", wordsPerMinute = 220) {
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatReadingTime(content = "") {
  return `${calculateReadingTime(content)} dk okuma`;
}

export function entrySlug(id: string) {
  return id.replace(/\.(md|mdx)$/i, "").replace(/\/index$/i, "");
}

export function sortArticles(articles: ArticleEntry[]) {
  return [...articles].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function groupByCount(values: string[]) {
  return [...new Set(values)]
    .map((value) => ({
      value,
      slug: slugify(value),
      count: values.filter((item) => item === value).length
    }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value, "tr"));
}

export function getRelatedArticles(articles: ArticleEntry[], currentSlug: string, category: string, limit = 3) {
  return sortArticles(
    articles.filter((entry) => entrySlug(entry.id) !== currentSlug && entry.data.category === category)
  ).slice(0, limit);
}

export function getAdjacentArticles(articles: ArticleEntry[], currentSlug: string) {
  const sorted = sortArticles(articles);
  const index = sorted.findIndex((entry) => entrySlug(entry.id) === currentSlug);

  return {
    newer: index > 0 ? sorted[index - 1] : undefined,
    older: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : undefined
  };
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("tr-TR"))
    .join("");
}

export function sortByOrder<T extends { data: { order?: number } }>(items: T[]) {
  return [...items].sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}
