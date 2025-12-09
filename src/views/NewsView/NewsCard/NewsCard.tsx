import { Toggle } from "@/components/ui/toggle";
import { News } from "@/types/api/input/news";
import { Card } from "@/components/ui/card";
import React from "react";

interface NewsCardProps {
  item: News;
}

const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <Card className="p-8 flex flex-row shadow-xl">
      <div>
        <Toggle />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <div>{item.content}</div>
      </div>
    </Card>
  );
};

export default NewsCard;
