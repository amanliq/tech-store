import { create } from "zustand";
import type { User } from "./types";
import { persist } from "zustand/middleware";

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
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        localStorage.setItem("token", token);
      },
      clearAuth: () => set({ user: null, token: null }),
      setUser: (user) => set({ user }),
      logout: () => {
        get().clearAuth();
        localStorage.removeItem("token");
      },
    }),

    {
      name: "user-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
