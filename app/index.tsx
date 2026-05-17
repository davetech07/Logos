// app/index.tsx
// This is the entry point of the app.
// It loads the saved user session then lets the auth guard
// in _layout.tsx handle the redirect to (auth) or (tabs).

import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "../src/hooks/useTheme";
import { useAuthStore } from "../src/store/auth.store";

export default function Index() {
  const { loadUser, isLoading } = useAuthStore();
  const theme = useTheme();

  useEffect(() => {
    loadUser();
  }, []);

  // Show a centered spinner while session is being restored
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />

      <Text style={{ padding: "auto", color: "white" }}> Loading...</Text>
    </View>
  );
}
