import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export type Project = {
  slug: string;
  title: string;
  year: number;
  image: string;
  description: string;
  repo: string;
};
export type Stats = { total: number; newest: number; oldest: number };

const columns = {
  slug: projects.slug,
  title: projects.title,
  year: projects.year,
  image: projects.image,
  description: projects.description,
  repo: projects.repo,
};

export async function readProjects(): Promise<Project[]> {
  return db.select(columns).from(projects).orderBy(desc(projects.createdAt));
}

export async function readProject(slug: string): Promise<Project | null> {
  const [row] = await db.select(columns).from(projects).where(eq(projects.slug, slug));
  return row ?? null;
}

export async function readStats(): Promise<Stats> {
  const years = (await db.select({ year: projects.year }).from(projects)).map((p) => p.year);
  return {
    total: years.length,
    newest: years.length ? Math.max(...years) : 0,
    oldest: years.length ? Math.min(...years) : 0,
  };
}

export const getProjects = readProjects;
export const getProject = readProject;
export const getStats = readStats;