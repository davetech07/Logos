// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { AppText } from "../../src/components/AppText";
import { useAuthStore } from "../../src/store/auth.store";
import { useThemeStore } from "../../src/store/theme.store";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabIconProps {
  name: IconName;
  focused: boolean;
  color: string;
  size: number;
  label: string;
}

function TabIcon({ name, focused, color, size, label }: TabIconProps) {
  return (
    <View style={{ alignItems: "center", gap: 2, paddingTop: 4 }}>
      <Ionicons name={name} size={size} color={color} />
      <AppText
        variant="micro"
        style={{ color, fontWeight: focused ? "600" : "400" }}
      >
        {label}
      </AppText>
    </View>
  );
}

export default function TabsLayout() {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const c = theme.colors;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // we render our own label in TabIcon
        tabBarActiveTintColor: c.tabBarActive,
        tabBarInactiveTintColor: c.tabBarInactive,
        tabBarStyle: {
          backgroundColor: c.tabBar,
          borderTopColor: c.border,
          borderTopWidth: 0.5,
          height: Platform.OS === "ios" ? 82 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 4,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {/* ── Home ───────────────────────────────────────────────── */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
              color={color}
              size={size}
              label="Home"
            />
          ),
        }}
      />

      {/* ── Bible ──────────────────────────────────────────────── */}
      <Tabs.Screen
        name="bible"
        options={{
          title: "Bible",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "book" : "book-outline"}
              focused={focused}
              color={color}
              size={size}
              label="Bible"
            />
          ),
        }}
      />

      {/* ── AI Chat ────────────────────────────────────────────── */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              focused={focused}
              color={color}
              size={size}
              label="Chat"
            />
          ),
        }}
      />

      {/* ── Study Plans ────────────────────────────────────────── */}
      <Tabs.Screen
        name="plans"
        options={{
          title: "Plans",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "layers" : "layers-outline"}
              focused={focused}
              color={color}
              size={size}
              label="Plans"
            />
          ),
        }}
      />

      {/* ── Profile ────────────────────────────────────────────── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              focused={focused}
              color={color}
              size={size}
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
