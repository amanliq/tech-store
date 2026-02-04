import { useEffect } from "react";
import { useUserQuery, useUserStore } from "@/entities/user";
import { useCartStore } from "@/entities/cart";

export const useUserSync = () => {
  const { token, setUser, logout } = useUserStore();
  const { isSuccess, data, isError, isLoading } = useUserQuery(!!token);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      logout();
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return { isLoading };
};
