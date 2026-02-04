import { apiClient } from "@/shared/api/apiClient";

export const getCurrentUser = async (signal: AbortSignal) => {
  return apiClient.get("/auth/me", { signal }).then((res) => res.data);
};
