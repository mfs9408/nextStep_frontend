"use client";
import { useQuery } from "@tanstack/react-query";
import { News } from "@/types/api/input/news";
import { QueryKey } from "@/enums/queryKey";
import NewsView from "@/views/NewsView";
import { getAllNews } from "@/api/news";
import React from "react";

const Page = () => {
  const { data: news, isLoading: areNewsLoading } = useQuery<News[]>({
    queryKey: [QueryKey.NEWS],
    queryFn: getAllNews,
    initialData: [],
  });

  return <NewsView news={news} isLoading={areNewsLoading} />;
};

export default Page;
