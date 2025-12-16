import { BLOCKS } from "@/views/CreateResumeView/const";
import { SetStateActionType } from "@/types/general";
import { Blocks } from "@/types/ResumeTypes";
import { cn } from "@/lib/utils";
import React from "react";

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

interface ResumeLeftSideProps {
  activeBlock: Blocks;
  setActiveBlock: SetStateActionType<Blocks>;
  autosaveStatus: AutosaveStatus;
}

const statusConfig: Record<
  AutosaveStatus,
  { label: string; dotClass: string; pillClass: string }
> = {
  idle: { label: "", dotClass: "bg-muted", pillClass: "border-transparent" },
  saving: {
    label: "Saving…",
    dotClass: "bg-primary",
    pillClass: "border-primary/30 bg-primary/10 text-primary",
  },
  saved: {
    label: "Saved",
    dotClass: "bg-emerald-500",
    pillClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  },
  error: {
    label: "Failed to save",
    dotClass: "bg-destructive",
    pillClass: "border-destructive/30 bg-destructive/10 text-destructive",
  },
};

export default function ResumeLeftSide({
  activeBlock,
  setActiveBlock,
  autosaveStatus,
}: ResumeLeftSideProps) {
  const config = statusConfig[autosaveStatus];

  return (
    <aside className="flex h-full w-full flex-col">
      <div className="mb-3">
        <div
          className={cn(
            "flex h-9 items-center gap-2 rounded-lg border px-3 text-xs",
            config.pillClass,
            autosaveStatus === "idle" && "text-muted-foreground",
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", config.dotClass)} />
          <span className="truncate">
            {config.label || "All changes are saved"}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
          Sections
        </p>

        {BLOCKS.map((block) => {
          const isActive = activeBlock === block;

          return (
            <button
              key={block}
              type="button"
              onClick={() => setActiveBlock(block)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                "hover:bg-accent/60 hover:text-foreground",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    isActive
                      ? "bg-primary"
                      : "bg-border group-hover:bg-primary/60",
                  )}
                />
                <span className={cn(isActive && "font-semibold")}>{block}</span>
              </span>
              <span className="text-xs text-muted-foreground/70">
                {isActive ? "Current" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
