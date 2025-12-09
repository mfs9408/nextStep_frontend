import { News } from "@/types/api/input/news";
import { get } from "@/lib/api";

export const getAllNews = async (): Promise<News[]> => {
  const response = await get("/news");

  return response.data;
};
