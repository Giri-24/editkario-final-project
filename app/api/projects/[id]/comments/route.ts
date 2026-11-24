import { NextResponse } from "next/server";
import { addComment, toggleResolveComment } from "@/lib/store";

// POST /api/projects/[id]/comments - Dynamically post a frame-accurate comment pin
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const comment = addComment(id, body);
  if (!comment) {
    return NextResponse.json({ success: false, error: "Unable to add comment" }, { status: 400 });
  }

  return NextResponse.json({ success: true, comment }, { status: 201 });
}

// PATCH /api/projects/[id]/comments - Toggle comment resolution
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (!body.commentId) {
    return NextResponse.json({ success: false, error: "Missing commentId" }, { status: 400 });
  }

  const success = toggleResolveComment(id, body.commentId);
  return NextResponse.json({ success });
}
