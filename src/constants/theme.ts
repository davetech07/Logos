// src/constants/theme.ts

export const Colors = {
  // ── Brand ─────────────────────────────────────────────
  primary: "#0B3D2E", // deep forest green  (headers, CTAs)
  primaryLight: "#1B5E40", // slightly lighter green
  primaryMid: "#2E7D52", // mid green (active states)
  accent: "#B8860B", // gold  (streaks, highlights, badges)
  accentLight: "#FFF8E1", // pale gold (badge backgrounds)
  accentMid: "#E6A817", // gold mid (icons, borders)

  // ── Neutrals ──────────────────────────────────────────
  white: "#FFFFFF",
  cream: "#FAFAF7", // app background (light mode)
  warm: "#F5F0E8", // card backgrounds (light mode)
  border: "#E5E7EB", // subtle borders
  borderStrong: "#C9CDD4", // input borders, dividers

  // ── Text ──────────────────────────────────────────────
  text: "#1A1A2E", // primary text
  textSecondary: "#4A5568", // body / descriptions
  textMuted: "#9CA3AF", // placeholders, timestamps
  textInverse: "#FFFFFF", // text on dark backgrounds

  // ── Semantic ──────────────────────────────────────────
  success: "#2E7D52",
  successLight: "#E8F5EE",
  warning: "#B8860B",
  warningLight: "#FFF8E1",
  error: "#C0392B",
  errorLight: "#FDEDEB",
  info: "#1A4A8A",
  infoLight: "#EBF2FC",

  // ── Dark mode overrides ───────────────────────────────
  dark: {
    background: "#0D1117",
    surface: "#161B22",
    surfaceRaised: "#1C2128",
    border: "#30363D",
    borderStrong: "#484F58",
    text: "#E6EDF3",
    textSecondary: "#8B949E",
    textMuted: "#484F58",
    primary: "#238636",
    primaryLight: "#2EA043",
    accent: "#D4A017",
    accentLight: "#2D2500",
  },
};

export const FontFamily = {
  regular: "System", // swap with 'Lora-Regular' once you load custom fonts
  medium: "System",
  semibold: "System",
  bold: "System",
  mono: "System",
  // After loading fonts via expo-font, replace with:
  // regular:  'Lora-Regular',
  // medium:   'Lora-Medium',
  // bold:     'Lora-Bold',
  // sans:     'Inter-Regular',
  // sansBold: 'Inter-SemiBold',
};

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 34,
  "4xl": 40,
};

export const LineHeight = {
  tight: 1.2,
  snug: 1.4,
  normal: 1.6,
  relaxed: 1.8, // best for Bible verse reading
  loose: 2.0,
};

export const Spacing = {
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  full: 9999,
};

export const Shadow = {
  // React Native shadow (iOS + Android elevation)
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
};

// ── Full theme objects (light + dark) ────────────────────────────────────────

export const LightTheme = {
  dark: false,
  colors: {
    background: Colors.cream,
    surface: Colors.white,
    surfaceRaised: Colors.warm,
    border: Colors.border,
    borderStrong: Colors.borderStrong,
    primary: Colors.primary,
    primaryLight: Colors.primaryLight,
    accent: Colors.accent,
    accentLight: Colors.accentLight,
    text: Colors.text,
    textSecondary: Colors.textSecondary,
    textMuted: Colors.textMuted,
    textInverse: Colors.textInverse,
    success: Colors.success,
    successLight: Colors.successLight,
    warning: Colors.warning,
    warningLight: Colors.warningLight,
    error: Colors.error,
    errorLight: Colors.errorLight,
    info: Colors.info,
    infoLight: Colors.infoLight,
    tabBar: Colors.white,
    tabBarActive: Colors.primary,
    tabBarInactive: Colors.textMuted,
    header: Colors.primary,
    headerText: Colors.white,
    card: Colors.white,
    input: Colors.white,
    inputBorder: Colors.borderStrong,
    placeholder: Colors.textMuted,
  },
  fonts: FontFamily,
  sizes: FontSize,
  spacing: Spacing,
  radius: Radius,
  shadow: Shadow,
  lines: LineHeight,
};

export const DarkTheme = {
  dark: true,
  colors: {
    background: Colors.dark.background,
    surface: Colors.dark.surface,
    surfaceRaised: Colors.dark.surfaceRaised,
    border: Colors.dark.border,
    borderStrong: Colors.dark.borderStrong,
    primary: Colors.dark.primary,
    primaryLight: Colors.dark.primaryLight,
    accent: Colors.dark.accent,
    accentLight: Colors.dark.accentLight,
    text: Colors.dark.text,
    textSecondary: Colors.dark.textSecondary,
    textMuted: Colors.dark.textMuted,
    textInverse: Colors.dark.text,
    success: Colors.success,
    successLight: "#0D2818",
    warning: Colors.dark.accent,
    warningLight: Colors.dark.accentLight,
    error: "#E05252",
    errorLight: "#2D1010",
    info: "#4A90D9",
    infoLight: "#0D1F33",
    tabBar: Colors.dark.surface,
    tabBarActive: Colors.dark.primaryLight,
    tabBarInactive: Colors.dark.textMuted,
    header: Colors.dark.surface,
    headerText: Colors.dark.text,
    card: Colors.dark.surface,
    input: Colors.dark.surfaceRaised,
    inputBorder: Colors.dark.border,
    placeholder: Colors.dark.textMuted,
  },
  fonts: FontFamily,
  sizes: FontSize,
  spacing: Spacing,
  radius: Radius,
  shadow: Shadow,
  lines: LineHeight,
};

export type AppTheme = typeof LightTheme;
