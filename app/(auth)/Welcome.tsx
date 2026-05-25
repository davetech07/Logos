// app/(auth)/welcome.tsx

import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useTheme } from "@/src/hooks/useTheme";
import { gs } from "@/src/constants/theme";
import { AppButton } from "@/src/components/AppButton";

const { width, height } = Dimensions.get("window");
const HERO_HEIGHT = height * 0.38;

// ── Feature list data ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: "chat",
    icon: "chatbubble-outline" as const,
    iconLib: "Ionicons",
    title: "AI Bible Chat",
    subtitle: "Ask any question and receive scholarly insights.",
  },
  {
    id: "reader",
    icon: "book-open-outline" as const,
    iconLib: "MaterialCommunityIcons",
    title: "Smart Bible Reader",
    subtitle: "Compare over 50 translations side-by-side.",
  },
  {
    id: "devotional",
    icon: "sunny-outline" as const,
    iconLib: "Ionicons",
    title: "Daily Devotionals",
    subtitle: "A personalized journey through the Word daily.",
  },
];

// ── Feature icon renderer ─────────────────────────────────────────────────────
function FeatureIcon({
  lib,
  name,
  color,
}: {
  lib: string;
  name: any;
  color: string;
}) {
  if (lib === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons name={name} size={22} color={color} />;
  }
  return <Ionicons name={name} size={22} color={color} />;
}

// ── Bible hero illustration ───────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <View style={styles.heroIllustration}>
      {/* Outer glow ring */}
      <View style={styles.glowRingOuter} />
      <View style={styles.glowRingInner} />

      {/* Bible icon */}
      <View style={styles.bookWrap}>
        <View style={styles.bookBody}>
          <View style={styles.bookSpine} />
          {/* Left page lines */}
          <View style={[styles.pageLine, { left: 8, top: 8 }]} />
          <View style={[styles.pageLine, { left: 8, top: 15 }]} />
          <View style={[styles.pageLine, { left: 8, top: 22 }]} />
          {/* Right page lines */}
          <View style={[styles.pageLine, { right: 8, top: 8 }]} />
          <View style={[styles.pageLine, { right: 8, top: 15 }]} />
          <View style={[styles.pageLine, { right: 8, top: 22 }]} />
        </View>
        <View style={styles.bookBase} />
      </View>

      {/* Light rays radiating out */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <View
          key={i}
          style={[
            styles.ray,
            {
              transform: [{ rotate: `${angle}deg` }, { translateY: -52 }],
            },
          ]}
        />
      ))}
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Welcome() {
  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.primary }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={c.primary}
        translucent={false}
      />

      {/* ── Green hero zone (top 38%) ───────────────────────────────────── */}
      <View style={styles.heroZone}>
        <HeroIllustration />

        {/* Pagination dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dotActive, { backgroundColor: "#FFFFFF" }]} />
          <View
            style={[
              styles.dotInactive,
              { backgroundColor: "rgba(255,255,255,0.35)" },
            ]}
          />
          <View
            style={[
              styles.dotInactive,
              { backgroundColor: "rgba(255,255,255,0.35)" },
            ]}
          />
        </View>
      </View>

      {/* ── White content sheet (bottom 62%) ────────────────────────────── */}
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
        <View style={styles.sheetContent}>
          {/* Heading */}
          <Text style={[styles.heading, { fontFamily: f.bold, color: c.text }]}>
            Welcome to Logos AI
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.subtitle,
              { fontFamily: f.sans, color: c.textSecondary },
            ]}
          >
            Your AI-powered Bible study companion{"\n"}
            for deep theological insight and reflection.
          </Text>

          {/* Feature rows */}
          <View style={styles.featureList}>
            {FEATURES.map((feature) => (
              <View
                key={feature.id}
                style={[
                  styles.featureRow,
                  {
                    backgroundColor: c.surface,
                    borderColor: c.border,
                    borderRadius: r.lg,
                  },
                ]}
              >
                {/* Icon container */}
                <View
                  style={[
                    styles.featureIconWrap,
                    { backgroundColor: c.successLight, borderRadius: r.md },
                  ]}
                >
                  <FeatureIcon
                    lib={feature.iconLib}
                    name={feature.icon}
                    color={c.primary}
                  />
                </View>

                {/* Text */}
                <View style={styles.featureText}>
                  <Text
                    style={[
                      styles.featureTitle,
                      { fontFamily: f.sansSemi, color: c.text },
                    ]}
                  >
                    {feature.title}
                  </Text>
                  <Text
                    style={[
                      styles.featureSubtitle,
                      { fontFamily: f.sans, color: c.textSecondary },
                    ]}
                  >
                    {feature.subtitle}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* CTA button */}
          <AppButton
            label="Get Started"
            onPress={() => router.push("/(auth)/Complete")}
            fullWidth
            style={styles.ctaBtn}
          />
          
        </View>
      </View>
    </SafeAreaView>
  );
}

// ── Styles — layout only ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Hero zone
  heroZone: {
    height: HERO_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  // Illustration
  heroIllustration: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glowRingOuter: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  glowRingInner: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  // Bible book
  bookWrap: { width: 60, height: 48, alignItems: "center", zIndex: 2 },
  bookBody: {
    width: 60,
    height: 40,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
    borderRadius: 3,
    position: "relative",
  },
  bookSpine: {
    position: "absolute",
    left: "50%" as any,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  pageLine: {
    position: "absolute",
    width: 18,
    height: 1.5,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 1,
  },
  bookBase: {
    width: 60,
    height: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: "rgba(255,255,255,0.9)",
    marginTop: -1,
  },

  // Light rays
  ray: {
    position: "absolute",
    width: 1,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 1,
    top: "50%" as any,
    left: "50%" as any,
    marginLeft: -0.5,
  },

  // Pagination dots
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    alignItems: "center",
  },
  dotActive: {
    width: 24,
    height: 7,
    borderRadius: 4,
  },
  dotInactive: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  // Sheet
  sheet: {
    flex: 1,
    overflow: "hidden",
  },
  sheetContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  // Heading & subtitle
  heading: {
    fontSize: 28,
    lineHeight: 36,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 28,
  },

  // Feature list
  featureList: {
    gap: 12,
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderWidth: 1,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 15, lineHeight: 21, marginBottom: 2 },
  featureSubtitle: { fontSize: 13, lineHeight: 19 },

  // CTA
  ctaBtn: { marginBottom: 4 },

  // Sign in
  signinText: { fontSize: 14 },
  signinLink: { fontSize: 14 },
});
