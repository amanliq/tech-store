import { useEffect } from "react";
import { useUserQuery, useUserStore } from "@/entities/user";
import { useLogout } from "./useLogout";

export const useUserSync = () => {
  const { token, setUser } = useUserStore();
  const { handleLogout } = useLogout();
  const { isSuccess, data, isError } = useUserQuery(!!token);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
};
