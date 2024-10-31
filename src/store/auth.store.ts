import { create } from "zustand";

export interface AuthUser {
  name: string;
  course: string;
  email: string;
  Ra: number;
  emailVerified: boolean;
  token: string;
}

export interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: AuthUser | null) => set(() => ({user}))
}));
