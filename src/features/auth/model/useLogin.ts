import { useMutation } from "@tanstack/react-query";
import { login } from "../api/loginApi";
import type { LoginFormData } from "./loginSchema";
import { useUserStore } from "@/entities/user";

export const useLogin = () => {
  const setAuth = useUserStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (response) => {
      if (response) {
        const { accessToken, username, id } = response;

        setAuth({ username, id }, accessToken);

        localStorage.setItem("token", accessToken);
      }
    },
  });
};
