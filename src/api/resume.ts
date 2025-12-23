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

export const updateProfile = async (
  id: string,
  payload: Partial<ResumeInterface>,
) => {
  console.log("updateProfile", payload);
};
export const updateSummary = async (
  id: string,
  payload: Partial<ResumeInterface>,
) => {
  console.log("updateSummary", payload);
};
export const updateProfessionalExperience = async (
  id: string,
  payload: Partial<ResumeInterface>,
) => {
  console.log("professionalExperience", payload);
};

export const updateEducation = async (
  id: string,
  payload: Partial<ResumeInterface>,
) => {
  console.log("updateSummary", payload);
};

export const updateSkills = async (
  id: string,
  payload: Partial<ResumeInterface>,
) => {
  console.log("updateSummary", payload);
};
