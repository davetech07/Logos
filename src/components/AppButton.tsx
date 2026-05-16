// src/components/AppButton.tsx
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { AppText } from "./AppText";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style,
}) => {
  const theme = useTheme();
  const c = theme.colors;
  const r = theme.radius;
  const sp = theme.spacing;

  const sizeMap: Record<
    Size,
    { paddingV: number; paddingH: number; fontSize: number }
  > = {
    sm: { paddingV: sp["2"], paddingH: sp["4"], fontSize: theme.sizes.sm },
    md: { paddingV: sp["3"], paddingH: sp["6"], fontSize: theme.sizes.base },
    lg: { paddingV: sp["4"], paddingH: sp["8"], fontSize: theme.sizes.md },
  };

  const variantStyles: Record<
    Variant,
    { bg: string; border: string; textColor: string }
  > = {
    primary: { bg: c.primary, border: c.primary, textColor: c.textInverse },
    outline: { bg: "transparent", border: c.primary, textColor: c.primary },
    ghost: { bg: "transparent", border: "transparent", textColor: c.primary },
    danger: { bg: c.error, border: c.error, textColor: c.textInverse },
  };

  const { paddingV, paddingH, fontSize } = sizeMap[size];
  const { bg, border, textColor } = variantStyles[variant];
  const isDisabled = disabled || loading;

  const containerStyle: ViewStyle = {
    backgroundColor: isDisabled ? c.border : bg,
    borderWidth: 1,
    borderColor: isDisabled ? c.border : border,
    borderRadius: r.lg,
    paddingVertical: paddingV,
    paddingHorizontal: paddingH,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: sp["2"],
    alignSelf: fullWidth ? "stretch" : "flex-start",
    opacity: isDisabled ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[containerStyle, style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <AppText variant="body" bold style={{ color: textColor, fontSize }}>
            {label}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};
