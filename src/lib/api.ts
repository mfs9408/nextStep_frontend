import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshSession } from "@/api/auth";
import { Route } from "@/enums/route";

export const apiClient = axios.create({
  baseURL: process.env.baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token?: string) => void> = [];

function onRefreshed(): void {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token?: string) => void): void {
  refreshSubscribers.push(callback);
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          addRefreshSubscriber(() => {
            apiClient(originalRequest).then(resolve).catch(reject);
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("here refresh session");
        await refreshSession();
        isRefreshing = false;
        onRefreshed();
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        redirectToLogin();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    // const currentPath = window.location.pathname;

    // const isAdminRoute = currentPath.startsWith("/admin");

    // const redirectUrl = isAdminRoute ? AdminRoute.MAIN : Route.SIGNIN;

    window.location.href = Route.LOGIN;
  }
};

export const { get, post, patch, delete: destroy } = apiClient;
