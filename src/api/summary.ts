import { BulletPointOutput } from "@/types/api/output/resume";
import { BulletPoint, Summary } from "@/types/ResumeTypes";
import { destroy, patch, post } from "@/lib/api";

export const createSummary = async (body: Summary): Promise<Summary> => {
  const response = await post("/resume/summary", body);
  return response.data;
};

export const updateSummary = async (body: Summary): Promise<Summary> => {
  const response = await patch(`/resume/summary/${body.id}`, body);

  return response.data;
};

export const createSummaryBullet = async (body: BulletPointOutput) => {
  const response = await post(`/resume/summary/bullet-point`, body);

  return response.data;
};

export const updateSummaryBullet = async (body: BulletPoint) => {
  const response = await patch(`/resume/summary/bullet-point/${body.id}`, body);

  return response.data;
};

export const deleteSummaryBullet = async (bulletId: string) => {
  const response = await destroy(`/resume/summary/bullet-point/${bulletId}`);

  return response.data;
};

export const reorderSummaryBullets = async (body: {
  idsInOrder: string[];
  summaryId: string;
}) => {
  const response = await patch(
    `/resume/summary/bullet-point/${body.summaryId}/reorder`,
    body,
  );

  return response.data;
};
