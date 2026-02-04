import { useEffect } from "react";
import { useUserQuery, useUserStore } from "@/entities/user";

export const useUserSync = () => {
  const { token, setUser, logout } = useUserStore();
  const { isSuccess, data, isError, isLoading } = useUserQuery(!!token);
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return { isLoading };
};
