"use client";
import { useSessionContext } from "@/components/SessionProvider";
import { ResumeFormInterface } from "@/types/ResumeTypes";
import CreateResumeView from "@/views/CreateResumeView";
import { useQuery } from "@tanstack/react-query";
import { resumeFormToInput } from "@/lib/utils";
import { QueryKey } from "@/enums/queryKey";
import { useParams } from "next/navigation";
import { getResume } from "@/api/resume";
import React from "react";

const Page = () => {
  const { user } = useSessionContext();
  const params = useParams();
  const id = params.id as string;

  const { data: resume, isLoading: isResumeLoading } =
    useQuery<ResumeFormInterface>({
      queryKey: [QueryKey.GET_RESUME, id],
      queryFn: async () => {
        const resume = await getResume(id);

        return resumeFormToInput(resume);
      },
      initialData: undefined,
    });

  if (!user || isResumeLoading) {
    return;
  }

  if (!resume) return;

  return <CreateResumeView user={user} resumeData={resume} />;
};

export default Page;
