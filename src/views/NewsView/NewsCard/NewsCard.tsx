import { useMutation, useQueryClient } from "@tanstack/react-query";
import { News } from "@/types/api/input/news";
import { QueryKey } from "@/enums/queryKey";
import { markAsRead } from "@/api/news";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  item: News;
}

const NewsCard = ({ item }: NewsCardProps) => {
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = useState(false);

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: (_, id) => {
      // аккуратно обновляем кэш NEWS
      queryClient.setQueryData<News[]>([QueryKey.NEWS], (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === id ? { ...item, isRead: true } : item,
        );
      });
    },
  });

  const markAsReadClick = async (id: string) => {
    await markAsReadMutation.mutateAsync(id);
  };

  return (
    <article
      className={[
        "flex gap-4 px-6 py-4 border-b border-border last:border-b-0",
        !item.isRead ? "bg-muted/50" : "bg-card",
      ].join(" ")}
      onClick={() => markAsReadClick(item.id)}
    >
      <div className="mt-1">
        <span
          className={[
            "inline-block h-2 w-2 rounded-full",
            item.isRead ? "bg-muted-foreground/30" : "bg-primary",
          ].join(" ")}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-foreground">
              {item.title}
            </h2>

            {item.badge && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {item.badge}
              </span>
            )}

            {!item.isRead && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                New
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(item.publishedAt).toLocaleDateString()}
          </p>
        </div>

        <p
          className={cn(
            "mt-1 line-clamp-none text-sm text-muted-foreground",
            !isExpanded && "line-clamp-2",
          )}
        >
          {item.content}
        </p>

        <div className="flex justify-between">
          {!isExpanded && (
            <p
              className="mt-1 text-xs text-muted-foreground hover:text-foreground hover:cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Expand article
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
