"use client";
import { useSessionContext } from "@/components/SessionProvider";
import { ApiResponse } from "@/types/api/response";
import { useQuery } from "@tanstack/react-query";
import { News } from "@/types/api/input/news";
import { QueryKey } from "@/enums/queryKey";
import NewsView from "@/views/NewsView";
import { getAllNews } from "@/api/news";
import React from "react";

const Page = () => {
  const { user } = useSessionContext();

  const { data: news, isLoading: areNewsLoading } = useQuery<
    ApiResponse<News[]>
  >({
    queryKey: [QueryKey.NEWS],
    queryFn: getAllNews,
    enabled: !!user,
  });

  console.log(news);

  return <NewsView isLoading={areNewsLoading} />;
};

export default Page;
