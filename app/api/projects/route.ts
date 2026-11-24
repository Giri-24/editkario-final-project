import { NextResponse } from "next/server";
import { getAllProjects, createNewProject } from "@/lib/store";

// GET /api/projects - Return all active agency projects
export async function GET() {
  const projects = getAllProjects();
  return NextResponse.json({ success: true, projects });
}

// POST /api/projects - Dynamically create new project from scope calculator
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProject = createNewProject(body);
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 400 }
    );
  }
}
