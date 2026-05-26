// app/(auth)/onboarding-complete.tsx

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useTheme } from "@/src/hooks/useTheme";
import { gs } from "@/src/constants/theme";
import { AppButton } from "@/src/components/AppButton";

// ── Denomination display map ──────────────────────────────────────────────────
const DENOM_LABELS: Record<string, string> = {
  catholic: "Catholic",
  baptist: "Baptist",
  pentecostal: "Pentecostal",
  anglican: "Anglican",
  methodist: "Methodist",
  "non-denom": "Non-denominational",
  orthodox: "Orthodox",
  "seventh-day": "Seventh-day Adventist",
};

// ── Bible version display map ─────────────────────────────────────────────────
const VERSION_LABELS: Record<string, string> = {
  niv: "NIV (New International Version)",
  esv: "ESV (English Standard Version)",
  kjv: "KJV (King James Version)",
  nlt: "NLT (New Living Translation)",
  amp: "AMP (Amplified Bible)",
};

// ── Stat chips ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "50+", label: "Versions" },
  { value: "∞", label: "AI Questions" },
  { value: "365", label: "Devotionals" },
];

// ── Summary row component ─────────────────────────────────────────────────────
function SummaryRow({
  iconLib,
  iconName,
  label,
  value,
  borderBottom,
}: {
  iconLib: "Ionicons" | "MaterialCommunityIcons";
  iconName: any;
  label: string;
  value: string;
  borderBottom?: boolean;
}) {
  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  return (
    <View
      style={[
        styles.summaryRow,
        borderBottom && { borderBottomWidth: 1, borderBottomColor: c.border },
      ]}
    >
      {/* Icon */}
      <View
        style={[
          styles.summaryIcon,
          { backgroundColor: c.successLight, borderRadius: r.md },
        ]}
      >
        {iconLib === "MaterialCommunityIcons" ? (
          <MaterialCommunityIcons name={iconName} size={22} color={c.primary} />
        ) : (
          <Ionicons name={iconName} size={22} color={c.primary} />
        )}
      </View>

      {/* Text */}
      <View style={styles.summaryText}>
        <Text
          style={[
            styles.summaryLabel,
            { fontFamily: f.sans, color: c.textSecondary },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.summaryValue,
            { fontFamily: f.sansSemi, color: c.text },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function OnboardingComplete() {
  const params = useLocalSearchParams<{
    denomination: string;
    bibleVersion: string;
  }>();

  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const denomLabel =
    DENOM_LABELS[params.denomination] ?? params.denomination ?? "Baptist";
  const versionLabel =
    VERSION_LABELS[params.bibleVersion] ??
    params.bibleVersion ??
    "NIV (New International Version)";

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.primary }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={c.primary}
        translucent={false}
      />

      {/* ── Green hero zone ─────────────────────────────────────────────── */}
      <View style={styles.heroZone}>
        {/* Checkmark circle */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={38} color={c.textInverse} />
        </View>

        {/* Heading */}
        <Text
          style={[
            styles.heroHeading,
            { fontFamily: f.bold, color: c.textInverse },
          ]}
        >
          You're all set!
        </Text>

        {/* Subheading */}
        <Text
          style={[
            styles.heroSubtitle,
            { fontFamily: f.sans, color: "rgba(255,255,255,0.70)" },
          ]}
        >
          Your personalised experience is ready.
        </Text>
      </View>

      {/* ── White content sheet ──────────────────────────────────────────── */}
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: c.surface,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Configuration summary card ─────────────────────────────── */}
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: c.surface,
                borderColor: c.border,
                borderRadius: r.lg,
              },
            ]}
          >
            {/* Card header */}
            <Text
              style={[
                styles.summaryCardHeader,
                { fontFamily: f.sansSemi, color: c.textMuted },
              ]}
            >
              CONFIGURATION SUMMARY
            </Text>

            {/* Row 1 — Tradition */}
            <SummaryRow
              iconLib="MaterialCommunityIcons"
              iconName="church"
              label="Tradition"
              value={denomLabel}
              borderBottom
            />

            {/* Row 2 — Bible version */}
            <SummaryRow
              iconLib="MaterialCommunityIcons"
              iconName="book-open-outline"
              label="Bible Version"
              value={versionLabel}
              borderBottom
            />

            {/* Row 3 — Daily reminder */}
            <SummaryRow
              iconLib="Ionicons"
              iconName="notifications-outline"
              label="Daily Reminder"
              value="7:00 AM"
            />
          </View>

          {/* ── Stat chips ─────────────────────────────────────────────── */}
          <View style={styles.statsRow}>
            {STATS.map((stat) => (
              <View
                key={stat.label}
                style={[
                  styles.statChip,
                  {
                    backgroundColor: c.background,
                    borderColor: c.border,
                    borderRadius: r.lg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statValue,
                    { fontFamily: f.sansBold, color: c.primary },
                  ]}
                >
                  {stat.value}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { fontFamily: f.sans, color: c.textSecondary },
                  ]}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* ── CTA button ─────────────────────────────────────────────── */}
          <AppButton
            label="Open Logos AI"
            onPress={() => router.replace("/(tabs)")}
            iconRight="arrow-forward"
            fullWidth
            style={styles.ctaBtn}
          />

          <View style={{ height: Platform.OS === "ios" ? 16 : 24 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ── Styles — layout only ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Hero
  heroZone: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  heroHeading: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },

  // Sheet
  sheet: {
    flex: 1,
    overflow: "hidden",
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  // Summary card
  summaryCard: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  summaryCardHeader: {
    fontSize: 11,
    letterSpacing: 0.9,
    marginBottom: 16,
  },

  // Summary row
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  summaryText: { flex: 1 },
  summaryLabel: { fontSize: 12, lineHeight: 16, marginBottom: 2 },
  summaryValue: { fontSize: 15, lineHeight: 21 },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statChip: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    gap: 2,
  },
  statValue: { fontSize: 16, lineHeight: 22 },
  statLabel: { fontSize: 11, lineHeight: 15 },

  // CTA
  ctaBtn: { marginBottom: 4 },
});
