import type { ResumeInterface } from "@/types/ResumeTypes";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  formMethods: UseFormReturn<ResumeInterface>;
  activeBlock: string;
  fieldsByBlock: Record<string, readonly (keyof ResumeInterface)[]>;
  onSubmit: (data: ResumeInterface) => Promise<void> | void;
  debounceMs?: number;
  enabled?: boolean;
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

  const timerRef = useRef<number | null>(null);
  const lastSavedHashRef = useRef<string>("");

  const fields = fieldsByBlock[activeBlock] ?? [];

  useEffect(() => {
    if (!enabled) return;
    if (!fields.length) return;

    const subscription = formMethods.watch(() => {
      if (!formMethods.formState.isDirty) return;

      const values = formMethods.getValues(fields);

      const hash = JSON.stringify(values);
      if (hash === lastSavedHashRef.current) return;

      if (timerRef.current) window.clearTimeout(timerRef.current);

      timerRef.current = window.setTimeout(async () => {
        try {
          setStatus("saving");

          const ok = await formMethods.trigger(fields as any);
          if (!ok) {
            setStatus("idle");
            return;
          }

          const full = formMethods.getValues();

          await Promise.resolve(onSubmit(full));

          lastSavedHashRef.current = hash;
          setStatus("saved");

          formMethods.reset(formMethods.getValues(), { keepValues: true });

          window.setTimeout(() => setStatus("idle"), 1200);
        } catch (err: unknown) {
          setStatus("error");
          toast.error("Autosave failed");
        }
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, activeBlock, debounceMs]);

  return { autosaveStatus: status };
};
