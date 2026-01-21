import { BulletPoint, STATUS } from "@/types/ResumeTypes";

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

export type BulletPointOutput = Omit<BulletPoint, "id"> & {
  id?: string;
};
