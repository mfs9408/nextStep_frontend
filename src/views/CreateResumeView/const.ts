import { Blocks } from "@/types/ResumeTypes";

export const BLOCKS: Blocks[] = [
  "Profile",
  "Summary",
  "Professional experience",
  "Education",
  "Skills",
];

export const PROFILE_FIELDS = [
  "resumeTitle",
  "note",
  "firstName",
  "lastName",
  "phone",
  "city",
  "contactEmail",
  "portfolioUrl",
  "linkedinUrl",
] as const;
