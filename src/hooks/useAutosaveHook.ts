import { PROFILE_FIELDS, SUMMARY_FIELDS } from "@/views/CreateResumeView/const";
import type { ProfileSection } from "@/types/api/output/resume";
import { createSummary, updateSummary } from "@/api/summary";
import { ResumeFormInterface } from "@/types/ResumeTypes";
import { createResume, updateResume } from "@/api/resume";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { pickFormValues } from "@/lib/utils";
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

  const save = () => {
    isSavingRef.current = true;
    setStatus("saving");
  };

  const saveSuccess = () => {
    setStatus("saved");
    window.setTimeout(() => setStatus("idle"), 1200);
    isSavingRef.current = false;
  };

  async function routeSaveByField(
    name: string,
    formMethods: UseFormReturn<ResumeFormInterface>,
  ) {
    if (isSavingRef.current) return;

    try {
      if (!formMethods.getValues("id")) {
        const ok = await formMethods.trigger(PROFILE_FIELDS);
        if (!ok) return;

        const full = formMethods.getValues();

        save();

        const id = await createResume(full)
          .then((data) => {
            formMethods.setValue("id", data.id);

            return data.id;
          })
          .catch((err) => {
            toast.error(err.message);
          });

        if (!id) {
          saveSuccess();
          return;
        }

        await createSummary({ content: "", resumeId: id })
          .then((data) => {
            formMethods.setValue("summary.id", data.id);
          })
          .catch((err) => {
            toast.error(err.message);
          });

        return;
      }

      // if (name.startsWith("summaryBullets")) {
      //   const match = name.match(/^summaryBullets\.(\d+)\./);
      //   if (!match) return;
      //
      //   const index = Number(match[1]);
      //   const bullet = formMethods.getValues(`summaryBullets.${index}`);
      //
      //   const ok = await formMethods.trigger(name as never);
      //   if (!ok) return;
      //
      //   if (!bullet.id) {
      //     toast.error("Summary bullet point is not saved yet");
      //   } else {
      //     await resumeActions.summaryBullet.updateSummaryBullet(bullet);
      //   }
      // }

      if (name.startsWith("summary.content")) {
        const ok = await formMethods.trigger(SUMMARY_FIELDS);
        if (!ok) return;

        save();

        const fullSummary = formMethods.getValues("summary");

        await updateSummary(fullSummary).catch((err) => {
          toast.error(err.message);
        });

        return;
      }

      if (PROFILE_FIELDS.some((field) => name.startsWith(field))) {
        const ok = await formMethods.trigger(PROFILE_FIELDS);
        if (!ok) return;

        const profileValues = pickFormValues(
          formMethods,
          PROFILE_FIELDS,
        ) as ProfileSection;

        save();

        await updateResume(profileValues);

        return;
      }
    } catch (e) {
      setStatus("error");
      toast.error("Autosave failed");
      window.setTimeout(() => setStatus("idle"), 1500);
    } finally {
      saveSuccess();
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
