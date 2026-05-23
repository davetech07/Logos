 // app/(auth)/onboarding.tsx

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Lora_700Bold } from '@expo-google-fonts/lora';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/hooks/useTheme';
import { gs } from '@/src/constants/theme';

// ── Denomination data (static — no theme needed) ──────────────────────────────
type IconLib = 'Ionicons' | 'MaterialCommunityIcons';

type Denomination = {
  id:       string;
  label:    string;
  iconLib:  IconLib;
  iconName: string;
};

const DENOMINATIONS: Denomination[] = [
  { id: 'catholic',    label: 'Catholic',                iconLib: 'MaterialCommunityIcons', iconName: 'church'            },
  { id: 'baptist',     label: 'Baptist',                 iconLib: 'MaterialCommunityIcons', iconName: 'church'            },
  { id: 'pentecostal', label: 'Pentecostal',             iconLib: 'Ionicons',               iconName: 'sparkles-outline'  },
  { id: 'anglican',    label: 'Anglican',                iconLib: 'MaterialCommunityIcons', iconName: 'bank-outline'      },
  { id: 'methodist',   label: 'Methodist',               iconLib: 'MaterialCommunityIcons', iconName: 'book-open-outline' },
  { id: 'non-denom',   label: 'Non-\ndenominational',    iconLib: 'Ionicons',               iconName: 'globe-outline'     },
  { id: 'orthodox',    label: 'Orthodox',                iconLib: 'MaterialCommunityIcons', iconName: 'script-outline'    },
  { id: 'seventh-day', label: 'Seventh-day\nAdventist',  iconLib: 'Ionicons',               iconName: 'calendar-outline'  },
];

// ── Icon renderer ─────────────────────────────────────────────────────────────
function DenomIcon({
  lib, name, selected, activeColor, mutedColor,
}: {
  lib:         IconLib;
  name:        string;
  selected:    boolean;
  activeColor: string;
  mutedColor:  string;
}) {
  const color = selected ? activeColor : mutedColor;
  if (lib === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={name as any} size={28} color={color} />;
  }
  return <Ionicons name={name as any} size={28} color={color} />;
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Onboarding() {
  const [selected, setSelected] = useState<string>('non-denom');

  // ── Theme — one call, all tokens flow in ─────────────────────────────────
  const theme = useTheme();
  const { colors: c, fonts: f, sizes: s, radius: r, spacing: sp } = theme;

  const [fontsLoaded] = useFonts({ Lora_700Bold, Inter_400Regular, Inter_600SemiBold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.surfaceRaised }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={c.surfaceRaised}
        translucent={false}
      />

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <View style={[gs.rowBetween, styles.topBar]}>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          style={styles.backBtn}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color={c.text} />
        </TouchableOpacity>

        <Text style={[styles.stepLabel, { fontFamily: f.bold, color: c.text }]}>
          Step 2 of 3
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/onboarding_version')}
          hitSlop={12}
        >
          <Text style={[styles.skipLabel, { fontFamily: f.sans, color: c.textMuted }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Progress bar — 66% for step 2 of 3 ──────────────────────────── */}
      <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
        <View style={[styles.progressFill, { backgroundColor: c.primary }]} />
      </View>

      {/* ── Scrollable body ──────────────────────────────────────────────── */}
      <ScrollView
        style={gs.flex1}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { fontFamily: f.bold, color: c.text }]}>
          {"What's your church\ntradition?"}
        </Text>

        <Text style={[styles.subtitle, { fontFamily: f.sans, color: c.textSecondary }]}>
          {"We'll personalise your study experience with relevant\ntranslations and historic commentaries."}
        </Text>

        {/* ── 2-column denomination grid ───────────────────────────────── */}
        <View style={styles.grid}>
          {DENOMINATIONS.map((denom) => {
            const isSelected = selected === denom.id;
            return (
              <TouchableOpacity
                key={denom.id}
                activeOpacity={0.75}
                onPress={() => setSelected(denom.id)}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected ? c.successLight : c.surface,
                    borderColor:     isSelected ? c.primary      : c.border,
                    borderWidth:     isSelected ? 2              : 1,
                    borderRadius:    r.lg,
                  },
                ]}
              >
                {/* Gold checkmark top-right when selected */}
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark-circle" size={22} color={c.accent} />
                  </View>
                )}

                {/* Icon */}
                <View style={styles.cardIconWrap}>
                  <DenomIcon
                    lib={denom.iconLib}
                    name={denom.iconName}
                    selected={isSelected}
                    activeColor={c.primary}
                    mutedColor={c.textMuted}
                  />
                </View>

                {/* Label */}
                <Text
                  style={[
                    styles.cardLabel,
                    {
                      fontFamily: isSelected ? f.sansSemi : f.sans,
                      color:      isSelected ? c.primary  : c.text,
                    },
                  ]}
                >
                  {denom.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Fixed footer ─────────────────────────────────────────────────── */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: c.surface,
            borderTopColor:  c.border,
          },
        ]}
      >
        {/* Previous */}
        <TouchableOpacity
          style={[gs.rowCenter, styles.prevBtn]}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.75}
        >
          <Ionicons name="chevron-back" size={18} color={c.text} />
          <Text style={[styles.prevLabel, { fontFamily: f.sans, color: c.text }]}>
            Previous
          </Text>
        </TouchableOpacity>

        {/* Continue */}
        <TouchableOpacity
          style={[
            gs.rowCenter,
            styles.continueBtn,
            { backgroundColor: c.primary, borderRadius: r.lg },
          ]}
          onPress={() =>
            router.push({
              pathname: '/(auth)/onboarding_version',
              params:   { denomination: selected },
            })
          }
          activeOpacity={0.8}
        >
          <Text style={[styles.continueLabel, { fontFamily: f.sansSemi, color: c.textInverse }]}>
            Continue
          </Text>
          <Ionicons name="chevron-forward" size={18} color={c.textInverse} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Styles — layout only, zero color values ───────────────────────────────────
