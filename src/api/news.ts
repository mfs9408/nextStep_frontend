import { get } from "@/lib/api";

export const getAllNews = async () => {
  const response = await get("/news");

  return response.data;
};
