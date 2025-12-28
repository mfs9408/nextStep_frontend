import { ResumeToDelete } from "@/views/YourResumesView/your-resumes-type";
import { Separator } from "@/components/ui/separator";
import { ResumeInterface } from "@/types/ResumeTypes";
import { SetStateActionType } from "@/types/general";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SmallResumeCardProps {
  item: ResumeInterface;
  setResumeToDelete: SetStateActionType<ResumeToDelete | null>;
}

const SmallResumeCard = ({ item, setResumeToDelete }: SmallResumeCardProps) => {
  const title =
    item.resumeTitle?.trim() ||
    `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim() ||
    "Untitled resume";

  return (
    <div
      key={item.id}
      className={cn(
        "rounded-xl border bg-card p-4 transition hover:bg-muted/30 hover:shadow-sm",
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-semibold">{title}</h2>
            <StatusBadge status={item.status} />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="truncate">
              {item.firstName} {item.lastName}
            </span>
            <span className="opacity-60">•</span>
            <span>Updated {formatDate(item.updatedAt)}</span>
          </div>
          {item.note ? (
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {item.note}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground italic">
              No note yet
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 md:justify-end">
          <Button asChild size="sm">
            <Link href={`/resume/${item.id}`}>Edit</Link>
          </Button>
          <Button variant="outline" size="sm">
            <p>Download</p>
            <DownloadIcon />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setResumeToDelete({
                id: item.id,
                name: item.resumeTitle || item.note,
              });
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex text-xs text-muted-foreground">
        <span>
          City: {item.city}
          <span className="font-mono">{String(item.id).slice(0, 8)}…</span>
        </span>
        {/*<span className="text-muted-foreground">*/}
        {/*  last edit section*/}
        {/*</span>*/}
      </div>
    </div>
  );
};

export default SmallResumeCard;
