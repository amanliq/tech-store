import { create } from "zustand";
import type { User } from "./types";
import { persist } from "zustand/middleware";
import { tokenService } from "@/shared/lib";

interface UserState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: tokenService.getToken() || null,
      setAuth: (user, token) => {
        set({ user, token });
        tokenService.setToken(token);
      },
      clearAuth: () => {
        set({ user: null, token: null });
        tokenService.removeToken();
      },
      setUser: (user) => set({ user }),

      logout: () => {
        get().clearAuth();
      },
    }),

    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
