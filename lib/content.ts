import fs from "node:fs";
import path from "node:path";
import type { CreativeTag } from "@/lib/tags";

export type Project = {
  slug: string;
  title: string;
  year: string;
  date?: string;
  image?: string;
  category: string;
  tags: CreativeTag[];
  summary: string;
  featured: boolean;
  accent: "world" | "stage" | "object";
  body: string;
};

export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: CreativeTag[];
  body: string;
};

export type PhotoStory = {
  slug: string;
  title: string;
  year: string;
  date?: string;
  category: string;
  tags: CreativeTag[];
  location: string;
  description: string;
  story?: string;
  instagram?: string;
  featured?: boolean;
  image?: string;
  alt: string;
  images?: {
    image: string;
    alt: string;
    caption?: string;
  }[];
};

function readCollection<T>(directory: string): T[] {
  const location = path.join(process.cwd(), "content", directory);
  return fs
    .readdirSync(location)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(location, file), "utf8")) as T);
}

export function getProjects() {
  return readCollection<Project>("projects").sort((a, b) => Number(b.year) - Number(a.year));
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export function getPosts() {
  return readCollection<JournalPost>("journal").sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function getPhotography() {
  return readCollection<PhotoStory>("photography").sort(
    (a, b) => Number(b.year) - Number(a.year),
  );
}

export function getPhotoStory(slug: string) {
  return getPhotography().find((photo) => photo.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}
