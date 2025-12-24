"use client";
import { ResumeFormInterface } from "@/types/ResumeTypes";
import { useSessionContext } from "@/components/SessionProvider";
import CreateResumeView from "@/views/CreateResumeView";
import { useQuery } from "@tanstack/react-query";
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
      queryFn: () => getResume(id),
      initialData: undefined,
    });

  if (!user || isResumeLoading) {
    return;
  }

  if (!resume) return;

  return <CreateResumeView user={user} resumeData={resume} />;
};

export default Page;
