import { useCartStore } from "@/entities/cart";
import { useUserStore } from "@/entities/user";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/login");
  };

  return { handleLogout };
};
