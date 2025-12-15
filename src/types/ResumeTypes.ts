import { UseFormReturn } from "react-hook-form";

export type Blocks =
  | "Profile"
  | "Summary"
  | "Professional experience"
  | "Education"
  | "Skills";

export type STATUS = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ResumeInterface {
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

export interface CommonSectionProps {
  formMethods: UseFormReturn<ResumeInterface>;
}
