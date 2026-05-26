 // app/(auth)/login.tsx

import { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFonts, Lora_700Bold } from '@expo-google-fonts/lora';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useTheme } from '@/src/hooks/useTheme';
import { gs } from '@/src/constants/theme';
import { AppButton } from '@/src/components/AppButton';

// ── Divider ───────────────────────────────────────────────────────────────────
function DividerWithText({ label }: { label: string }) {
  const theme = useTheme();
  const { colors: c, fonts: f } = theme;
  return (
    <View style={[gs.rowCenter, styles.dividerRow]}>
      <View style={[styles.dividerLine, { backgroundColor: c.border }]} />
      <Text style={[styles.dividerLabel, { fontFamily: f.sans, color: c.textMuted }]}>
        {label}
      </Text>
      <View style={[styles.dividerLine, { backgroundColor: c.border }]} />
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Login() {
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);

  const theme = useTheme();
  const { colors: c, fonts: f, radius: r } = theme;

  const [fontsLoaded] = useFonts({
    Lora_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return (
    <View style={{ flex: 1, backgroundColor: c.background }} />
  );

  const handleLogin = async () => {
    // TODO: wire up to auth service in backend phase
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={c.background} translucent={false} />

      <KeyboardAvoidingView
        style={gs.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              style={styles.iconBtn}
              hitSlop={12}
            >
              <Ionicons name="arrow-back" size={22} color={c.text} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { fontFamily: f.bold, color: c.text }]}>
              Scripture AI
            </Text>

            <TouchableOpacity style={styles.iconBtn} hitSlop={12}>
              <Ionicons name="settings-outline" size={22} color={c.text} />
            </TouchableOpacity>
          </View>

          {/* ── Top accent line ───────────────────────────────────────── */}
          <View style={[styles.topAccent, { backgroundColor: c.primary }]} />

          {/* ── Heading ───────────────────────────────────────────────── */}
          <View style={[styles.headingSection, gs.px6]}>
            <Text style={[styles.heading, { fontFamily: f.bold, color: c.text }]}>
              Welcome back
            </Text>
            <Text style={[styles.subheading, { fontFamily: f.sans, color: c.textSecondary }]}>
              Continue your study journey
            </Text>
          </View>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <View style={[styles.form, gs.px6]}>

            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={[styles.fieldLabel, { fontFamily: f.sans, color: c.textSecondary }]}>
                Email
              </Text>
              <View
                style={[
                  styles.inputRow,
                  { borderColor: c.border, borderRadius: r.md, backgroundColor: c.input },
                ]}
              >
                <TextInput
                  style={[styles.input, { fontFamily: f.sans, color: c.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={c.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <Text style={[styles.fieldLabel, { fontFamily: f.sans, color: c.textSecondary }]}>
                Password
              </Text>
              <View
                style={[
                  styles.inputRow,
                  { borderColor: c.border, borderRadius: r.md, backgroundColor: c.input },
                ]}
              >
                <TextInput
                  style={[styles.input, { fontFamily: f.sans, color: c.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={c.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(p => !p)}
                  hitSlop={10}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={18}
                    color={c.textMuted}
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot password — right aligned below password field */}
              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot_password')}
                style={styles.forgotBtn}
                hitSlop={10}
              >
                <Text style={[styles.forgotLabel, { fontFamily: f.sans, color: c.accent }]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* ── Sign in button ────────────────────────────────────────── */}
          <View style={[gs.px6, styles.ctaSection]}>
            <AppButton
              label="Sign in"
              onPress={handleLogin}
              loading={loading}
              iconRight="log-in-outline"
              fullWidth
            />
          </View>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <View style={gs.px6}>
            <DividerWithText label="Or continue with" />
          </View>

          {/* ── Social buttons — stacked vertically ──────────────────── */}
          <View style={[gs.px6, styles.socialStack]}>

            {/* Google — full width */}
            <TouchableOpacity
              style={[
                styles.socialBtn,
                {
                  backgroundColor: c.surface,
                  borderColor:     c.border,
                  borderRadius:    r.lg,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => {/* TODO: Google OAuth */}}
            >
              <FontAwesome name="google" size={18} color="#4285F4" />
              <Text style={[styles.socialLabel, { fontFamily: f.sans, color: c.text }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Apple — full width */}
            <TouchableOpacity
              style={[
                styles.socialBtn,
                {
                  backgroundColor: c.surface,
                  borderColor:     c.border,
                  borderRadius:    r.lg,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => {/* TODO: Apple OAuth */}}
            >
              <Ionicons name="logo-apple" size={22} color="#000000" />
              <Text style={[styles.socialLabel, { fontFamily: f.sans, color: c.text }]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>

          </View>

          {/* ── Sign up link ──────────────────────────────────────────── */}
          <View style={[gs.rowCenter, styles.signupRow, { justifyContent: 'center' }]}>
            <Text style={[styles.signupText, { fontFamily: f.sans, color: c.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <Text
              style={[styles.signupLink, { fontFamily: f.sansSemi, color: c.primary }]}
              onPress={() => router.replace('/(auth)/register')}
            >
              Sign up
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
  scrollContent: { flexGrow: 1 },

  // Header
  header:      { paddingHorizontal: 20, paddingVertical: 14 },
  iconBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, letterSpacing: 0.2 },

  // Accent
  topAccent: { height: 2, width: '100%' },

  // Heading
  headingSection: { paddingTop: 28, marginBottom: 28, alignItems: 'center' },
  heading:        { fontSize: 28, lineHeight: 36, marginBottom: 6 },
  subheading:     { fontSize: 14, lineHeight: 20 },

  // Form
  form:       { gap: 20 },
  fieldWrap:  { gap: 6 },
  fieldLabel: { fontSize: 13, lineHeight: 18 },

  inputRow: {
    flexDirection:     'row',
    alignItems:        'center',
    height:            52,
    borderWidth:       1,
    paddingHorizontal: 14,
    gap:               10,
  },
  input: {
    flex:     1,
    height:   52,
    fontSize: 15,
  },
  eyeBtn: { padding: 4, flexShrink: 0 },

  // Forgot password
  forgotBtn:   { alignSelf: 'flex-end', marginTop: 6 },
  forgotLabel: { fontSize: 13 },

  // CTA
  ctaSection: { marginTop: 24, marginBottom: 20 },

  // Divider
  dividerRow:   { gap: 10, marginBottom: 20 },
  dividerLine:  { flex: 1, height: 1 },
  dividerLabel: { fontSize: 13 },

  // Social — stacked vertically like the screenshot
  socialStack: { gap: 12, marginBottom: 28 },
  socialBtn: {
    height:         52,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            10,
    borderWidth:    1,
  },
  socialLabel: { fontSize: 15 },

  // Sign up
  signupRow:  { marginBottom: 8 },
  signupText: { fontSize: 14 },
  signupLink: { fontSize: 14 },
});
