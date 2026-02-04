import { useCartStore } from "@/entities/cart";
import { useNavigate } from "react-router-dom";
import type { PendingAction } from "./types";

export const usePendingActions = () => {
  const addItem = useCartStore((s) => s.addItem);

  const navigate = useNavigate();

  const executePendingAction = (action: PendingAction) => {
    if (action.type == "ADD_TO_CART") {
      addItem(action.payload);
      if (action.redirectTo) {
        navigate(action.redirectTo);
      }
    }
  };

  return { executePendingAction };
};
