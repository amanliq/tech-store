import { useCartStore } from "@/entities/cart";
import { useNavigate } from "react-router-dom";
import type { PendingAction } from "./types";
import { usePendingActionsStore } from "./store";

export const usePendingActions = () => {
  const addItem = useCartStore((s) => s.addItem);
  const removePendingAction = usePendingActionsStore(
    (s) => s.removePendingAction,
  );

  const navigate = useNavigate();

  const executePendingAction = (action: PendingAction) => {
    if (action.type == "ADD_TO_CART") {
      addItem(action.payload);
      if (action.redirectTo) {
        navigate(action.redirectTo);
      }
      removePendingAction(action);
    }
  };

  return { executePendingAction };
};
