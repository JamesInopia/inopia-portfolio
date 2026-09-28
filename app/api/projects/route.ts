import { NextResponse } from "next/server";
import { readProjects } from "@/app/lib/projects";

export async function GET() {
  return NextResponse.json(await readProjects());
}