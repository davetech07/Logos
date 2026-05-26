 // app/(auth)/landing.tsx

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useFonts, Lora_700Bold, Lora_400Regular } from '@expo-google-fonts/lora';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useTheme } from '@/src/hooks/useTheme';
import { gs } from '@/src/constants/theme';

const { height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.42;

// ── Bible icon ────────────────────────────────────────────────────────────────
function BibleIcon() {
  return (
    <View style={styles.bookWrap}>
      <View style={styles.bookBody}>
        <View style={styles.bookSpine} />
        <View style={[styles.pageLine, { left: 9,  top: 9  }]} />
        <View style={[styles.pageLine, { left: 9,  top: 17 }]} />
        <View style={[styles.pageLine, { left: 9,  top: 25 }]} />
        <View style={[styles.pageLine, { right: 9, top: 9  }]} />
        <View style={[styles.pageLine, { right: 9, top: 17 }]} />
        <View style={[styles.pageLine, { right: 9, top: 25 }]} />
      </View>
      <View style={styles.bookBase} />
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Landing() {
  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Lora_400Regular,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return (
    <View style={{ flex: 1, backgroundColor: '#0B3D2E' }} />
  );

  return (
    <View style={gs.flex1}>
      <StatusBar barStyle="light-content" backgroundColor="#0B3D2E" translucent={false} />

      {/* ── Green hero zone ─────────────────────────────────────────────── */}
      <View style={styles.heroZone}>
        <View style={styles.gridOverlay} />
        <BibleIcon />
        <Text style={styles.appName}>Logos AI</Text>
        <Text style={styles.tagline}>Your intelligent Bible companion</Text>
      </View>

      {/* ── Cream content zone ──────────────────────────────────────────── */}
      {/*
        Layout strategy:
        - flex: 1 so it fills remaining space below hero
        - justifyContent: 'space-between' pushes buttons to center
          and terms to the bottom
        - Middle section (buttons) uses flex:1 + center alignment
          so buttons sit in the vertical middle of the cream zone
      */}
      <SafeAreaView
        edges={['bottom']}
        style={[styles.contentZone, { backgroundColor: c.background }]}
      >
        {/* ── Center section — buttons ─────────────────────────────────── */}
        <View style={styles.buttonsSection}>
          {/* Get started — primary */}
          <TouchableOpacity
            style={[
              styles.btnPrimary,
              { backgroundColor: c.primary, borderRadius: r.lg },
            ]}
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnPrimaryLabel, { fontFamily: f.sansSemi, color: c.textInverse }]}>
              Get started
            </Text>
          </TouchableOpacity>

          {/* I already have an account — outline */}
          <TouchableOpacity
            style={[
              styles.btnOutline,
              { borderColor: c.border, borderRadius: r.lg },
            ]}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.75}
          >
            <Text style={[styles.btnOutlineLabel, { fontFamily: f.sans, color: c.text }]}>
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Bottom section — terms pinned to base ────────────────────── */}
        <View style={styles.termsSection}>
          <Text style={[styles.termsText, { fontFamily: f.sans, color: c.textMuted }]}>
            By continuing you agree to our{' '}
            <Text
              style={[styles.termsLink, { color: c.accent }]}
              onPress={() => {/* open terms */}}
            >
              Terms
            </Text>
            {' '}and{' '}
            <Text
              style={[styles.termsLink, { color: c.accent }]}
              onPress={() => {/* open privacy */}}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Hero
  heroZone: {
    height:            HERO_HEIGHT,
    backgroundColor:   '#0B3D2E',
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: 32,
    position:          'relative',
    overflow:          'hidden',
  },
  gridOverlay: {
    position:        'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity:         0.06,
    borderWidth:     0.5,
    borderColor:     '#FFFFFF',
  },

  // Bible icon
  bookWrap:  { width: 68, height: 54, alignItems: 'center', marginBottom: 20 },
  bookBody: {
    width:        68,
    height:       44,
    borderWidth:  2,
    borderColor:  'rgba(255,255,255,0.90)',
    borderRadius: 3,
    position:     'relative',
  },
  bookSpine: {
    position:        'absolute',
    left:            '50%' as any,
    top:             0,
    bottom:          0,
    width:           2,
    backgroundColor: 'rgba(255,255,255,0.90)',
  },
  pageLine: {
    position:        'absolute',
    width:           20,
    height:          1.5,
    backgroundColor: 'rgba(255,255,255,0.40)',
    borderRadius:    1,
  },
  bookBase: {
    width:                   68,
    height:                  6,
    borderBottomLeftRadius:  5,
    borderBottomRightRadius: 5,
    borderWidth:             2,
    borderTopWidth:          0,
    borderColor:             'rgba(255,255,255,0.90)',
    marginTop:               -1,
  },

  // App name & tagline — always on green, safe to hardcode
  appName: {
    fontFamily:    'Lora_700Bold',
    fontSize:      30,
    color:         '#FFFFFF',
    letterSpacing: 0.3,
    marginBottom:  10,
  },
  tagline: {
    fontFamily: 'Lora_400Regular',
    fontSize:   15,
    color:      'rgba(255,255,255,0.70)',
    textAlign:  'center',
  },

  // Content zone — space-between pushes buttons center, terms to bottom
  contentZone: {
    flex:              1,
    paddingHorizontal: 24,
    paddingTop:        24,
    paddingBottom:     16,
    justifyContent:    'space-between',  // ← key: splits buttons and terms
  },

  // Buttons section — centered vertically in its space
  buttonsSection: {
    flex:           1,                   // ← takes all remaining space
    justifyContent: 'center',            // ← centers buttons vertically
    gap:            14,
  },

  // Primary button
  btnPrimary: {
    height:         52,
    alignItems:     'center',
    justifyContent: 'center',
  },
  btnPrimaryLabel: {
    fontSize: 16,
  },

  // Outline button
  btnOutline: {
    height:         52,
    alignItems:     'center',
    justifyContent: 'center',
    borderWidth:    1,
  },
  btnOutlineLabel: {
    fontSize: 16,
  },

  // Terms — pinned to bottom by space-between
  termsSection: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  termsText: {
    fontSize:   12,
    lineHeight: 20,
    textAlign:  'center',
  },
  termsLink: {
    fontSize:           12,
    lineHeight:         20,
    textDecorationLine: 'underline',
  },
});
