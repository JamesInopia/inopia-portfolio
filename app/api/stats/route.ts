import { NextResponse } from "next/server";
import { readStats } from "@/app/lib/projects";

export async function GET() {
  return NextResponse.json(await readStats());
}