import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Design tokens ─────────────────────────────────────────────────────────────
const DEEP_GREEN = "#0B3D2E";
const GREEN_BG = "#E8F5EE";
const GOLD = "#B8860B";
const BG = "#F5F0E8";
const WHITE = "#FFFFFF";
const TEXT_PRIMARY = "#1A1A2E";
const TEXT_MUTED = "#9CA3AF";
const BORDER = "#E5E7EB";
const PROGRESS_BG = "#E5E7EB";

// Bible Versions
const versions = [
  {
    id: "niv",
    short: "NIV",
    title: "New International Version",
    description: "Balance of accuracy and readability.",
  },
  {
    id: "esv",
    short: "ESV",
    title: "English Standard Version",
    description: "Essentially literal word-for-word translation.",
  },
  {
    id: "kjv",
    short: "KJV",
    title: "King James Version",
    description: "The classic, poetic English translation.",
  },
  {
    id: "nlt",
    short: "NLT",
    title: "New Living Translation",
    description: "Easy to understand, thought-for-thought.",
  },
  {
    id: "amp",
    short: "AMP",
    title: "Amplified Bible",
    description: "Captures the full meaning of word nuances.",
  },
];

export default function onboarding_version() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <View style={Styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/onboarding")}
          style={Styles.backBtn}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color={TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={Styles.stepLabel}>Step 3 of 3</Text>
        <TouchableOpacity onPress={() => router.push("/")} hitSlop={12}>
          <Text style={{ fontSize: 16, color: TEXT_MUTED }}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.progressTrack}>
        <View style={Styles.progressFill} />
      </View>
      <View style={Styles.body}>
        <Text style={Styles.heading}>Choose your Bible Version</Text>
        <Text style={Styles.subtitle}>
          {"You can always change this later."}
        </Text>
      </View>
      <View>
        {versions.map((version) => {
          return (
            <TouchableOpacity key={version.id} style={Styles.versionCard}>
              <View style={Styles.badge}>
                <Text>{version.short}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    fontFamily: "Lora_700Bold",
    fontSize: 17,
    color: TEXT_PRIMARY,
    letterSpacing: 0.2,
  },
  progressTrack: {
    height: 3,
    backgroundColor: PROGRESS_BG,
  },
  progressFill: {
    width: "100%",
    height: 3,
    backgroundColor: DEEP_GREEN,
    borderRadius: 2,
  },
  body: {
    // backgroundColor: "green"
  },
  heading: {
    fontFamily: "Lora_700Bold",
    fontSize: 26,
    color: TEXT_PRIMARY,
    lineHeight: 34,
    textAlign: "center",
    marginVertical: 12,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 32,
  },
  versionCard: {
    backgroundColor: WHITE,
    height: 70,
    marginHorizontal: 15,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: DEEP_GREEN,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  badge: {
    width: 35,
    height: 35,
    backgroundColor: "#C0C8C3",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
