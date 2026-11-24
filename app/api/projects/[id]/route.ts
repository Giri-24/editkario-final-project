import { NextResponse } from "next/server";
import { getProjectById, updateProjectStatus } from "@/lib/store";

// GET /api/projects/[id] - Return single project with revisions and comments
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, project });
}

// PATCH /api/projects/[id] - Update status (e.g. approve revision)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (body.status) {
    const updated = updateProjectStatus(id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
  }

  const project = getProjectById(id);
  return NextResponse.json({ success: true, project });
}
