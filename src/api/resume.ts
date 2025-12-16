import { ResumeInterface } from "@/types/ResumeTypes";
import { get, patch, post } from "@/lib/api";

export const createResume = async (
  body: ResumeInterface,
): Promise<ResumeInterface> => {
  const response = await post("/resume", body);
  return response.data;
};

export const updateResume = async (
  body: ResumeInterface,
): Promise<ResumeInterface> => {
  const response = await patch(`/resume/${body.id}`, body);
  return response.data;
};

export const getResume = async (id: string): Promise<ResumeInterface> => {
  const response = await get(`/resume/${id}`);

  return response.data;
};
