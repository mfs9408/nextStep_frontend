"use client";
import YourResumesView from "@/views/YourResumesView";
import { ResumeInterface } from "@/types/ResumeTypes";
import { useQuery } from "@tanstack/react-query";
import { getAllResumes } from "@/api/resume";
import { QueryKey } from "@/enums/queryKey";
import React, { useState } from "react";
import { Sort } from "@/enums/sort";

const Page = () => {
  const [sort, setSort] = useState<Sort>(Sort.ASC);
  const { data: resumes, isLoading } = useQuery<ResumeInterface[]>({
    queryKey: [QueryKey.ALL_RESUMES, sort],
    queryFn: () => getAllResumes(sort),
    initialData: [],
  });

  console.log({ isLoading });

  return (
    <YourResumesView
      resumes={resumes}
      isLoading={isLoading}
      sort={sort}
      setSort={setSort}
    />
  );
};

export default Page;
