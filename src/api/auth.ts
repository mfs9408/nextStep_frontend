import { AxiosResponse } from "axios";
import { post } from "@/lib/api";

export const login = async (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return await post("/auth/login", body);
};
