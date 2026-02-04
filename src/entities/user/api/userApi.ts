import { apiClient } from "@/shared/api/apiClient";

export const getCurrentUser = async (signal: AbortSignal) => {
  apiClient.get("/auth/me", { signal });
};
