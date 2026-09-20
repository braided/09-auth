import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticatedenticated: boolean;
  setUser: (user: User) => void;
  clearisAuthenticatedenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticatedenticated: false,

  setUser: (user) => {
    set({
      user,
      isAuthenticatedenticated: true,
    });
  },

  clearisAuthenticatedenticated: () => {
    set({
      user: null,
      isAuthenticatedenticated: false,
    });
  },
}));