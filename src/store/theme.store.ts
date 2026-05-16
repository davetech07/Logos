// src/store/theme.store.ts
import { Appearance } from "react-native";
import { create } from "zustand";
import { AppTheme, DarkTheme, LightTheme } from "../constants/theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  theme: AppTheme;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  syncSystem: () => void;
}

const resolveTheme = (mode: ThemeMode): AppTheme => {
  if (mode === "system") {
    return Appearance.getColorScheme() === "dark" ? DarkTheme : LightTheme;
  }
  return mode === "dark" ? DarkTheme : LightTheme;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "system",
  theme: resolveTheme("system"),
  isDark: resolveTheme("system").dark,

  setMode: (mode) => {
    const theme = resolveTheme(mode);
    set({ mode, theme, isDark: theme.dark });
  },

  syncSystem: () => {
    const { mode } = get();
    if (mode === "system") {
      const theme = resolveTheme("system");
      set({ theme, isDark: theme.dark });
    }
  },
}));

// Auto-sync when device appearance changes
Appearance.addChangeListener(() => {
  useThemeStore.getState().syncSystem();
});
