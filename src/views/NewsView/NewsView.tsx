import NewsSkeleton from "@/views/NewsView/NewsSkeleton";
import NewsCard from "@/views/NewsView/NewsCard";
import { Toggle } from "@/components/ui/toggle";
import { News } from "@/types/api/input/news";
import { Card } from "@/components/ui/card";
import { Dot } from "lucide-react";
import React from "react";

interface NewsViewProps {
  news: News[];
  isLoading: boolean;
}

const NewsView = ({ news, isLoading }: NewsViewProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-5 min-h-0 w-full">
      <h1 className="text-2xl">News</h1>
      <Card className="flex flex-1 flex-col min-h-0 w-full p-8 overflow-auto">
        {isLoading ? (
          <NewsSkeleton />
        ) : (
          news.map((item) => <NewsCard key={item.id} item={item} />)
        )}
      </Card>
    </div>
  );
};

export default NewsView;
