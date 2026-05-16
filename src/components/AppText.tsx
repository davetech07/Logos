// src/components/AppText.tsx
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";

type Variant =
  | "h1" // 34px  — screen titles
  | "h2" // 28px  — section headings
  | "h3" // 24px  — card headings
  | "h4" // 20px  — sub-headings
  | "body" // 15px  — default body text
  | "bodyLarge" // 17px  — reading / verse text
  | "caption" // 13px  — timestamps, labels
  | "micro" // 11px  — badges, tiny labels
  | "verse"; // 17px relaxed — optimised for Bible reading

type Color =
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "accent"
  | "error"
  | "success";

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: Color;
  bold?: boolean;
  italic?: boolean;
  center?: boolean;
  style?: TextStyle | TextStyle[];
}

export const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  color = "primary",
  bold = false,
  italic = false,
  center = false,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();
  const c = theme.colors;
  const s = theme.sizes;
  const l = theme.lines;

  const variantStyles: Record<Variant, TextStyle> = {
    h1: {
      fontSize: s["3xl"],
      lineHeight: s["3xl"] * l.tight,
      fontWeight: "700",
    },
    h2: {
      fontSize: s["2xl"],
      lineHeight: s["2xl"] * l.tight,
      fontWeight: "700",
    },
    h3: { fontSize: s.xl, lineHeight: s.xl * l.snug, fontWeight: "600" },
    h4: { fontSize: s.lg, lineHeight: s.lg * l.snug, fontWeight: "600" },
    body: {
      fontSize: s.base,
      lineHeight: s.base * l.normal,
      fontWeight: "400",
    },
    bodyLarge: {
      fontSize: s.md,
      lineHeight: s.md * l.normal,
      fontWeight: "400",
    },
    caption: { fontSize: s.sm, lineHeight: s.sm * l.normal, fontWeight: "400" },
    micro: { fontSize: s.xs, lineHeight: s.xs * l.normal, fontWeight: "500" },
    verse: {
      fontSize: s.md,
      lineHeight: s.md * l.relaxed,
      fontWeight: "400",
      fontFamily: theme.fonts.regular,
    },
  };

  const colorMap: Record<Color, string> = {
    primary: c.text,
    secondary: c.textSecondary,
    muted: c.textMuted,
    inverse: c.textInverse,
    accent: c.accent,
    error: c.error,
    success: c.success,
  };

  return (
    <Text
      style={[
        variantStyles[variant],
        { color: colorMap[color] },
        bold && { fontWeight: "700" },
        italic && { fontStyle: "italic" },
        center && { textAlign: "center" },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
