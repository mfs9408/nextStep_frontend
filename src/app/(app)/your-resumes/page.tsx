"use client";
import YourResumesView from "@/views/YourResumesView";
import { ResumeInterface } from "@/types/ResumeTypes";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getAllResumes } from "@/api/resume";
import { QueryKey } from "@/enums/queryKey";
import React, { useState } from "react";
import { Sort } from "@/enums/sort";

const Page = () => {
  const [sort, setSort] = useState<Sort>(Sort.ASC);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim(), 400);

  const { data: resumes, isLoading } = useQuery<ResumeInterface[]>({
    queryKey: [QueryKey.ALL_RESUMES, sort, debouncedSearch],
    queryFn: () => getAllResumes(sort, debouncedSearch),
  });

  return (
    <YourResumesView
      resumes={resumes}
      isLoading={isLoading}
      sort={sort}
      setSort={setSort}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default Page;
