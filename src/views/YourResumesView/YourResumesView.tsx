import ResumesSkeleton from "@/components/ResumesSkeleton";
import { Separator } from "@/components/ui/separator";
import { ResumeInterface } from "@/types/ResumeTypes";
import { SetStateActionType } from "@/types/general";
import StatusBadge from "@/components/StatusBadge";
import { SORT_OPTIONS } from "@/commonConst/Sort";
import { Button } from "@/components/ui/button";
import TextField from "@/components/TextField";
import { Card } from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Route } from "@/enums/route";
import { Sort } from "@/enums/sort";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

interface YourResumesViewProps {
  resumes: ResumeInterface[] | undefined;
  isLoading: boolean;
  sort: Sort;
  setSort: SetStateActionType<Sort>;
  search: string;
  setSearch: SetStateActionType<string>;
}

const SortSelect = dynamic(() => import("@/components/Select"), {
  ssr: false,
  loading: () => <div className="h-9 w-[180px] rounded-md bg-muted" />,
});

const YourResumesView = ({
  resumes,
  isLoading,
  sort,
  setSort,
  search,
  setSearch,
}: YourResumesViewProps) => {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your resumes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and keep track of your resume versions.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/resume/new">Create resume</Link>
        </Button>
      </div>

      <Card className="min-h-0 w-full flex-1 overflow-auto p-4 md:p-6">
        <div className="flex flex-row gap-x-4">
          <SortSelect
            selectedItem={sort as string}
            setSelectedValue={(value) => setSort(value as Sort)}
            selectGroup={SORT_OPTIONS}
            className="bg-card"
          />
          <TextField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by note"
            containerClassName="w-1/5"
          />
        </div>

        {isLoading ? (
          <ResumesSkeleton />
        ) : resumes !== undefined && resumes.length === 0 ? (
          <div className="flex flex-col items-start justify-center rounded-xl border border-dashed bg-card p-10">
            <p className="text-base font-medium">No resumes yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first resume to start editing sections and generating
              AI improvements.
            </p>
            <Button asChild className="mt-4">
              <Link href={Route.CREATE_RESUME}>Create resume</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.isArray(resumes) &&
              resumes.map((item) => {
                const title =
                  item.resumeTitle?.trim() ||
                  `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim() ||
                  "Untitled resume";

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border bg-card p-4 transition hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="truncate text-base font-semibold">
                            {title}
                          </h2>
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
                        <Button variant="outline">
                          <p>Download</p>
                          <DownloadIcon />
                        </Button>
                        <Button asChild variant="secondary" className="border">
                          <Link href={`/resume/${item.id}`}>Edit</Link>
                        </Button>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex text-xs text-muted-foreground">
                      <span>
                        City: {item.city}
                        <span className="font-mono">
                          {String(item.id).slice(0, 8)}…
                        </span>
                      </span>
                      {/*<span className="text-muted-foreground">*/}
                      {/*  last edit section*/}
                      {/*</span>*/}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default YourResumesView;
