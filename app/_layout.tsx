// app/_layout.tsx
import { useFonts } from "expo-font";
import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { useAuthStore } from "../src/store/auth.store";
import { useThemeStore } from "../src/store/theme.store";
import React from "react";

export default function RootLayout() {
  const { theme, isDark } = useThemeStore();
  const { user, isLoading } = useAuthStore();
  const segments = useSegments();
  const c = theme.colors;

  // Keep splash screen visible while fonts load
  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);

  // ── Load custom fonts (add your font files to assets/fonts/) ──────────────
  const [fontsLoaded] = useFonts({
    // Uncomment once you add font files to assets/fonts/:
    // 'Lora-Regular':      require('../assets/fonts/Lora-Regular.ttf'),
    // 'Lora-Medium':       require('../assets/fonts/Lora-Medium.ttf'),
    // 'Lora-Bold':         require('../assets/fonts/Lora-Bold.ttf'),
    // 'Inter-Regular':     require('../assets/fonts/Inter-Regular.ttf'),
    // 'Inter-SemiBold':    require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  // ── Hide splash once fonts are ready ─────────────────────────────────────
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // ── Auth guard — redirect based on login state ────────────────────────────
  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Not logged in → send to auth
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // Logged in → send to main app
      router.replace("/(tabs)");
    }
  }, [user, segments, isLoading, fontsLoaded]);

  // ── Don't render until fonts are loaded ──────────────────────────────────
  if (!fontsLoaded) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      {/* Status bar adapts to theme */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={c.header}
        translucent={false}
      />

      <Stack
        screenOptions={{
          // ── Default header style (all screens) ──────────────────────────
          headerStyle: {
            backgroundColor: c.header,
          },
          headerTintColor: c.headerText,
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 17,
            color: c.headerText,
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,

          // ── Screen transitions ───────────────────────────────────────────
          animation: "slide_from_right",

          // ── Content background ───────────────────────────────────────────
          contentStyle: {
            backgroundColor: c.background,
          },
        }}
      >
        {/* Auth group — no header shown */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Main tabs — no header (each tab manages its own) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Bible reader stack */}
        <Stack.Screen name="(reader)" options={{ headerShown: false }} />

        {/* Chat stack */}
        <Stack.Screen name="(chat)" options={{ headerShown: false }} />

        {/* Devotional stack */}
        <Stack.Screen name="(devotional)" options={{ headerShown: false }} />

        {/* Settings stack */}
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />

        {/* Study plans stack */}
        <Stack.Screen name="(plans)" options={{ headerShown: false }} />

        {/* 404 fallback */}
        {/* <Stack.Screen
          name="Not_Found"
          options={{
            title: "Page not found",
            headerShown: true,
          }}
        /> */}
      </Stack>
    </View>
  );
}
