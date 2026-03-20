import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import {
  useFonts,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

/** Tokens from Figma — GigShield splash */
const D = {
  screenBg: '#F6F6F8',
  blue: '#2463EB',
  title: '#0F172A',
  subtitle: '#475569',
  label: '#64748B',
  trust: '#94A3B8',
  track: '#E2E8F0',
};

export default function SplashScreen() {
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!fontsLoaded) {
    return <View style={[styles.preload, { backgroundColor: D.screenBg }]} />;
  }

  const frameW = Math.min(width, 448);
  const blobSize1 = Math.max(width, height) * 0.92;
  const blobSize2 = Math.max(width, height) * 0.72;

  return (
    <View style={[styles.root, { backgroundColor: D.screenBg }]}>
      {/* Decorative Background Gradients — blur + blue tint (Figma) */}
      <View
        pointerEvents="none"
        style={[
          styles.blobWrap,
          {
            width: blobSize1,
            height: blobSize1,
            top: height * -0.1,
            left: width * -0.1,
          },
        ]}
      >
        <BlurView
          intensity={50}
          tint="light"
          experimentalBlurMethod={
            Platform.OS === 'android' ? 'dimezisBlurView' : undefined
          }
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[styles.blobTint, { backgroundColor: 'rgba(36, 99, 235, 0.1)' }]}
        />
      </View>

      <View
        pointerEvents="none"
        style={[
          styles.blobWrap,
          {
            width: blobSize2,
            height: blobSize2,
            bottom: height * -0.05,
            right: width * -0.1,
          },
        ]}
      >
        <BlurView
          intensity={40}
          tint="light"
          experimentalBlurMethod={
            Platform.OS === 'android' ? 'dimezisBlurView' : undefined
          }
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[styles.blobTint, { backgroundColor: 'rgba(36, 99, 235, 0.2)' }]}
        />
      </View>

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View
          style={[
            styles.column,
            {
              width: frameW,
              maxWidth: 448,
              paddingHorizontal: 32,
              paddingTop: Math.min(291, Math.round(height * 0.33)),
              paddingBottom: 64,
            },
          ]}
        >
          <View style={styles.centerBlock}>
            {/* App logo — 96×96, r 24, glow, shadow */}
            <View style={styles.logoCluster}>
              <View style={styles.logoGlow} />
              <View style={styles.logoCard}>
                <MaterialIcons name="verified-user" size={34} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.brandBlock}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>GigShield</Text>
              </View>
              <View style={styles.subtitleRow}>
                <Text style={styles.subtitle}>Your Safety, Our Priority</Text>
              </View>
            </View>
          </View>

          <View style={[styles.footer, { maxWidth: 320, width: '100%' }]}>
            <View style={styles.footerUpper}>
              <Text style={styles.loadingLabel}>Secure connection</Text>
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
              </View>
            </View>

            <View style={styles.trustRow}>
              <MaterialIcons name="lock-outline" size={12} color={D.trust} />
              <Text style={styles.trustText}>Bank-grade security</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  preload: {
    flex: 1,
  },
  blobWrap: {
    position: 'absolute',
    borderRadius: 9999,
    overflow: 'hidden',
    zIndex: 0,
  },
  blobTint: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 9999,
  },
  safe: {
    flex: 1,
    zIndex: 2,
  },
  column: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerBlock: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    zIndex: 2,
  },
  logoCluster: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlow: {
    position: 'absolute',
    left: -12,
    right: -12,
    top: -12,
    bottom: -12,
    backgroundColor: 'rgba(36, 99, 235, 0.3)',
    borderRadius: 36,
    zIndex: 0,
  },
  logoCard: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: D.blue,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    // Figma: 0 25px 50px -12px rgba(36, 99, 235, 0.4)
    shadowColor: '#2463EB',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 18,
  },
  brandBlock: {
    marginTop: 32,
    width: '100%',
    alignItems: 'flex-start',
    gap: 12,
  },
  titleRow: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: -1.2,
    color: D.title,
    textAlign: 'center',
  },
  subtitleRow: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 18,
    lineHeight: 28,
    color: D.subtitle,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'flex-start',
    gap: 24,
    zIndex: 3,
  },
  footerUpper: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  loadingLabel: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.35,
    color: D.label,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 9999,
    backgroundColor: D.track,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 9999,
    backgroundColor: D.blue,
  },
  trustRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  trustText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 2,
    color: D.trust,
    textTransform: 'uppercase',
  },
});
