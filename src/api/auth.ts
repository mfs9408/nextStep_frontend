import { CreateUserInterface, LoginInterface } from "@/types/auth/auth";
import axios, { AxiosResponse } from "axios";
import { post } from "@/lib/api";

export const login = async (body: LoginInterface): Promise<AxiosResponse> => {
  return await post("/auth/login", body);
};

export const register = async (
  body: CreateUserInterface,
): Promise<AxiosResponse> => {
  return await post("/auth/register", body);
};

export const refreshSession = async () => {
  return await axios.post("/auth/session/refresh", {
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
};
