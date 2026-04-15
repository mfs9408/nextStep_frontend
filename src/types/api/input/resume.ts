import { BulletPoint, STATUS, Summary } from "@/types/ResumeTypes";

export interface ResumeInput {
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

  summary: SummaryInput;
}

type SummaryInput = {
  bullets: BulletPoint[];
} & Summary;
