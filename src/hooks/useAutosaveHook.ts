import {
  createResume,
  updateEducation,
  updateProfessionalExperience,
  updateProfile,
  updateSkills,
  updateSummary,
} from "@/api/resume";
import type { Blocks, ResumeFormInterface } from "@/types/ResumeTypes";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  formMethods: UseFormReturn<ResumeFormInterface>;
  activeBlock: Blocks;
  fieldsByBlock: Record<string, readonly (keyof ResumeFormInterface)[]>;
  onSubmit: (data: ResumeFormInterface) => Promise<void> | void;
  debounceMs?: number;
  enabled?: boolean;
};

const saveByBlock: Record<
  Blocks,
  (id: string, payload: Partial<ResumeFormInterface>) => Promise<void>
> = {
  Profile: (id, payload) => updateProfile(id, payload),
  Summary: (id, payload) => updateSummary(id, payload),
  "Professional experience": (id, payload) =>
    updateProfessionalExperience(id, payload),
  Skills: (id, payload) => updateSkills(id, payload),
  Education: (id, payload) => updateEducation(id, payload),
};

export const useAutosaveResumeBlock = ({
  formMethods,
  activeBlock,
  fieldsByBlock,
  onSubmit,
  debounceMs = 900,
  enabled = true,
}: Props) => {
  const [status, setStatus] = useState<AutosaveStatus>("idle");



  return { autosaveStatus: status };
};
