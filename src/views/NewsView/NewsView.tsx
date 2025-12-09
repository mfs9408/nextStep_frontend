import { Card } from "@/components/ui/card";
import React from "react";

interface NewsViewProps {
  isLoading: boolean;
}

const NewsView = ({ isLoading }: NewsViewProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-5 min-h-0 w-full">
      <h1 className="text-2xl">News</h1>
      <Card className="flex flex-1 flex-row min-h-0 w-full p-8"></Card>
    </div>
  );
};

export default NewsView;
