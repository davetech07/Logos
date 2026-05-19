 // src/constants/theme.ts
import { StyleSheet } from 'react-native';

export const Colors = {
  // ── Brand ─────────────────────────────────────────────
  primary:      "#0B3D2E",
  primaryLight: "#1B5E40",
  primaryMid:   "#2E7D52",
  accent:       "#B8860B",
  accentLight:  "#FFF8E1",
  accentMid:    "#E6A817",

  // ── Neutrals ──────────────────────────────────────────
  white:        "#FFFFFF",
  cream:        "#FAFAF7",
  warm:         "#F5F0E8",
  border:       "#E5E7EB",
  borderStrong: "#C9CDD4",

  // ── Text ──────────────────────────────────────────────
  text:          "#1A1A2E",
  textSecondary: "#4A5568",
  textMuted:     "#9CA3AF",
  textInverse:   "#FFFFFF",

  // ── Semantic ──────────────────────────────────────────
  success:      "#2E7D52",
  successLight: "#E8F5EE",
  warning:      "#B8860B",
  warningLight: "#FFF8E1",
  error:        "#C0392B",
  errorLight:   "#FDEDEB",
  info:         "#1A4A8A",
  infoLight:    "#EBF2FC",

  // ── Dark mode ─────────────────────────────────────────
  dark: {
    background:    "#0D1117",
    surface:       "#161B22",
    surfaceRaised: "#1C2128",
    border:        "#30363D",
    borderStrong:  "#484F58",
    text:          "#E6EDF3",
    textSecondary: "#8B949E",
    textMuted:     "#484F58",
    primary:       "#238636",
    primaryLight:  "#2EA043",
    accent:        "#D4A017",
    accentLight:   "#2D2500",
  },
};

// ── UPDATED: real font names loaded via expo-google-fonts ─────────────────────
// Run: npx expo install @expo-google-fonts/lora @expo-google-fonts/inter expo-font
export const FontFamily = {
  // Serif — headings, verse text, app name
  regular:  "Lora_400Regular",
  bold:     "Lora_700Bold",

  // Sans-serif — body, labels, buttons, inputs
  sans:     "Inter_400Regular",
  sansMd:   "Inter_500Medium",
  sansSemi: "Inter_600SemiBold",
  sansBold: "Inter_700Bold",

  // Fallback (used automatically if fonts haven't loaded yet)
  mono:     "System",
};

export const FontSize = {
  xs:    11,
  sm:    13,
  base:  15,
  md:    17,
  lg:    20,
  xl:    24,
  "2xl": 28,
  "3xl": 34,
  "4xl": 40,
};

export const LineHeight = {
  tight:   1.2,
  snug:    1.4,
  normal:  1.6,
  relaxed: 1.8, // best for Bible verse reading
  loose:   2.0,
};

export const Spacing = {
  "0":  0,
  "1":  4,
  "2":  8,
  "3":  12,
  "4":  16,
  "5":  20,
  "6":  24,
  "8":  32,
  "10": 40,
  "12": 48,
  "16": 64,
};

export const Radius = {
  sm:    6,
  md:    10,
  lg:    14,
  xl:    20,
  "2xl": 28,
  full:  9999,
};

export const Shadow = {
  sm: {
    shadowColor:   "#000",
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius:  3,
    elevation:     2,
  },
  md: {
    shadowColor:   "#000",
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius:  6,
    elevation:     4,
  },
  lg: {
    shadowColor:   "#000",
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius:  12,
    elevation:     8,
  },
};

// ── Light theme ───────────────────────────────────────────────────────────────
export const LightTheme = {
  dark: false,
  colors: {
    background:     Colors.cream,
    surface:        Colors.white,
    surfaceRaised:  Colors.warm,
    border:         Colors.border,
    borderStrong:   Colors.borderStrong,
    primary:        Colors.primary,
    primaryLight:   Colors.primaryLight,
    accent:         Colors.accent,
    accentLight:    Colors.accentLight,
    text:           Colors.text,
    textSecondary:  Colors.textSecondary,
    textMuted:      Colors.textMuted,
    textInverse:    Colors.textInverse,
    success:        Colors.success,
    successLight:   Colors.successLight,
    warning:        Colors.warning,
    warningLight:   Colors.warningLight,
    error:          Colors.error,
    errorLight:     Colors.errorLight,
    info:           Colors.info,
    infoLight:      Colors.infoLight,
    tabBar:         Colors.white,
    tabBarActive:   Colors.primary,
    tabBarInactive: Colors.textMuted,
    header:         Colors.primary,
    headerText:     Colors.white,
    card:           Colors.white,
    input:          Colors.white,
    inputBorder:    Colors.borderStrong,
    placeholder:    Colors.textMuted,
  },
  fonts:   FontFamily,
  sizes:   FontSize,
  spacing: Spacing,
  radius:  Radius,
  shadow:  Shadow,
  lines:   LineHeight,
};

