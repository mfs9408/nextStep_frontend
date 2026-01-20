import { Blocks, ProfileSection } from "@/types/ResumeTypes";

export const BLOCKS: Blocks[] = [
  "Profile",
  "Summary",
  "Professional experience",
  "Education",
  "Skills",
];

export type ProfileField = keyof ProfileSection;
export const PROFILE_FIELDS = [
  "id",
  "resumeTitle",
  "note",
  "firstName",
  "lastName",
  "phone",
  "city",
  "contactEmail",
  "portfolioUrl",
  "linkedinUrl",
  "needsSponsorship",
  "status",
] as const satisfies readonly ProfileField[];

export const SUMMARY_FIELDS = ["summary", "summary.content"] as const;

export const SUMMARY_BULLETS = [""];
