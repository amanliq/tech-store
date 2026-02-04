import { useMutation } from "@tanstack/react-query";
import { login } from "../api/loginApi";
import type { LoginFormData } from "./loginSchema";
import { useUserStore } from "@/entities/user";
import {
  usePendingActions,
  usePendingActionsStore,
} from "../../pending-actions";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setAuth = useUserStore((state) => state.setAuth);
  const { executePendingAction } = usePendingActions();
  const navigate = useNavigate();

  const getPendingActionByType = usePendingActionsStore(
    (state) => state.getPendingActionByType,
  );

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (response) => {
      if (response) {
        const { accessToken, username, id } = response;

        setAuth({ username, id }, accessToken);

        const addCartPendingAction = getPendingActionByType("ADD_TO_CART");

        if (addCartPendingAction) {
          executePendingAction(addCartPendingAction);
        } else {
          navigate("/");
        }
      }
    },
  });
};
