 // app/(auth)/forgot_password.tsx

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Lora_700Bold } from '@expo-google-fonts/lora';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useTheme } from '@/src/hooks/useTheme';
import { gs } from '@/src/constants/theme';
import { AppButton } from '@/src/components/AppButton';

// ── Two states: input email | confirmation sent ───────────────────────────────
type ScreenState = 'input' | 'sent';

export default function ForgotPassword() {
  const [email,       setEmail]       = useState('');
  const [state,       setState]       = useState<ScreenState>('input');
  const [loading,     setLoading]     = useState(false);

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

  const handleSend = async () => {
    // TODO: wire to backend in API phase
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setState('sent');
    }, 1500);
  };

  return (
    <SafeAreaView style={[gs.flex1, { backgroundColor: c.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={c.background} translucent={false} />

      <KeyboardAvoidingView
        style={gs.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        {/* ── Header ─────────────────────────────────────────────────── */}
        <View style={[gs.rowBetween, styles.header]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconBtn}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={22} color={c.text} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { fontFamily: f.bold, color: c.text }]}>
            Logos AI
          </Text>

          {/* Spacer to balance header */}
          <View style={styles.iconBtn} />
        </View>

        {/* ── Top accent line ────────────────────────────────────────── */}
        <View style={[styles.topAccent, { backgroundColor: c.primary }]} />

        {/* ── Content ────────────────────────────────────────────────── */}
        {state === 'input' ? (
          // ── INPUT STATE ──────────────────────────────────────────────
          <View style={[styles.content, gs.px6]}>

            {/* Icon */}
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: c.successLight, borderRadius: r.xl },
              ]}
            >
              <Ionicons name="lock-open-outline" size={32} color={c.primary} />
            </View>

            {/* Heading */}
            <Text style={[styles.heading, { fontFamily: f.bold, color: c.text }]}>
              Forgot password?
            </Text>

            {/* Subtitle */}
            <Text style={[styles.subtitle, { fontFamily: f.sans, color: c.textSecondary }]}>
              No worries. Enter your email address and we'll send you a link to reset your password.
            </Text>

            {/* Email field */}
            <View style={styles.fieldWrap}>
              <Text style={[styles.fieldLabel, { fontFamily: f.sans, color: c.textSecondary }]}>
                Email address
              </Text>
              <View
                style={[
                  styles.inputRow,
                  { borderColor: c.border, borderRadius: r.md, backgroundColor: c.input },
                ]}
              >
                <Ionicons name="mail-outline" size={18} color={c.textMuted} />
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

            {/* Send button */}
            <AppButton
              label="Send reset link"
              onPress={handleSend}
              loading={loading}
              iconRight="send-outline"
              fullWidth
              style={styles.ctaBtn}
            />

            {/* Back to login */}
            <TouchableOpacity
              style={[gs.rowCenter, styles.backToLogin, { justifyContent: 'center' }]}
              onPress={() => router.back()}
              hitSlop={10}
            >
              <Ionicons name="arrow-back" size={14} color={c.primary} />
              <Text style={[styles.backLabel, { fontFamily: f.sansSemi, color: c.primary }]}>
                Back to Sign in
              </Text>
            </TouchableOpacity>

          </View>

        ) : (
          // ── CONFIRMATION STATE ────────────────────────────────────────
          <View style={[styles.content, gs.px6]}>

            {/* Success icon */}
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: c.successLight, borderRadius: r.xl },
              ]}
            >
              <Ionicons name="checkmark-circle-outline" size={36} color={c.primary} />
            </View>

            {/* Heading */}
            <Text style={[styles.heading, { fontFamily: f.bold, color: c.text }]}>
              Check your email
            </Text>

            {/* Subtitle */}
            <Text style={[styles.subtitle, { fontFamily: f.sans, color: c.textSecondary }]}>
              We sent a password reset link to
            </Text>

            {/* Email highlight */}
            <Text style={[styles.emailHighlight, { fontFamily: f.sansSemi, color: c.primary }]}>
              {email}
            </Text>

            {/* Info box */}
            <View
              style={[
                styles.infoBox,
                { backgroundColor: c.successLight, borderRadius: r.lg, borderColor: c.success },
              ]}
            >
              <Ionicons name="information-circle-outline" size={18} color={c.primary} />
              <Text style={[styles.infoText, { fontFamily: f.sans, color: c.textSecondary }]}>
                Didn't receive the email? Check your spam folder or wait a few minutes.
              </Text>
            </View>

            {/* Open email app button */}
            <AppButton
              label="Open email app"
              onPress={() => {/* TODO: Linking.openURL('mailto:') */}}
              iconRight="mail-outline"
              fullWidth
              style={styles.ctaBtn}
            />

            {/* Resend link */}
            <View style={[gs.rowCenter, { justifyContent: 'center', marginTop: 16 }]}>
              <Text style={[styles.resendText, { fontFamily: f.sans, color: c.textSecondary }]}>
                Didn't get it?{' '}
              </Text>
              <Text
                style={[styles.resendLink, { fontFamily: f.sansSemi, color: c.primary }]}
                onPress={handleSend}
              >
                Resend
              </Text>
            </View>

            {/* Back to login */}
            <TouchableOpacity
              style={[gs.rowCenter, styles.backToLogin, { justifyContent: 'center' }]}
              onPress={() => router.replace('/(auth)/login')}
              hitSlop={10}
            >
              <Ionicons name="arrow-back" size={14} color={c.primary} />
              <Text style={[styles.backLabel, { fontFamily: f.sansSemi, color: c.primary }]}>
                Back to Sign in
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles — layout only ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header
  header:      { paddingHorizontal: 20, paddingVertical: 14 },
  iconBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, letterSpacing: 0.2 },
  topAccent:   { height: 2, width: '100%' },

  // Content
  content: {
    flex:       1,
    paddingTop: 40,
    gap:        0,
  },

  // Icon circle
  iconCircle: {
    width:          72,
    height:         72,
    alignItems:     'center',
    justifyContent: 'center',
    alignSelf:      'flex-start',
    marginBottom:   24,
  },

  // Heading & subtitle
  heading: {
    fontSize:     26,
    lineHeight:   34,
    marginBottom: 12,
  },
  subtitle: {
    fontSize:     15,
    lineHeight:   24,
    marginBottom: 28,
  },

  // Email highlight (confirmation state)
  emailHighlight: {
    fontSize:     16,
    marginBottom: 24,
    marginTop:    -16,
  },

  // Field
  fieldWrap: {
    gap:          6,
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 13,
  },
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

  // CTA
  ctaBtn: { marginBottom: 4 },

  // Info box (confirmation state)
  infoBox: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    gap:            10,
    padding:        14,
    borderWidth:    1,
    marginBottom:   24,
  },
  infoText: {
    flex:       1,
    fontSize:   13,
    lineHeight: 20,
  },

  // Resend
  resendText: { fontSize: 14 },
  resendLink: { fontSize: 14 },

  // Back to login
  backToLogin: {
    gap:       6,
    marginTop: 20,
  },
  backLabel: { fontSize: 14 },
});
