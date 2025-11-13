import { CreateUserInterface, LoginInterface } from "@/types/auth/auth";
import { AxiosResponse } from "axios";
import { post } from "@/lib/api";

export const login = async (body: LoginInterface): Promise<AxiosResponse> => {
  return await post("/auth/login", body);
};

export const register = async (
  body: CreateUserInterface,
): Promise<AxiosResponse> => {
  return await post("/auth/register", body);
};