const styles = StyleSheet.create({
  // Top bar
  topBar: {
    paddingHorizontal: 20,
    paddingVertical:   14,
  },
  backBtn: {
    width:          36,
    height:         36,
    alignItems:     'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize:      17,
    letterSpacing: 0.2,
  },
  skipLabel: {
    fontSize: 14,
  },

  // Progress bar
  progressTrack: {
    height: 3,
  },
  progressFill: {
    width:        '66%',
    height:       3,
    borderRadius: 2,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop:        32,
  },

  // Heading & subtitle
  heading: {
    fontSize:     26,
    lineHeight:   34,
    textAlign:    'center',
    marginBottom: 14,
  },
  subtitle: {
    fontSize:     14,
    lineHeight:   22,
    textAlign:    'center',
    marginBottom: 32,
  },

  // Grid
  grid: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    gap:            12,
    justifyContent: 'space-between',
  },

  // Card — layout only, colors applied inline
  card: {
    width:          '47.5%',
    padding:        16,
    paddingBottom:  20,
    minHeight:      130,
    justifyContent: 'space-between',
    position:       'relative',
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },

  // Checkmark
  checkBadge: {
    position: 'absolute',
    top:      10,
    right:    10,
    zIndex:   10,
  },

  // Icon
  cardIconWrap: {
    marginBottom: 20,
    marginTop:    4,
  },

  // Label — font & color applied inline
  cardLabel: {
    fontSize:   15,
    lineHeight: 21,
  },

  // Footer
  footer: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 20,
    paddingVertical:   16,
    paddingBottom:     Platform.OS === 'ios' ? 28 : 16,
    borderTopWidth:    1,
  },
  prevBtn: {
    gap:               4,
    paddingVertical:   14,
    paddingHorizontal: 12,
  },
  prevLabel: {
    fontSize: 15,
  },
  continueBtn: {
    gap:               6,
    paddingVertical:   14,
    paddingHorizontal: 28,
    minWidth:          150,
    justifyContent:    'center',
  },
  continueLabel: {
    fontSize: 15,
  },
});
