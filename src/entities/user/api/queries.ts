import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./userApi";

export const useUserQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: ({ signal }) => getCurrentUser(signal),
    enabled,
  });
};
