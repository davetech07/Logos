// app/(auth)/onboarding_version.tsx

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  AppRegistry,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { gs } from "@/src/constants/theme";
import { useTheme } from "@/src/hooks/useTheme";
import { AppButton } from "@/src/components/AppButton";


// ── Bible version data ────────────────────────────────────────────────────────
type BibleVersion = {
  id: string;
  abbr: string;
  name: string;
  description: string;
};

const BIBLE_VERSIONS: BibleVersion[] = [
  {
    id: "niv",
    abbr: "NIV",
    name: "New International Version",
    description: "Balance of accuracy and readability.",
  },
  {
    id: "esv",
    abbr: "ESV",
    name: "English Standard Version",
    description: "Essentially literal word-for-word translation.",
  },
  {
    id: "kjv",
    abbr: "KJV",
    name: "King James Version",
    description: "Classic, poetic English translation.",
  },
  {
    id: "nlt",
    abbr: "NLT",
    name: "New Living Translation",
    description: "Easy to understand, thought-for-thought.",
  },
  {
    id: "amp",
    abbr: "AMP",
    name: "Amplified Bible",
    description: "Captures the full meaning of word nuances.",
  },
];

// ── Main screen ───────────────────────────────────────────────────────────────
export default function OnboardingVersion() {
  const [selected, setSelected] = useState<string>("niv");
  const params = useLocalSearchParams<{ denomination: string }>();

  const theme = useTheme();
  const { colors: c, fonts: f, radius: r, spacing: sp } = theme;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });
  if (!fontsLoaded) return null;

  const handleContinue = () => {
    router.push({
      pathname: "/(auth)/onboarding-complete",
      params: { denomination: params.denomination, bibleVersion: selected },
    });
  };

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.background }]}>
       <StatusBar
        barStyle="dark-content"
        backgroundColor={c.background}
        translucent={false}
      />

      {/* ── Top bar ────────────────────────────────────────────────────── */}
      <View style={[gs.rowBetween, styles.topBar]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color={c.text} />
        </TouchableOpacity>

        <Text style={[styles.stepLabel, { fontFamily: f.bold, color: c.text }]}>
          Step 3 of 3
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/Welcome")}
          hitSlop={12}
          style={gs.rowCenter}
        >
          <Text
            style={[
              styles.skipLabel,
              { fontFamily: f.sans, color: c.textMuted },
            ]}
          >
            Skip
          </Text>
          <Ionicons name="close" size={14} color={c.textMuted} />
        </TouchableOpacity>
      </View>

      {/* FIX 2 — progress bar: track wraps fill, fill has explicit width */}
      <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
        <View style={[styles.progressFill, { backgroundColor: c.primary }]} />
      </View>

      {/* ── Scrollable body ────────────────────────────────────────────── */}
      <ScrollView
        style={gs.flex1}
        contentContainerStyle={[gs.px6, styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { fontFamily: f.bold, color: c.text }]}>
          Choose your Bible version
        </Text>

        <Text
          style={[
            styles.subtitle,
            { fontFamily: f.sans, color: c.textSecondary },
          ]}
        >
          You can always change this later.
        </Text>

        <View style={styles.list}>
          {BIBLE_VERSIONS.map((version, index) => {
            const isSelected = selected === version.id;
            return (
              <TouchableOpacity
                key={version.id}
                activeOpacity={0.75}
                onPress={() => setSelected(version.id)}
                style={[
                  styles.versionCard,
                  {
                    borderColor: isSelected ? c.primary : c.border,
                    borderWidth: isSelected ? 1.5 : 1,
                    backgroundColor: isSelected ? c.successLight : c.surface,
                    borderRadius: r.lg,
                  },
                  index === BIBLE_VERSIONS.length - 1 && {
                    marginBottom: sp["4"],
                  },
                ]}
              >
                {/* Abbr badge */}
                <View
                  style={[
                    styles.abbrBadge,
                    {
                      backgroundColor: isSelected ? c.primary : c.successLight,
                      borderRadius: r.sm,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.abbrText,
                      {
                        fontFamily: f.sansSemi,
                        color: isSelected ? c.textInverse : c.primary,
                      },
                    ]}
                  >
                    {version.abbr}
                  </Text>
                </View>

                {/* Name + description */}
                <View style={styles.versionInfo}>
                  <Text
                    style={[
                      styles.versionName,
                      {
                        fontFamily: isSelected ? f.sansSemi : f.sans,
                        color: c.text,
                      },
                    ]}
                  >
                    {version.name}
                  </Text>
                  <Text
                    style={[
                      styles.versionDesc,
                      { fontFamily: f.sans, color: c.textSecondary },
                    ]}
                  >
                    {version.description}
                  </Text>
                </View>

                {/* Radio circle */}
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: isSelected ? c.primary : c.border,
                      backgroundColor: isSelected ? c.primary : "transparent",
                    },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: c.textInverse },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <AppButton
          label="Continue"
          onPress={()=> router.push({ pathname: "/(auth)/Welcome", params: { denomination: params.denomination, bibleVersion: selected } })}
          iconRight="chevron-forward"
          fullWidth
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <View
        style={[
          styles.footer,
          { backgroundColor: c.background, borderTopColor: c.border },
        ]}
      >
        <Text
          style={[
            styles.footerNote,
            { fontFamily: f.sans, color: c.textMuted },
          ]}
        >
          You can add more versions later
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ── Styles — layout only, zero color values ───────────────────────────────────
const styles = StyleSheet.create({
  topBar: { paddingHorizontal: 20, paddingVertical: 14 },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: { fontSize: 17, letterSpacing: 0.2 },
  skipLabel: { fontSize: 14, marginRight: 3 },

  // FIX 2 — separate track and fill styles
  progressTrack: { height: 3 },
  progressFill: { height: 3, width: "100%", borderRadius: 2 },

  scrollContent: { paddingTop: 32 },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 28,
  },
  list: { gap: 12 },

  versionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },

  abbrBadge: {
    width: 48,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  abbrText: { fontSize: 13 },

  versionInfo: { flex: 1, gap: 3 },
  versionName: { fontSize: 15, lineHeight: 21 },
  versionDesc: { fontSize: 13, lineHeight: 18 },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioDot: { width: 8, height: 8, borderRadius: 4 },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 20,
    borderTopWidth: 1,
    gap: 10,
    alignItems: "center",
  },
  continueLabel: { fontSize: 16 },
  footerNote: { fontSize: 13 },
});
