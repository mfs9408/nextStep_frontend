import { UseFormReturn } from "react-hook-form";

export type Blocks =
  | "Profile"
  | "Summary"
  | "Professional experience"
  | "Education"
  | "Skills";

export type STATUS = "DRAFT" | "PUBLISHED" | "ARCHIVED";

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

  summary: {
    id?: string;
    content: string;
  };
  summaryBullets: {
    id?: string;
    content: string;
    order: number;
  }[];
}

export interface ResumeInterface extends ResumeFormInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommonSectionProps {
  formMethods: UseFormReturn<ResumeFormInterface>;
}
