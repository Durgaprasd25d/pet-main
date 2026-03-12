import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, SIZES, RADIUS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAppStore();

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
