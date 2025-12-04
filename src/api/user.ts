import { SessionUser } from "@/types/session";
import { get } from "@/lib/api";

export const getMe = async (): Promise<SessionUser> => {
  const { data } = await get("/user/me");
  return data;
};
