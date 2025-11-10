import { post } from "@/lib/api";

export const login = async (body: {
  email: string;
  password: string;
}): Promise<unknown> => {
  return await post("/auth/login", body);
};
