import { useCartStore } from "@/entities/cart";
import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "@/entities/product";
import { useUserStore } from "@/entities/user";
import { usePendingActionsStore } from "@/features/auth/pending-actions";

export const useAddToCart = (product: Product) => {
  const { token } = useUserStore();
  const location = useLocation();
  const addPendingAction = usePendingActionsStore(
    (state) => state.addPendingAction,
  );

  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!token) {
      addPendingAction({
        type: "ADD_TO_CART",
        payload: product,
        redirectTo: location.pathname,
      });

      navigate("/login");
      return;
    }

    addItem(product);
  };

  return { handleAddToCart };
};
