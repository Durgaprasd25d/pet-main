import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, AppState, AppStateStatus, BackHandler, TouchableOpacity, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppStore } from '../../store/useAppStore';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

export const AppLock = ({ children }: { children: React.ReactNode }) => {
  const { biometricEnabled, isAppLocked, setAppLocked, isAuthenticated, hasHydrated } = useAppStore();
  const appState = useRef(AppState.currentState);
  const isFirstAuthenticatedMount = useRef(true);
  const isPrompting = useRef(false);
  // Use a ref for rnBiometrics to avoid creating new instances on every render
  const rnBiometrics = useRef(new ReactNativeBiometrics());

  const handleBiometricCheck = async () => {
    if (isPrompting.current || !biometricEnabled || !isAuthenticated) {
      if (!biometricEnabled || !isAuthenticated) setAppLocked(false);
      return;
    }

    isPrompting.current = true;
    
    // Small delay to ensure app is fully foregrounded before showing biometric prompt
    await new Promise<void>(resolve => setTimeout(() => resolve(), 300));

    try {
      const { available, biometryType } = await rnBiometrics.current.isSensorAvailable();
      if (!available) {
        setAppLocked(false);
        return;
      }

      // Format biometryType for display
      const displayType = biometryType === 'TouchID' ? 'Touch ID' : 
                          biometryType === 'FaceID' ? 'Face ID' : 
                          'Biometrics';

      const { success, error } = await rnBiometrics.current.simplePrompt({
        promptMessage: `Unlock with ${displayType}`,
        cancelButtonText: 'Cancel'
      });

      if (success) {
        setAppLocked(false);
      } else if (error && error !== 'User cancellation') {
        Alert.alert('Authentication Error', error || 'Biometric authentication failed.');
      }
    } catch (error: any) {
      console.error('AppLock biometric error:', error);
      // Keep app locked on error
      setAppLocked(true);
    } finally {
      isPrompting.current = false;
    }
  };

  useEffect(() => {
    if (!hasHydrated) return;

    // Initial check on cold start if already authenticated
    if (biometricEnabled && isAuthenticated && isFirstAuthenticatedMount.current) {
      setAppLocked(true);
      handleBiometricCheck();
    }
    
    if (isAuthenticated) {
      isFirstAuthenticatedMount.current = false;
    } else {
      isFirstAuthenticatedMount.current = true;
    }

    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      // Lock as soon as app goes to background or becomes inactive
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        if (biometricEnabled && isAuthenticated) {
          setAppLocked(true);
        }
      }

      // Try to unlock on resume
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (biometricEnabled && isAuthenticated && isAppLocked) {
          handleBiometricCheck();
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [hasHydrated, biometricEnabled, isAuthenticated]);

  // Handle back button on Android to prevent bypassing the lock
  useEffect(() => {
    if (isAppLocked) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        return true; // Block back button
      });
      return () => backHandler.remove();
    }
  }, [isAppLocked]);

  if (isAppLocked && biometricEnabled && isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.lockContent}>
          <MaterialDesignIcons name="lock-outline" size={80} color={COLORS.primary} />
          <Text style={styles.title}>App Locked</Text>
          <Text style={styles.subtitle}>Use biometrics to unlock Petcare</Text>
          
          <TouchableOpacity 
            style={styles.unlockButton}
            onPress={handleBiometricCheck}
          >
            <MaterialDesignIcons name="fingerprint" size={40} color={COLORS.surface} />
            <Text style={styles.unlockButtonText}>Unlock App</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  lockContent: {
    alignItems: 'center',
    padding: SPACING.xl,
    gap: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.round,
    gap: SPACING.sm,
  },
  unlockButtonText: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
