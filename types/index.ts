export type UserRole = "ADMIN" | "PROJECT_MANAGER" | "EDITOR" | "CLIENT";

export type ProjectStatus =
  | "BRIEFING"
  | "IN_PROGRESS"
  | "CLIENT_REVIEW"
  | "REVISION_REQUESTED"
  | "APPROVED"
  | "COMPLETED";

export type DeliverableFormat = "9:16_VERTICAL" | "16:9_CINEMATIC" | "1:1_SQUARE";

export interface CommentPin {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: "CLIENT" | "EDITOR" | "ADMIN";
  timestampSeconds: number;
  frameNumber: number;
  content: string;
  coords?: { x: number; y: number }; // Percentage 0-100 on video frame
  isResolved: boolean;
  createdAt: string;
}

export interface VideoRevision {
  id: string;
  versionNumber: number;
  videoUrl: string;
  thumbnailUrl: string;
  durationSeconds: number;
  notes: string;
  uploadedAt: string;
  status: "IN_REVIEW" | "APPROVED" | "REVISIONS_NEEDED";
  comments: CommentPin[];
}

export interface AgencyProject {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string;
  clientAvatar: string;
  category: "Short-Form Reels" | "YouTube Long-Form" | "Commercial Ads" | "VFX & Color";
  assignedEditor: {
    name: string;
    avatar: string;
  };
  deadline: string;
  progressPercent: number;
  status: ProjectStatus;
  budget: number;
  revisions: VideoRevision[];
}

export interface PortfolioShowcase {
  id: string;
  title: string;
  creatorOrBrand: string;
  category: "Short-Form Reels" | "YouTube Long-Form" | "Commercial Ads" | "Color Grading";
  aspectRatio: DeliverableFormat;
  viewsMetric: string;
  retentionMetric: string;
  thumbnailUrl: string;
  previewVideoUrl: string;
  description: string;
  tags: string[];
}

export interface CalculatorState {
  category: "short_form" | "youtube" | "commercial" | "retainer";
  quantity: number;
  turnaround: "standard_48h" | "rush_24h";
  addOns: {
    motionGraphics3D: boolean;
    thumbnailDesign: boolean;
    soundDesignMaster: boolean;
    hookVariations: boolean;
  };
}
