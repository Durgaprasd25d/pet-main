import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, SIZES, RADIUS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth, biometricEnabled } = useAppStore();

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setLoading(true);
    try {
      const data = await dataService.login({ email, password });
      if (data.token) {
        setAuth({
          id: data._id,
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          phone: data.phone,
          location: data.location
        } as any, data.token);

        // If biometric is enabled, save credentials to keychain
        if (biometricEnabled) {
          try {
            await Keychain.setGenericPassword(email, password, { 
              service: 'petcare_auth_v1',
              accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
              accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED
            });
          } catch (error) {
            console.error('Keychain error:', error);
          }
        }
      } else if (data.email && data.isVerified === false) {
        Alert.alert('Verification Required', 'Please verify your account');
        navigation.navigate('OTPVerification', { email: data.email });
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }

    } catch (error) {
      console.error('Login error details:', error);
      Alert.alert('Network Error', 'Could not connect to the server. Please check your internet and if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      
      if (!available) {
        Alert.alert('Not Available', 'Biometric authentication is not available on this device.');
        return;
      }

      const credentials = await Keychain.getGenericPassword({ service: 'petcare_auth_v1' });
      if (!credentials) {
        Alert.alert('No Credentials', 'Please log in manually first to enable biometric login.');
        return;
      }

      // Format biometryType for display
      const displayType = biometryType === 'TouchID' ? 'Touch ID' : 
                          biometryType === 'FaceID' ? 'Face ID' : 
                          'Biometrics';

      const { success } = await rnBiometrics.simplePrompt({ 
        promptMessage: `Sign in with ${displayType}`,
        cancelButtonText: 'Cancel'
      });

      if (success) {
        setLoading(true);
        const data = await dataService.login({ 
          email: credentials.username, 
          password: credentials.password 
        });
        
        if (data.token) {
          setAuth({
            id: data._id,
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            phone: data.phone,
            location: data.location
          } as any, data.token);
        } else {
          Alert.alert('Login Failed', 'Saved credentials are no longer valid. Please log in manually.');
        }
      }
    } catch (error) {
      console.error('Biometric login error:', error);
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenContainer>
      <Header title="" onBackPress={() => navigation.goBack()} transparent />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue caring for your pet</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email-variant"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
              disabled={!email || !password}
            />

            {biometricEnabled && (
              <TouchableOpacity 
                style={styles.biometricButton} 
                onPress={handleBiometricLogin}
                disabled={loading}
              >
                <MaterialDesignIcons name="fingerprint" size={32} color={COLORS.primary} />
                <Text style={styles.biometricText}>Login with Biometrics</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: SIZES.isSmallDevice ? 28 : 32,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xl,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  loginButton: {
    marginTop: SPACING.md,
    height: 56,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  biometricText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  registerText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 14,
  },
});
