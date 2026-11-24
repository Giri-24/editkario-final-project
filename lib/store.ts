import { AgencyProject, CommentPin, ProjectStatus } from "@/types";
import { MOCK_PIPELINE_PROJECTS } from "@/data/mockData";

// In-memory persistent store across dynamic API routes
let projectsStore: AgencyProject[] = [...MOCK_PIPELINE_PROJECTS];

export function getAllProjects(): AgencyProject[] {
  return projectsStore;
}

export function getProjectById(id: string): AgencyProject | undefined {
  return projectsStore.find((p) => p.id === id);
}

export function createNewProject(params: {
  title: string;
  clientName: string;
  clientCompany: string;
  category: "Short-Form Reels" | "YouTube Long-Form" | "Commercial Ads" | "VFX & Color";
  budget: number;
  quantity: number;
  isRush: boolean;
}): AgencyProject {
  const newId = `proj-${Date.now().toString().slice(-4)}`;
  const newProject: AgencyProject = {
    id: newId,
    title: params.title || "Custom Video Production Scope",
    clientName: params.clientName || "Valued Client",
    clientCompany: params.clientCompany || "Creative Brand",
    clientAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    category: params.category,
    assignedEditor: {
      name: "Marcus Vance (Lead Editor)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    deadline: params.isRush ? "Within 24 Hours" : "Standard 48 Hours",
    progressPercent: 10,
    status: "BRIEFING",
    budget: params.budget,
    revisions: [
      {
        id: `rev-${Date.now()}`,
        versionNumber: 1,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42848-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        durationSeconds: 32.5,
        notes: "Initial cut uploaded to dynamic review environment.",
        uploadedAt: "Just now",
        status: "IN_REVIEW",
        comments: [],
      },
    ],
  };

  projectsStore = [newProject, ...projectsStore];
  return newProject;
}

export function addComment(
  projectId: string,
  commentData: {
    authorName: string;
    content: string;
    timestampSeconds: number;
    coords?: { x: number; y: number };
  }
): CommentPin | null {
  const project = getProjectById(projectId);
  if (!project || project.revisions.length === 0) return null;

  const currentRev = project.revisions[0];
  const newComment: CommentPin = {
    id: `c-${Date.now()}`,
    authorName: commentData.authorName || "Client",
    authorAvatar: project.clientAvatar,
    authorRole: "CLIENT",
    timestampSeconds: commentData.timestampSeconds,
    frameNumber: Math.round(commentData.timestampSeconds * 30),
    content: commentData.content,
    coords: commentData.coords || { x: 50, y: 50 },
    isResolved: false,
    createdAt: "Just now",
  };

  currentRev.comments = [...currentRev.comments, newComment];
  return newComment;
}

export function toggleResolveComment(projectId: string, commentId: string): boolean {
  const project = getProjectById(projectId);
  if (!project) return false;

  for (const rev of project.revisions) {
    const comment = rev.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.isResolved = !comment.isResolved;
      return true;
    }
  }
  return false;
}

export function updateProjectStatus(projectId: string, status: ProjectStatus): boolean {
  const project = getProjectById(projectId);
  if (!project) return false;
  project.status = status;
  if (status === "APPROVED") {
    project.progressPercent = 100;
  }
  return true;
}
