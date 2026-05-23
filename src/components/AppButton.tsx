// src/components/AppButton.tsx

import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';

type Variant  = 'primary' | 'outline' | 'ghost' | 'danger';
type Size     = 'sm' | 'md' | 'lg';
type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface AppButtonProps {
  label:       string;
  onPress:     () => void;
  variant?:    Variant;
  size?:       Size;
  loading?:    boolean;
  disabled?:   boolean;
  fullWidth?:  boolean;
  iconLeft?:   IconName;
  iconRight?:  IconName;
  style?:      ViewStyle;
  labelStyle?: TextStyle;
}

export function AppButton({
  label,
  onPress,
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  disabled  = false,
  fullWidth = true,
  iconLeft,
  iconRight,
  style,
  labelStyle,
}: AppButtonProps) {
  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  const isDisabled = disabled || loading;

  const heights:   Record<Size, number> = { sm: 42, md: 52, lg: 58 };
  const fontSizes: Record<Size, number> = { sm: 14, md: 16, lg: 18 };
  const iconSizes: Record<Size, number> = { sm: 16, md: 18, lg: 20 };
  const paddings:  Record<Size, number> = { sm: 16, md: 24, lg: 28 };

  const variants: Record<Variant, { bg: string; border: string; textColor: string }> = {
    primary: { bg: c.primary,    border: c.primary,      textColor: c.textInverse },
    outline: { bg: 'transparent',border: c.primary,      textColor: c.primary     },
    ghost:   { bg: 'transparent',border: 'transparent',  textColor: c.primary     },
    danger:  { bg: c.error,      border: c.error,        textColor: c.textInverse },
  };

  const v          = variants[variant];
  const bg         = isDisabled ? c.border    : v.bg;
  const border     = isDisabled ? c.border    : v.border;
  const textColor  = isDisabled ? c.textMuted : v.textColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        {
          height:            heights[size],
          paddingHorizontal: paddings[size],
          backgroundColor:   bg,
          borderColor:       border,
          borderRadius:      r.lg,
          opacity:           isDisabled ? 0.6 : 1,
          // ── KEY: stretch fills parent width when fullWidth=true ──────────
          alignSelf:         fullWidth ? 'stretch' : 'flex-start',
          width:             fullWidth ? '100%'    : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {iconLeft && (
            <Ionicons name={iconLeft} size={iconSizes[size]} color={textColor} />
          )}
          <Text
            style={[
              styles.label,
              { fontFamily: f.sansSemi, fontSize: fontSizes[size], color: textColor },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {iconRight && (
            <Ionicons name={iconRight} size={iconSizes[size]} color={textColor} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    borderWidth:    1,
    gap:            8,
  },
  label: {
    textAlign: 'center',
  },
});
