import NewsSkeleton from "@/views/NewsView/NewsSkeleton";
import NewsCard from "@/views/NewsView/NewsCard";
import { News } from "@/types/api/input/news";
import { Card } from "@/components/ui/card";
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
        {news.length === 0 && (
          <div className="flex flex-col items-start justify-center px-6 py-10 text-center text-muted-foreground">
            <p className="mb-1 text-xl font-medium">No news</p>
            <p className="text-md">
              As soon as new features become available, they will appear here.
            </p>
          </div>
        )}
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
