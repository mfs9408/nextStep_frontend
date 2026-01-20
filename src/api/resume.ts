import {
  ProfileSection,
  ResumeFormInterface,
  ResumeInterface,
} from "@/types/ResumeTypes";
import { ResumeInput } from "@/types/api/input/resume";
import { destroy, get, patch, post } from "@/lib/api";

export const createResume = async (
  body: ResumeFormInterface,
): Promise<ResumeFormInterface> => {
  const response = await post("/resume", body);
  return response.data;
};

export const updateResume = async (
  body: ProfileSection,
): Promise<ProfileSection> => {
  const response = await patch(`/resume/${body.id}`, body);
  return response.data;
};

export const deleteResume = async (id: string) => {
  const response = await destroy(`/resume/${id}`);
  return response.data;
};

export const getResume = async (id: string): Promise<ResumeInput> => {
  const response = await get(`/resume/${id}`);

  return response.data;
};

export const getAllResumes = async (
  order: string,
  query?: string,
): Promise<ResumeInterface[]> => {
  const response = await get(`/resume/all`, {
    params: {
      order: order,
      q: query && query,
    },
  });

  return response.data;
};
