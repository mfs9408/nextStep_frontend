import { PROFILE_FIELDS, SUMMARY_FIELDS } from "@/views/CreateResumeView/const";
import type { ProfileSection } from "@/types/api/output/resume";
import type { ResumeFormInterface } from "@/types/ResumeTypes";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { pickFormValues } from "@/lib/utils";
import { updateResume } from "@/api/resume";
import { toast } from "sonner";

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  formMethods: UseFormReturn<ResumeFormInterface>;
  debounceMs?: number;
  enabled?: boolean;
};

export const useAutosaveResumeBlock = ({
  formMethods,
  debounceMs = 500,
  enabled = true,
}: Props) => {
  const [status, setStatus] = useState<AutosaveStatus>("idle");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef(false);

  async function routeSaveByField(
    name: string,
    formMethods: UseFormReturn<ResumeFormInterface>,
  ) {
    if (isSavingRef.current) return;

    try {
      if (name.startsWith("summaryBullets")) {
        return;
      }

      if (name.startsWith("summary.content")) {
        const ok = await formMethods.trigger(SUMMARY_FIELDS);
        if (!ok) return;

        // saveSummary(formMethods);
        return;
      }

      if (PROFILE_FIELDS.some((field) => name.startsWith(field))) {
        const ok = await formMethods.trigger(PROFILE_FIELDS);
        if (!ok) return;

        const profileValues = pickFormValues(
          formMethods,
          PROFILE_FIELDS,
        ) as ProfileSection;

        isSavingRef.current = true;
        setStatus("saving");

        await updateResume(profileValues);

        setStatus("saved");
        window.setTimeout(() => setStatus("idle"), 1200);
        return;
      }
    } catch (e) {
      setStatus("error");
      toast.error("Autosave failed");
      window.setTimeout(() => setStatus("idle"), 1500);
    } finally {
      isSavingRef.current = false;
    }
  }

  useEffect(() => {
    if (!enabled) return;

    const subscription = formMethods.watch((_, { name }) => {
      if (!name) return;

      const { isDirty } = formMethods.getFieldState(name);
      if (!isDirty) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        routeSaveByField(name, formMethods);
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, formMethods, debounceMs]);

  return { autosaveStatus: status };
};
