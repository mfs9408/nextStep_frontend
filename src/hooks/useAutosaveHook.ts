import {
  createResume,
  updateEducation,
  updateProfessionalExperience,
  updateProfile,
  updateSkills,
  updateSummary,
} from "@/api/resume";
import type { Blocks, ResumeInterface } from "@/types/ResumeTypes";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  formMethods: UseFormReturn<ResumeInterface>;
  activeBlock: Blocks;
  fieldsByBlock: Record<string, readonly (keyof ResumeInterface)[]>;
  onSubmit: (data: ResumeInterface) => Promise<void> | void;
  debounceMs?: number;
  enabled?: boolean;
};

function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]) {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}

const saveByBlock: Record<
  Blocks,
  (id: string, payload: Partial<ResumeInterface>) => Promise<void>
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
