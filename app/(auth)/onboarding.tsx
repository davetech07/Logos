 // app/(auth)/onboarding-tradition.tsx
// Install: npx expo install @expo-google-fonts/lora @expo-google-fonts/inter expo-font
// Icons:   npm install @expo/vector-icons (pre-installed with Expo)

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

// ── Design tokens ─────────────────────────────────────────────────────────────
const DEEP_GREEN   = '#0B3D2E';
const GREEN_BG     = '#E8F5EE';
const GOLD         = '#B8860B';
const BG           = '#F5F0E8';
const WHITE        = '#FFFFFF';
const TEXT_PRIMARY = '#1A1A2E';
const TEXT_MUTED   = '#9CA3AF';
const BORDER       = '#E5E7EB';
const PROGRESS_BG  = '#E5E7EB';

// ── Denomination data ─────────────────────────────────────────────────────────
type IconLib = 'Ionicons' | 'MaterialCommunityIcons';

type Denomination = {
  id:       string;
  label:    string;
  iconLib:  IconLib;
  iconName: string;
};

const DENOMINATIONS: Denomination[] = [
  { id: 'catholic',    label: 'Catholic',               iconLib: 'MaterialCommunityIcons', iconName: 'church'            },
  { id: 'baptist',     label: 'Baptist',                iconLib: 'MaterialCommunityIcons', iconName: 'church'            },
  { id: 'pentecostal', label: 'Pentecostal',            iconLib: 'Ionicons',               iconName: 'sparkles-outline'  },
  { id: 'anglican',    label: 'Anglican',               iconLib: 'MaterialCommunityIcons', iconName: 'bank-outline'      },
  { id: 'methodist',   label: 'Methodist',              iconLib: 'MaterialCommunityIcons', iconName: 'book-open-outline' },
  { id: 'non-denom',   label: 'Non-\ndenominational',   iconLib: 'Ionicons',               iconName: 'globe-outline'     },
  { id: 'orthodox',    label: 'Orthodox',               iconLib: 'MaterialCommunityIcons', iconName: 'script-outline'    },
  { id: 'seventh-day', label: 'Seventh-day\nAdventist', iconLib: 'Ionicons',               iconName: 'calendar-outline'  },
];

// ── Icon renderer ─────────────────────────────────────────────────────────────
function DenomIcon({ lib, name, selected }: { lib: IconLib; name: string; selected: boolean }) {
  const color = selected ? DEEP_GREEN : TEXT_MUTED;
  const size  = 28;
  if (lib === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
  }
  return <Ionicons name={name as any} size={size} color={color} />;
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function OnboardingTradition() {
  const [selected, setSelected] = useState<string>('non-denom');

  const [fontsLoaded] = useFonts({ Lora_700Bold, Inter_400Regular, Inter_600SemiBold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.stepLabel}>Step 2 of 3</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/onboarding_version')} hitSlop={12}>
          <Text style={styles.skipLabel}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* ── Progress bar — 66% for step 2 of 3 ──────────────────────────── */}
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>

      {/* ── Scrollable body ──────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>{"What's your church\ntradition?"}</Text>
        <Text style={styles.subtitle}>
          {"We'll personalise your study experience with relevant\ntranslations and historic commentaries."}
        </Text>

        {/* 2-column grid */}
        <View style={styles.grid}>
          {DENOMINATIONS.map((denom) => {
            const isSelected = selected === denom.id;
            return (
              <TouchableOpacity
                key={denom.id}
                activeOpacity={0.75}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelected(denom.id)}
              >
                {/* Gold checkmark — top right when selected */}
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark-circle" size={22} color={GOLD} />
                  </View>
                )}

                {/* Denomination icon */}
                <View style={styles.cardIconWrap}>
                  <DenomIcon lib={denom.iconLib} name={denom.iconName} selected={isSelected} />
                </View>

                {/* Label */}
                <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                  {denom.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Fixed footer — Previous + Continue ───────────────────────────── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.75}
        >
          <Ionicons name="chevron-back" size={18} color={TEXT_PRIMARY} />
          <Text style={styles.prevLabel}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.push({ pathname: '/(auth)/onboarding_version', params: { denomination: selected } })}
          activeOpacity={0.8}
        >
          <Text style={styles.continueLabel}>Continue</Text>
          <Ionicons name="chevron-forward" size={18} color={WHITE} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  // Top bar
  topBar: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 20,
    paddingVertical:   14,
  },
  backBtn: {
    width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
  stepLabel: {
    fontFamily:    'Lora_700Bold',
    fontSize:      17,
    color:         TEXT_PRIMARY,
    letterSpacing: 0.2,
  },
  skipLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize:   14,
    color:      TEXT_MUTED,
  },

  // Progress bar
  progressTrack: {
    height:          3,
    backgroundColor: PROGRESS_BG,
  },
  progressFill: {
    width:           '66%',
    height:          3,
    backgroundColor: DEEP_GREEN,
    borderRadius:    2,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop:        32,
  },

  // Heading & subtitle
  heading: {
    fontFamily:   'Lora_700Bold',
    fontSize:     26,
    color:        TEXT_PRIMARY,
    lineHeight:   34,
    textAlign:    'center',
    marginBottom: 14,
  },
  subtitle: {
    fontFamily:   'Inter_400Regular',
    fontSize:     14,
    color:        '#4A5568',
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

  // Card
  card: {
    width:           '47.5%',
    backgroundColor: WHITE,
    borderRadius:    14,
    borderWidth:     1,
    borderColor:     BORDER,
    padding:         16,
    paddingBottom:   20,
    minHeight:       130,
    justifyContent:  'space-between',
    position:        'relative',
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  cardSelected: {
    borderColor:     DEEP_GREEN,
    borderWidth:     2,
    backgroundColor: GREEN_BG,
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

  // Label
  cardLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize:   15,
    color:      TEXT_PRIMARY,
    lineHeight: 21,
  },
  cardLabelSelected: {
    fontFamily: 'Inter_600SemiBold',
    color:      DEEP_GREEN,
  },

  // Footer
  footer: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 20,
    paddingVertical:   16,
    paddingBottom:     Platform.OS === 'ios' ? 28 : 16,
    backgroundColor:   WHITE,
    borderTopWidth:    1,
    borderTopColor:    BORDER,
  },
  prevBtn: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               4,
    paddingVertical:   14,
    paddingHorizontal: 12,
  },
  prevLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize:   15,
    color:      TEXT_PRIMARY,
  },
  continueBtn: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               6,
    backgroundColor:   DEEP_GREEN,
    paddingVertical:   14,
    paddingHorizontal: 28,
    borderRadius:      14,
    minWidth:          150,
    justifyContent:    'center',
  },
  continueLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:   15,
    color:      WHITE,
  },
});
