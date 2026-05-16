// src/store/auth.store.ts
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: "free" | "plus" | "pro" | "church";
  denomination: string;
  bibleVersion: string;
  chatCount: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  setUser: (user: User, token: string) => Promise<void>;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const TOKEN_KEY = "bible_app_token";
const USER_KEY = "bible_app_user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true, // true on startup — auth guard waits for this

  // Called after successful login or register
  setUser: async (user, token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    set({ user, token, isLoading: false });
  },

  // Called on app boot — restores session from secure storage
  loadUser: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const raw = await SecureStore.getItemAsync(USER_KEY);
      if (token && raw) {
        set({ user: JSON.parse(raw), token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  // Called on logout
  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    set({ user: null, token: null });
  },
}));
