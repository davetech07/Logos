 // src/hooks/useTheme.ts
// ─────────────────────────────────────────────────────────────────────────────
// THE only hook every screen and component needs.
// One import. One line. Full theme access.
// ─────────────────────────────────────────────────────────────────────────────

import { useThemeStore } from '../store/theme.store';
import { AppTheme } from '../constants/theme';

export const useTheme = (): AppTheme => {
  return useThemeStore((state) => state.theme);
};

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE IN ANY SCREEN OR COMPONENT:
//
//   import { useTheme } from '@/src/hooks/useTheme';
//   import { gs }       from '@/src/constants/theme';
//
//   export default function MyScreen() {
//     const theme = useTheme();
//     const { colors: c, sizes: s, spacing: sp, radius: r } = theme;
//
//     return (
//       <View style={[gs.flex1, { backgroundColor: c.background }]}>
//         <View style={[gs.px6, gs.py4]}>
//           <Text style={{ fontFamily: theme.fonts.bold, fontSize: s.xl, color: c.text }}>
//             Hello
//           </Text>
//           <Text style={{ fontFamily: theme.fonts.sans, fontSize: s.base, color: c.textSecondary }}>
//             Subtitle here
//           </Text>
//         </View>
//
//         <TouchableOpacity style={[gs.btnBase, { backgroundColor: c.primary }]}>
//           <Text style={{ color: c.textInverse, fontFamily: theme.fonts.sansSemi }}>
//             Continue
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────
// DESTRUCTURING SHORTHAND (use this pattern in every file):
//
//   const theme                                    = useTheme();
//   const { colors: c, sizes: s, spacing: sp,
//           radius: r, fonts: f, shadow: sh }      = theme;
//
//   Then use:
//     c.primary        → '#0B3D2E'
//     c.background     → '#FAFAF7'  (or dark equivalent automatically)
//     s.xl             → 24
//     sp['6']          → 24
//     r.lg             → 14
//     f.bold           → 'Lora_700Bold'
//     f.sansSemi       → 'Inter_600SemiBold'
//     sh.md            → { shadowColor, shadowOffset, ... }
// ─────────────────────────────────────────────────────────────────────────────
