import { News } from "@/types/api/input/news";
import { get, post } from "@/lib/api";

export const getAllNews = async (): Promise<News[]> => {
  const response = await get("/news");

  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await post(`/news/${id}/read`);

  return response.data;
};
