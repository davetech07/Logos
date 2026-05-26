// app/(auth)/register.tsx

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useTheme } from "@/src/hooks/useTheme";
import { gs } from "@/src/constants/theme";
import { AppButton } from "@/src/components/AppButton";

// ── Input field component ─────────────────────────────────────────────────────
function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  iconName,
  secureEntry,
  showToggle,
  onToggleSecure,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  secureEntry?: boolean;
  showToggle?: boolean;
  onToggleSecure?: () => void;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "words";
}) {
  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  return (
    <View style={styles.fieldWrap}>
      {/* Label */}
      <Text
        style={[
          styles.fieldLabel,
          { fontFamily: f.sans, color: c.textSecondary },
        ]}
      >
        {label}
      </Text>

      {/* Input row */}
      <View
        style={[
          styles.inputRow,
          {
            borderColor: c.border,
            borderRadius: r.md,
            backgroundColor: c.input,
          },
        ]}
      >
        {/* Left icon */}
        <Ionicons
          name={iconName}
          size={18}
          color={c.textMuted}
          style={styles.inputIcon}
        />

        {/* Text input */}
        <TextInput
          style={[styles.input, { fontFamily: f.sans, color: c.text }]}
          placeholder={placeholder}
          placeholderTextColor={c.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureEntry}
          keyboardType={keyboardType ?? "default"}
          autoCapitalize={autoCapitalize ?? "none"}
          autoCorrect={false}
        />

        {/* Right eye toggle — only on password fields */}
        {showToggle && (
          <TouchableOpacity
            onPress={onToggleSecure}
            hitSlop={10}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={secureEntry ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={c.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ── Divider with text ─────────────────────────────────────────────────────────
function DividerWithText({ label }: { label: string }) {
  const theme = useTheme();
  const { colors: c, fonts: f } = theme;
  return (
    <View style={[gs.rowCenter, styles.dividerRow]}>
      <View style={[styles.dividerLine, { backgroundColor: c.border }]} />
      <Text
        style={[
          styles.dividerLabel,
          { fontFamily: f.sans, color: c.textMuted },
        ]}
      >
        {label}
      </Text>
      <View style={[styles.dividerLine, { backgroundColor: c.border }]} />
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded)
    return <View style={{ flex: 1, backgroundColor: c.background }} />;

  const handleRegister = async () => {
    // TODO: wire up to your auth service
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/onboarding");
    }, 1500);
  };

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={c.background}
        translucent={false}
      />

      <KeyboardAvoidingView
        style={gs.flex1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ───────────────────────────────────────────────── */}
          <View style={[gs.rowBetween, styles.header]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
              hitSlop={12}
            >
              <Ionicons name="arrow-back" size={22} color={c.text} />
            </TouchableOpacity>

            <Text
              style={[
                styles.headerTitle,
                { fontFamily: f.bold, color: c.text },
              ]}
            >
              Logos AI
            </Text>

            {/* Spacer to balance the back arrow */}
            <View style={styles.backBtn} />
          </View>

          {/* ── Top border accent ─────────────────────────────────────── */}
          <View style={[styles.topAccent, { backgroundColor: c.primary }]} />

          {/* ── Page heading ──────────────────────────────────────────── */}
          <View style={[styles.headingSection, gs.px6]}>
            <Text
              style={[styles.heading, { fontFamily: f.bold, color: c.text }]}
            >
              Create your account
            </Text>
            <Text
              style={[
                styles.subheading,
                { fontFamily: f.sans, color: c.textSecondary },
              ]}
            >
              Join thousands growing in faith daily
            </Text>
          </View>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <View style={[styles.form, gs.px6]}>
            <InputField
              label="Full name"
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              iconName="person-outline"
              autoCapitalize="words"
            />

            <InputField
              label="Email address"
              placeholder="john@example.com"
              value={email}
              onChangeText={setEmail}
              iconName="mail-outline"
              keyboardType="email-address"
            />

            <InputField
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              iconName="lock-closed-outline"
              secureEntry={!showPassword}
              showToggle
              onToggleSecure={() => setShowPassword((p) => !p)}
            />

            <InputField
              label="Confirm password"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              iconName="lock-closed-outline"
              secureEntry={!showConfirm}
              showToggle
              onToggleSecure={() => setShowConfirm((p) => !p)}
            />
          </View>

          {/* ── Create account button ─────────────────────────────────── */}
          <View style={[gs.px6, styles.ctaSection]}>
            <AppButton
              label="Create account"
              onPress={handleRegister}
              loading={loading}
              fullWidth
            />
          </View>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <View style={gs.px6}>
            <DividerWithText label="or sign up with" />
          </View>

          {/* ── Social buttons ────────────────────────────────────────── */}
          <View style={[gs.px6, styles.socialRow]}>
            {/* Google */}
            <TouchableOpacity
              style={[
                styles.socialBtn,
                {
                  backgroundColor: c.surface,
                  borderColor: c.border,
                  borderRadius: r.lg,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => {
                /* TODO: Google OAuth */
              }}
            >
              <FontAwesome name="google" size={18} color="#4285F4" />
              <Text
                style={[
                  styles.socialLabel,
                  { fontFamily: f.sans, color: c.text },
                ]}
              >
                Google
              </Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              style={[
                styles.socialBtn,
                {
                  backgroundColor: "#000000",
                  borderColor: "#000000",
                  borderRadius: r.lg,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => {
                /* TODO: Apple OAuth */
              }}
            >
              <Ionicons name="logo-apple" size={22} color= "#FFFFFF" />
              <Text
                style={[
                  styles.socialLabel,
                  { fontFamily: f.sans, color: c.textInverse },
                ]}
              >
                Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Sign in link ──────────────────────────────────────────── */}
          <View
            style={[
              gs.rowCenter,
              styles.signinRow,
              { justifyContent: "center" },
            ]}
          >
            <Text
              style={[
                styles.signinText,
                { fontFamily: f.sans, color: c.textSecondary },
              ]}
            >
              Already have an account?{" "}
            </Text>
            <Text
              style={[
                styles.signinLink,
                { fontFamily: f.sansSemi, color: c.primary },
              ]}
              onPress={() => router.replace("/(auth)/login")}
            >
              Sign in
            </Text>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles — layout only ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    letterSpacing: 0.2,
  },

  // Top accent line
  topAccent: {
    height: 2,
    width: "100%",
  },

  // Heading
  headingSection: {
    paddingTop: 28,
    marginBottom: 24,
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Form
  form: {
    gap: 18,
  },

  // Field
  fieldWrap: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  inputIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
  },
  eyeBtn: {
    padding: 4,
    flexShrink: 0,
  },

  // CTA
  ctaSection: {
    marginTop: 24,
    marginBottom: 20,
  },

  // Divider
  dividerRow: {
    gap: 10,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLabel: {
    fontSize: 13,
  },

  // Social
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
  },
  socialLabel: {
    fontSize: 15,
  },

  // Sign in
  signinRow: {
    marginBottom: 8,
  },
  signinText: { fontSize: 14 },
  signinLink: { fontSize: 14 },
});
