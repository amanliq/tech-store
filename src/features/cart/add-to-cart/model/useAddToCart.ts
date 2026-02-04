import { useCartStore } from "@/entities/cart";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/entities/product";
import { useUserStore } from "@/entities/user";

export const useAddToCart = (product: Product) => {
  const { token } = useUserStore();

  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!token) {
      navigate("/login");
      return;
    }

    addItem(product);
  };

  return { handleAddToCart };
};
