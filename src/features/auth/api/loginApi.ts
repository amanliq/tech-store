import { apiClient } from "@/shared/api/apiClient";
import type { LoginFormData } from "../model/loginSchema";

export const login = (credentials: LoginFormData) => {
  return apiClient.post("/auth/login", credentials).then((res) => res.data);
};
