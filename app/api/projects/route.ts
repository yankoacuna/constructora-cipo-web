import { NextResponse } from "next/server";
import { getProjects } from "@/lib/getProjects";

export const runtime = 'edge';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects || []);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}