// ── Dark theme ────────────────────────────────────────────────────────────────
export const DarkTheme = {
  dark: true,
  colors: {
    background:     Colors.dark.background,
    surface:        Colors.dark.surface,
    surfaceRaised:  Colors.dark.surfaceRaised,
    border:         Colors.dark.border,
    borderStrong:   Colors.dark.borderStrong,
    primary:        Colors.dark.primary,
    primaryLight:   Colors.dark.primaryLight,
    accent:         Colors.dark.accent,
    accentLight:    Colors.dark.accentLight,
    text:           Colors.dark.text,
    textSecondary:  Colors.dark.textSecondary,
    textMuted:      Colors.dark.textMuted,
    textInverse:    Colors.dark.text,
    success:        Colors.success,
    successLight:   "#0D2818",
    warning:        Colors.dark.accent,
    warningLight:   Colors.dark.accentLight,
    error:          "#E05252",
    errorLight:     "#2D1010",
    info:           "#4A90D9",
    infoLight:      "#0D1F33",
    tabBar:         Colors.dark.surface,
    tabBarActive:   Colors.dark.primaryLight,
    tabBarInactive: Colors.dark.textMuted,
    header:         Colors.dark.surface,
    headerText:     Colors.dark.text,
    card:           Colors.dark.surface,
    input:          Colors.dark.surfaceRaised,
    inputBorder:    Colors.dark.border,
    placeholder:    Colors.dark.textMuted,
  },
  fonts:   FontFamily,
  sizes:   FontSize,
  spacing: Spacing,
  radius:  Radius,
  shadow:  Shadow,
  lines:   LineHeight,
};

export type AppTheme = typeof LightTheme;

// ── NEW: Global shared styles (gs) ────────────────────────────────────────────
// Add this to your existing theme.ts — it's the only thing that was missing.
// Import in any screen:  import { gs } from '@/src/constants/theme';
// Use like:              <View style={[gs.flex1, gs.px6, gs.rowBetween]}>
export const gs = StyleSheet.create({
  // Flex
  flex1:         { flex: 1 },
  row:           { flexDirection: "row" },
  rowCenter:     { flexDirection: "row", alignItems: "center" },
  rowBetween:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  center:        { alignItems: "center", justifyContent: "center" },
  alignCenter:   { alignItems: "center" },
  justifyCenter: { justifyContent: "center" },
  selfCenter:    { alignSelf: "center" },
  wrap:          { flexWrap: "wrap" },

  // Horizontal screen padding
  px4:  { paddingHorizontal: Spacing["4"] },
  px5:  { paddingHorizontal: Spacing["5"] },
  px6:  { paddingHorizontal: Spacing["6"] },

  // Vertical padding
  py3:  { paddingVertical: Spacing["3"] },
  py4:  { paddingVertical: Spacing["4"] },
  py6:  { paddingVertical: Spacing["6"] },
  py8:  { paddingVertical: Spacing["8"] },

  // Margin bottom
  mb2:  { marginBottom: Spacing["2"] },
  mb3:  { marginBottom: Spacing["3"] },
  mb4:  { marginBottom: Spacing["4"] },
  mb6:  { marginBottom: Spacing["6"] },
  mb8:  { marginBottom: Spacing["8"] },

  // Margin top
  mt2:  { marginTop: Spacing["2"] },
  mt4:  { marginTop: Spacing["4"] },
  mt6:  { marginTop: Spacing["6"] },
  mt8:  { marginTop: Spacing["8"] },

  // Text alignment
  textCenter: { textAlign: "center" },
  textRight:  { textAlign: "right" },

  // Reusable shape bases — apply colors from theme at runtime
  card: {
    borderRadius: Radius.lg,
    borderWidth:  1,
    padding:      Spacing["4"],
  },
  btnBase: {
    height:         52,
    borderRadius:   Radius.lg,
    alignItems:     "center",
    justifyContent: "center",
    flexDirection:  "row",
    gap:            Spacing["2"],
  },
  inputBase: {
    height:            52,
    borderRadius:      Radius.md,
    borderWidth:       1,
    paddingHorizontal: Spacing["4"],
    flexDirection:     "row",
    alignItems:        "center",
  },
  progressTrack: {
    height:       3,
    borderRadius: 2,
  },
});
