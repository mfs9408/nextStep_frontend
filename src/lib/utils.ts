import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ResumeFormInterface } from "@/types/ResumeTypes";
import { ResumeInput } from "@/types/api/input/resume";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export function pickFormValues<
  TFieldValues extends FieldValues,
  const K extends readonly Path<TFieldValues>[],
>(form: UseFormReturn<TFieldValues>, keys: K): Pick<TFieldValues, K[number]> {
  const out = {} as Pick<TFieldValues, K[number]>;

  for (const key of keys) {
    out[key as K[number]] = form.getValues(key);
  }

  return out;
}

export function resumeFormToInput(form: ResumeInput): ResumeFormInterface {
  const { summary, ...rest } = form;

  return {
    ...rest,
    summary,
    summaryBullets: summary?.bullets || [],
  };
}
