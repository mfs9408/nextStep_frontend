import ResumeToDeleteWindow from "@/components/ResumeToDeleteWindow";
import SmallResumeCard from "@/components/SmallResumeCard";
import ResumesSkeleton from "@/components/ResumesSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { ResumeInterface } from "@/types/ResumeTypes";
import { SetStateActionType } from "@/types/general";
import { SORT_OPTIONS } from "@/commonConst/Sort";
import { Button } from "@/components/ui/button";
import TextField from "@/components/TextField";
import { Card } from "@/components/ui/card";
import { QueryKey } from "@/enums/queryKey";
import { deleteResume } from "@/api/resume";
import Select from "@/components/Select";
import React, { useState } from "react";
import { Route } from "@/enums/route";
import { Sort } from "@/enums/sort";
import { X } from "lucide-react";
import Link from "next/link";

interface YourResumesViewProps {
  resumes: ResumeInterface[] | undefined;
  isLoading: boolean;
  sort: Sort;
  setSort: SetStateActionType<Sort>;
  search: string;
  setSearch: SetStateActionType<string>;
}

const YourResumesView = ({
  resumes,
  isLoading,
  sort,
  setSort,
  search,
  setSearch,
}: YourResumesViewProps) => {
  const queryClient = useQueryClient();
  const [resumeToDelete, setResumeToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const onDelete = async (id: string) => {
    await deleteResume(id);
    await queryClient.invalidateQueries({
      queryKey: [QueryKey.ALL_RESUMES],
    });
  };

  return (
    <>
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
            <Link href={Route.CREATE_RESUME}>Create resume</Link>
          </Button>
        </div>

        <Card className="min-h-0 w-full flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-row gap-x-4 items-center">
            <Select
              label="Sort by"
              placeholder="Sort by"
              value={sort}
              onChange={(value) => setSort(value as Sort)}
              selectGroup={SORT_OPTIONS}
              containerClassName="bg-card w-50"
            />
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              label="Search by note"
              placeholder="Resumes for Amazon"
              containerClassName="w-1/5"
              rightIcon={
                <X
                  onClick={() => setSearch("")}
                  className="text-muted-foreground h-4 w-4 cursor-pointer"
                />
              }
            />
            <p className="text-sm text-muted-foreground">
              {resumes?.length ?? 0} resumes found.
            </p>
          </div>

          {isLoading ? (
            <ResumesSkeleton />
          ) : resumes !== undefined && resumes.length === 0 ? (
            <div className="flex flex-col items-start justify-center rounded-xl border border-dashed bg-card p-10">
              <p className="text-base font-medium">No resume yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first resume to start editing sections and
                generating AI improvements.
              </p>
              <Button asChild className="mt-4">
                <Link href={Route.CREATE_RESUME}>Create resume</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {Array.isArray(resumes) &&
                resumes !== null &&
                resumes.map((item) => (
                  <SmallResumeCard
                    key={item.id}
                    item={item}
                    setResumeToDelete={setResumeToDelete}
                  />
                ))}
            </div>
          )}
        </Card>
      </div>
      {resumeToDelete && (
        <ResumeToDeleteWindow
          state={!!resumeToDelete}
          setState={setResumeToDelete}
          resumeData={resumeToDelete}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default YourResumesView;
