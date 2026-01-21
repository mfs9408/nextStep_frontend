import { BulletPointOutput } from "@/types/api/output/resume";
import { UseFormReturn } from "react-hook-form";

export type Blocks =
  | "Profile"
  | "Summary"
  | "Professional experience"
  | "Education"
  | "Skills";

export type STATUS = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ProfileSection {
  id?: string;
  userId: string;
  note: string;
  resumeTitle: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  linkedinUrl: string;
  portfolioUrl: string;
  contactEmail: string;
  needsSponsorship: false;
  status: STATUS;
  isPublic: boolean;
}

export interface ResumeFormInterface {
  id?: string;
  userId: string;
  note: string;
  resumeTitle: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  linkedinUrl: string;
  portfolioUrl: string;
  contactEmail: string;
  needsSponsorship: false;
  status: STATUS;
  isPublic: boolean;

  summary: Summary;
  summaryBullets: BulletPoint[];
}

export interface ResumeInterface extends ResumeFormInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommonSectionProps {
  formMethods: UseFormReturn<ResumeFormInterface>;
  resumeActions: ResumeActions;
}

export interface Summary {
  id?: string;
  resumeId: string;
  content: string;
}

export type ResumeActions = {
  summaryBullet: {
    createSummaryBullet: (body: BulletPointOutput) => Promise<BulletPoint>;
    updateSummaryBullet: (body: BulletPoint) => Promise<BulletPoint>;
    deleteSummaryBullet: (id: string) => Promise<boolean>;
    reorderSummaryBullets: (body: {
      idsInOrder: string[];
      summaryId: string;
    }) => void;
  };
};

export type BulletPoint = {
  id: string;
  summaryId: string;
  source?: string;
  content: string;
  order: number;
};
