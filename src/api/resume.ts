import { ResumeFormInterface, ResumeInterface } from "@/types/ResumeTypes";
import { get, patch, post } from "@/lib/api";

export const createResume = async (
  body: ResumeFormInterface,
): Promise<ResumeFormInterface> => {
  const response = await post("/resume", body);
  return response.data;
};

export const updateResume = async (
  body: ResumeFormInterface,
): Promise<ResumeFormInterface> => {
  const response = await patch(`/resume/${body.id}`, body);
  return response.data;
};

export const getResume = async (id: string): Promise<ResumeFormInterface> => {
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

export const updateProfile = async (
  id: string,
  payload: Partial<ResumeFormInterface>,
) => {
  console.log("updateProfile", payload);
};
export const updateSummary = async (
  id: string,
  payload: Partial<ResumeFormInterface>,
) => {
  console.log("updateSummary", payload);
};
export const updateProfessionalExperience = async (
  id: string,
  payload: Partial<ResumeFormInterface>,
) => {
  console.log("professionalExperience", payload);
};

export const updateEducation = async (
  id: string,
  payload: Partial<ResumeFormInterface>,
) => {
  console.log("updateSummary", payload);
};

export const updateSkills = async (
  id: string,
  payload: Partial<ResumeFormInterface>,
) => {
  console.log("updateSummary", payload);
};
