import { ResumeInterface } from "@/types/ResumeTypes";
import { get, patch, post } from "@/lib/api";
import { AxiosResponse } from "axios";

export const createResume = async (
  body: ResumeInterface,
): Promise<AxiosResponse> => {
  return await post("/resume", body);
};

export const getResume = async (id: string): Promise<ResumeInterface> => {
  const response = await get(`/resume/${id}`);

  return response.data;
};

export const updateResume = async (body: ResumeInterface) => {
  return await patch("/resume", body);
};
