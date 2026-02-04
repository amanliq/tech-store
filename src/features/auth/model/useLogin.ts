import { useMutation } from "@tanstack/react-query";
import { login } from "../api/loginApi";
import type { LoginFormData } from "./loginSchema";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
  });
};
