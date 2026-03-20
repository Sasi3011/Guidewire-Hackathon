import React, { useRef, useState } from 'react';
import { verifyOtpWithBackend } from '../config/api';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';
import { router } from 'expo-router';
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

const D = {
  bg: '#F6F6F8',
  blue: '#2463EB',
  dark: '#0F172A',
  label: '#334155',
  muted: '#64748B',
  slate: '#94A3B8',
  inputBg: '#F8FAFC',
  border: '#E2E8F0',
  divider: '#F1F5F9',
  white: '#FFFFFF',
};

const INDIA_PREFIX = '+91';
const PHONE_REGEX = /^[6-9]\d{9}$/; // 10-digit Indian mobile

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmationResult | null>(null);

  const otpRefs = useRef<(TextInput | null)[]>([]);
  const recaptchaVerifierRef = useRef<any>(null);
  if (!fontsLoaded) return null;

  // ── Validation ──────────────────────────────────────────────────────────
  function validatePhone(): boolean {
    const digits = phone.replace(/\D/g, '');
    if (!PHONE_REGEX.test(digits)) {
      setPhoneError('Enter a valid 10-digit Indian mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  }

  // ── Send OTP ─────────────────────────────────────────────────────────────
  async function handleSendOtp() {
    if (!validatePhone()) return;
    setLoading(true);
    try {
      const fullNumber = `${INDIA_PREFIX}${phone.replace(/\D/g, '')}`;

      const appVerifier = recaptchaVerifierRef.current;
      if (!appVerifier) throw new Error('reCAPTCHA not ready');

      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        fullNumber,
        appVerifier,
      );
      setConfirm(confirmation);
      setOtpSent(true);
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  }

  // ── OTP input helpers ────────────────────────────────────────────────────
  function handleOtpChange(text: string, idx: number) {
    const digit = text.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!digit && idx > 0) otpRefs.current[idx - 1]?.focus();
  }

  // ── Verify OTP ───────────────────────────────────────────────────────────
  async function handleVerifyOtp() {
    const code = otp.join('');
    if (code.length < 6) {
      Alert.alert('Invalid OTP', 'Please enter all 6 digits.');
      return;
    }
    if (!confirm) return;
    setLoading(true);
    try {
      // Step 1: confirm OTP with Firebase → get credential + ID token
      const credential = await confirm.confirm(code);
      const idToken = await credential?.user.getIdToken();
      if (!idToken) throw new Error('Could not retrieve Firebase ID token');

      // Step 2: send ID token + phone to backend for validation, user upsert, JWT
      await verifyOtpWithBackend(idToken, phone);

      // Step 3: navigate to dashboard
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Verification Failed', e?.message ?? 'Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifierRef}
        firebaseConfig={firebaseAuth.app.options}
        attemptInvisibleVerification={true}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header / Logo ─────────────────────────────────────────── */}
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <View style={styles.logoBox}>
                <MaterialIcons name="verified-user" size={28} color={D.blue} />
              </View>
            </View>
            <Text style={styles.appName}>GigShield</Text>
            <Text style={styles.tagline}>
              Verify your identity to access{'\n'}your gig worker benefits
            </Text>
          </View>

          {/* ── Login Card ───────────────────────────────────────────── */}
          <View style={styles.card}>
            {/* Phone field */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelWrap}>
                <Text style={styles.label}>Phone Number</Text>
              </View>
              <View style={styles.inputWrap}>
                {/* +91 prefix badge */}
                <View style={styles.prefixBadge}>
                  <Text style={styles.prefixText}>+91</Text>
                </View>
                <TextInput
                  style={[styles.input, phoneError ? styles.inputError : null]}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={D.slate}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={(t) => {
                    setPhone(t.replace(/\D/g, ''));
                    if (phoneError) setPhoneError('');
                  }}
                  editable={!otpSent}
                />
                <View style={styles.phoneIcon} pointerEvents="none">
                  <MaterialIcons name="smartphone" size={18} color={D.slate} />
                </View>
              </View>
              {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
            </View>

            {/* Send OTP button */}
            {!otpSent && (
              <View style={styles.actionGroup}>
                <TouchableOpacity
                  style={styles.outlineBtn}
                  onPress={handleSendOtp}
                  disabled={loading}
                  activeOpacity={0.75}
                >
                  {loading ? (
                    <ActivityIndicator color={D.blue} size="small" />
                  ) : (
                    <Text style={styles.outlineBtnText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* ── OTP Section (visible after send) ──────────────────── */}
            {otpSent && (
              <View style={styles.otpSection}>
                {/* Header row: label + resend badge */}
                <View style={styles.otpHeaderRow}>
                  <View style={styles.labelWrap}>
                    <Text style={styles.label}>Enter 6-digit OTP</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.resendBadge}
                    onPress={handleSendOtp}
                    disabled={loading}
                  >
                    <MaterialIcons name="refresh" size={12} color={D.blue} />
                    <Text style={styles.resendText}>Resend</Text>
                  </TouchableOpacity>
                </View>

                {/* 6 OTP boxes */}
                <View style={styles.otpRow}>
                  {otp.map((digit, idx) => (
                    <TextInput
                      key={idx}
                      ref={(r) => { otpRefs.current[idx] = r; }}
                      style={[
                        styles.otpBox,
                        digit ? styles.otpBoxFilled : null,
                      ]}
                      value={digit}
                      onChangeText={(t) => handleOtpChange(t, idx)}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                    />
                  ))}
                </View>

                {/* Verify button */}
                <View style={styles.verifyBtnWrap}>
                  <TouchableOpacity
                    style={styles.verifyBtn}
                    onPress={handleVerifyOtp}
                    disabled={loading}
                    activeOpacity={0.85}
                  >
                    {loading ? (
                      <ActivityIndicator color={D.white} size="small" />
                    ) : (
                      <Text style={styles.verifyBtnText}>Verify OTP</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* ── Illustration / Hero ──────────────────────────────────── */}
          <View style={styles.heroCard}>
            <View style={styles.heroGradient} />
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroText}>
                Trusted by 50,000+ gig workers across India
              </Text>
            </View>
          </View>

          {/* ── Footer ───────────────────────────────────────────────── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: D.bg,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 31,
    paddingBottom: 32,
    gap: 24,
    alignItems: 'flex-start',
  },

  // ── Header ──────────────────────────────────────────────────────────────
  header: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  logoWrap: {
    paddingBottom: 8,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(36, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.75,
    color: D.dark,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: D.muted,
    textAlign: 'center',
    paddingHorizontal: 42,
  },

  // ── Card ─────────────────────────────────────────────────────────────────
  card: {
    width: '100%',
    backgroundColor: D.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: D.border,
    padding: 24,
    gap: 20,
    shadowColor: D.blue,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.05,
    shadowRadius: 25,
    elevation: 6,
  },

  // ── Phone field ──────────────────────────────────────────────────────────
  fieldGroup: {
    width: '100%',
    gap: 8,
  },
  labelWrap: {
    paddingLeft: 4,
  },
  label: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    lineHeight: 20,
    color: D.label,
  },
  inputWrap: {
    position: 'relative',
    width: '100%',
  },
  prefixBadge: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 2,
  },
  prefixText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 15,
    color: D.blue,
  },
  input: {
    width: '100%',
    height: 57,
    backgroundColor: D.inputBg,
    borderWidth: 1,
    borderColor: D.border,
    borderRadius: 24,
    paddingLeft: 52,
    paddingRight: 48,
    paddingVertical: 17,
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 16,
    color: D.dark,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  phoneIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 2,
  },
  errorText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 12,
    color: '#EF4444',
    paddingLeft: 4,
  },

  // ── Send OTP button ──────────────────────────────────────────────────────
  actionGroup: {
    width: '100%',
    paddingTop: 8,
  },
  outlineBtn: {
    width: '100%',
    height: 60,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(36, 99, 235, 0.2)',
    backgroundColor: D.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtnText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: D.blue,
  },

  // ── OTP section ──────────────────────────────────────────────────────────
  otpSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: D.divider,
    paddingTop: 32,
    gap: 16,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  resendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(36, 99, 235, 0.1)',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resendText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: D.blue,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
  },
  otpBox: {
    flex: 1,
    height: 56,
    backgroundColor: D.inputBg,
    borderWidth: 1,
    borderColor: D.border,
    borderRadius: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: D.dark,
  },
  otpBoxFilled: {
    borderColor: D.blue,
    backgroundColor: 'rgba(36, 99, 235, 0.04)',
  },
  verifyBtnWrap: {
    width: '100%',
    paddingTop: 8,
  },
  verifyBtn: {
    width: '100%',
    height: 56,
    borderRadius: 24,
    backgroundColor: D.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBtnText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: D.white,
  },

  // ── Hero card ─────────────────────────────────────────────────────────────
  heroCard: {
    width: '100%',
    height: 160,
    borderRadius: 24,
    backgroundColor: '#CBD5E1',
    overflow: 'hidden',
    position: 'relative',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  heroTextWrap: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  heroText: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    lineHeight: 20,
    color: D.white,
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 8,
  },
  footerText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: D.muted,
  },
  footerLink: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    lineHeight: 20,
    color: D.blue,
  },
});
