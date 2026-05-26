 // app/(auth)/index.tsx

import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import { Inter_400Regular } from "@expo-google-fonts/inter";

// ── These are correct here — splash is ALWAYS green, light or dark mode ───────
// useTheme() is NOT needed because this screen never changes appearance
const DEEP_GREEN  = "#0B3D2E";
const GOLD        = "#B8860B";
const WHITE       = "#FFFFFF";
const WHITE_65    = "rgba(255,255,255,0.65)";
const WHITE_50    = "rgba(255,255,255,0.50)";
const GOLD_OPAQUE = "#B8860B";

export default function SplashScreen() {
  // ── Animated values ───────────────────────────────────────────────────────
  const iconOpacity    = useRef(new Animated.Value(0)).current;
  const iconTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity    = useRef(new Animated.Value(0)).current;
  const ruleScaleX     = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity    = useRef(new Animated.Value(0)).current;

  const dot1Scale = useRef(new Animated.Value(1)).current;
  const dot2Scale = useRef(new Animated.Value(1)).current;
  const dot3Scale = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({ Lora_700Bold, Inter_400Regular });

  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(iconOpacity,    { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(iconTranslateY, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity,    { toValue: 1, duration: 400, delay: 100, useNativeDriver: true }),
      Animated.timing(ruleScaleX,     { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(dotsOpacity,    { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start(() => startDotPulse());
  }, [fontsLoaded]);

  const startDotPulse = () => {
    const pulse = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1.5, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 1,   duration: 300, useNativeDriver: true }),
          Animated.delay(600),
        ])
      );

    Animated.parallel([
      pulse(dot1Scale, 0),
      pulse(dot2Scale, 200),
      pulse(dot3Scale, 400),
    ]).start();

    setTimeout(() => {
      router.replace("/(auth)/landing");
    }, 3000);
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      {/* ── FIX: translucent=false stops system UI bleeding in ─────────── */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={DEEP_GREEN}
        translucent={false}
      />

      {/* ── Bible icon ─────────────────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.iconWrap,
          { opacity: iconOpacity, transform: [{ translateY: iconTranslateY }] },
        ]}
      >
        <BibleIcon />
      </Animated.View>

      {/* ── App name ───────────────────────────────────────────────────── */}
      <Animated.View style={{ opacity: textOpacity, alignItems: "center" }}>
        <Text style={styles.appNameWhite}>Logos</Text>
        <Text style={styles.appNameGold}>AI</Text>
      </Animated.View>

      {/* ── Gold divider rule ──────────────────────────────────────────── */}
      <Animated.View
        style={[styles.rule, { transform: [{ scaleX: ruleScaleX }] }]}
      />

      {/* ── Tagline ────────────────────────────────────────────────────── */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Understand Scripture. Grow in faith.
      </Animated.Text>

      {/* ── Loading dots ───────────────────────────────────────────────── */}
      <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
        {([dot1Scale, dot2Scale, dot3Scale] as Animated.Value[]).map((scale, i) => (
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

// ── Bible icon — always white, no theme needed ────────────────────────────────
function BibleIcon() {
  return (
    <View style={styles.bookWrap}>
      <View style={styles.bookBody}>
        <View style={styles.bookSpine} />
        <View style={[styles.pageLine, { left: 10, top: 10 }]} />
        <View style={[styles.pageLine, { left: 10, top: 18 }]} />
        <View style={[styles.pageLine, { left: 10, top: 26 }]} />
        <View style={[styles.pageLine, { right: 10, top: 10 }]} />
        <View style={[styles.pageLine, { right: 10, top: 18 }]} />
        <View style={[styles.pageLine, { right: 10, top: 26 }]} />
      </View>
      <View style={styles.bookBase} />
    </View>
  );
}

// ── Styles — all colors are hardcoded intentionally (screen is always green) ──
const styles = StyleSheet.create({
  container: {
    flex:              1,
    backgroundColor:   DEEP_GREEN,   // always green — correct to hardcode
    alignItems:        "center",
    justifyContent:    "center",
    paddingHorizontal: 24,
  },

  // Icon
  iconWrap:  { marginBottom: 28 },
  bookWrap:  { width: 72, height: 56, alignItems: "center" },
  bookBody: {
    width:         72,
    height:        48,
    borderWidth:   2,
    borderColor:   WHITE,
    borderRadius:  3,
    flexDirection: "row",
    position:      "relative",
  },
  bookSpine: {
    position:        "absolute",
    left:            "50%" as any,
    top:             0,
    bottom:          0,
    width:           2,
    backgroundColor: WHITE,
  },
  pageLine: {
    position:        "absolute",
    width:           22,
    height:          1.5,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius:    1,
  },
  bookBase: {
    width:                   72,
    height:                  6,
    borderBottomLeftRadius:  6,
    borderBottomRightRadius: 6,
    borderWidth:             2,
    borderTopWidth:          0,
    borderColor:             WHITE,
    marginTop:               -1,
  },

  // Typography
  appNameWhite: {
    fontFamily:    "Lora_700Bold",
    fontSize:      36,
    color:         WHITE,
    letterSpacing: 0.5,
  },
  appNameGold: {
    fontFamily:    "Lora_700Bold",
    fontSize:      36,
    color:         GOLD,
    letterSpacing: 0.5,
    marginTop:     -4,
  },

  // Rule
  rule: {
    width:           52,
    height:          1.5,
    backgroundColor: GOLD,
    marginVertical:  18,
    borderRadius:    2,
  },

  // Tagline
  tagline: {
    fontFamily:    "Inter_400Regular",
    fontSize:      15,
    color:         WHITE_65,
    letterSpacing: 0.2,
    textAlign:     "center",
  },

  // Dots
  dotsRow: {
    position:      "absolute",
    bottom:        72,
    flexDirection: "row",
    alignItems:    "center",
    gap:           10,
  },
  dot: {
    width:           8,
    height:          8,
    borderRadius:    4,
    backgroundColor: GOLD,
  },
  dotMid: {
    width:        10,
    height:       10,
    borderRadius: 5,
  },

  // Loading text
  loadingText: {
    position:      "absolute",
    bottom:        48,
    fontFamily:    "Inter_400Regular",
    fontSize:      11,
    color:         WHITE_50,
    letterSpacing: 1.5,
    textAlign:     "center",
  },
});
