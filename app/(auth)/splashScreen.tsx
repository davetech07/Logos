import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import { Inter_400Regular } from "@expo-google-fonts/inter";

const { width, height } = Dimensions.get("window");

// ── Design tokens (match your theme.ts) ─────────────────────────────────────
const DEEP_GREEN = "#0B3D2E";
const GOLD = "#B8860B";
const WHITE = "#FFFFFF";

export default function SplashScreen() {
  // ── Animated values ───────────────────────────────────────────────────────
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ruleScaleX = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  // ── Dot pulse loop ────────────────────────────────────────────────────────
  const dot1Scale = useRef(new Animated.Value(1)).current;
  const dot2Scale = useRef(new Animated.Value(1)).current;
  const dot3Scale = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Inter_400Regular,
  });

  // ── Entry animation sequence ──────────────────────────────────────────────
  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.sequence([
      // 1. Icon fades + rises in
      Animated.parallel([
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(iconTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      // 2. App name fades in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),

      // 3. Gold rule scales in from center
      Animated.timing(ruleScaleX, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),

      // 4. Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      // 5. Loading dots appear
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startDotPulse();
    });
  }, [fontsLoaded]);

  // ── Dot pulse animation (loops) ───────────────────────────────────────────
  const startDotPulse = () => {
    const pulse = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(600),
        ]),
      );

    Animated.parallel([
      pulse(dot1Scale, 0),
      pulse(dot2Scale, 200),
      pulse(dot3Scale, 400),
    ]).start();

    // ── Navigate to auth after 3s ─────────────────────────────────────────
    setTimeout(() => {
      router.replace("/(auth)/onboarding");
    }, 3000);
  };

  // Don't render until fonts ready
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DEEP_GREEN} />

      {/* ── Bible icon ─────────────────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.iconWrap,
          {
            opacity: iconOpacity,
            transform: [{ translateY: iconTranslateY }],
          },
        ]}
      >
        <BibleIcon />
      </Animated.View>

      {/* ── App name ───────────────────────────────────────────────────── */}
      <Animated.View style={{ opacity: textOpacity, alignItems: "center" }}>
        <Text style={styles.appNameBlack}>Scripture</Text>
        <Text style={styles.appNameGold}>AI</Text>
      </Animated.View>

      {/* ── Gold rule ──────────────────────────────────────────────────── */}
      <Animated.View
        style={[styles.rule, { transform: [{ scaleX: ruleScaleX }] }]}
      />

      {/* ── Tagline ────────────────────────────────────────────────────── */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Understand Scripture. Grow in faith.
      </Animated.Text>

      {/* ── Loading dots ───────────────────────────────────────────────── */}
      <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
        {[dot1Scale, dot2Scale, dot3Scale].map((scale, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              i === 1 && styles.dotMid,
              { transform: [{ scale }] },
            ]}
          />
        ))}
      </Animated.View>

      {/* ── Loading label ──────────────────────────────────────────────── */}
      <Animated.Text style={[styles.loadingText, { opacity: dotsOpacity }]}>
        LOADING YOUR BIBLE...
      </Animated.Text>
    </View>
  );
}

// ── Inline Bible SVG icon (white line art, no native deps needed) ────────────
function BibleIcon() {
  return (
    <View style={styles.bookWrap}>
      {/* Book body */}
      <View style={styles.bookBody}>
        {/* Spine line */}
        <View style={styles.bookSpine} />
        {/* Left page lines */}
        <View style={[styles.pageLine, { left: 10, top: 10 }]} />
        <View style={[styles.pageLine, { left: 10, top: 18 }]} />
        <View style={[styles.pageLine, { left: 10, top: 26 }]} />
        {/* Right page lines */}
        <View style={[styles.pageLine, { right: 10, top: 10 }]} />
        <View style={[styles.pageLine, { right: 10, top: 18 }]} />
        <View style={[styles.pageLine, { right: 10, top: 26 }]} />
      </View>
      {/* Open book bottom curve */}
      <View style={styles.bookBase} />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEEP_GREEN,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  // ── Icon ──────────────────────────────────────────────────────────────────
  iconWrap: {
    marginBottom: 28,
  },
  bookWrap: {
    width: 72,
    height: 56,
    alignItems: "center",
  },
  bookBody: {
    width: 72,
    height: 48,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 3,
    flexDirection: "row",
    position: "relative",
  },
  bookSpine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: WHITE,
  },
  pageLine: {
    position: "absolute",
    width: 22,
    height: 1.5,
    backgroundColor: `${WHITE}80`,
    borderRadius: 1,
  },
  bookBase: {
    width: 72,
    height: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: WHITE,
    marginTop: -1,
  },

  // ── Typography ────────────────────────────────────────────────────────────
  appNameBlack: {
    fontFamily: "Lora_700Bold",
    fontSize: 36,
    color: WHITE,
    letterSpacing: 0.5,
  },
  appNameGold: {
    fontFamily: "Lora_700Bold",
    fontSize: 36,
    color: GOLD,
    letterSpacing: 0.5,
    marginTop: -4,
  },

  // ── Rule ──────────────────────────────────────────────────────────────────
  rule: {
    width: 52,
    height: 1.5,
    backgroundColor: GOLD,
    marginVertical: 18,
    borderRadius: 2,
  },

  // ── Tagline ───────────────────────────────────────────────────────────────
  tagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: `${WHITE}A6`, // white at ~65% opacity
    letterSpacing: 0.2,
    textAlign: "center",
  },

  // ── Dots ──────────────────────────────────────────────────────────────────
  dotsRow: {
    position: "absolute",
    bottom: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GOLD,
  },
  dotMid: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  // ── Loading text ──────────────────────────────────────────────────────────
  loadingText: {
    position: "absolute",
    bottom: 48,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: `${WHITE}80`,
    letterSpacing: 1.5,
    textAlign: "center",
  },
});
