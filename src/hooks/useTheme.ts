// src/hooks/useTheme.ts
import { AppTheme } from "../constants/theme";
import { useThemeStore } from "../store/theme.store";

export const useTheme = (): AppTheme => {
  return useThemeStore((state) => state.theme);
};

// Usage in any component:
//
//   const theme = useTheme();
//
//   <View style={{ backgroundColor: theme.colors.background }}>
//     <Text style={{ color: theme.colors.text, fontSize: theme.sizes.base }}>
//       Hello
//     </Text>
//   </View>
