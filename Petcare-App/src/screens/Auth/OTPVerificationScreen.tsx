import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';

export const OTPVerificationScreen = ({ navigation, route }: any) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { setAuth } = useAppStore();
  const email = route.params?.email;
  const isReset = route.params?.isReset;

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const result = await dataService.verifyOTP(email, code);
      if (result.token) {
        setAuth({
          id: result._id,
          name: result.name,
          email: result.email,
          avatar: '',
          phone: '',
          location: ''
        } as any, result.token);
      } else {
        Alert.alert('Verification Failed', result.message || 'Invalid code');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };


  const handleResend = async () => {
    setResending(true);
    try {
      const result = await dataService.resendOTP(email);
      Alert.alert('Success', result.message || 'OTP resent successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };



  return (
    <ScreenContainer>
      <Header title="Verification" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Enter Code</Text>
          <Text style={styles.subtitle}>
            A 6-digit code has been sent to {email}.
          </Text>
        </View>


        <View style={styles.formContainer}>
          <Input
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.codeInput}
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Verify & Proceed"
            onPress={handleVerify}
            style={styles.submitButton}
            loading={loading}
            disabled={loading || code.length !== 6}
          />

          <TouchableOpacity 
            onPress={handleResend} 
            disabled={resending}
            style={styles.resendContainer}
          >
            <Text style={styles.resendText}>
              {resending ? 'Sending...' : "Didn't receive code? Resend"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: 200,
  },
  codeInput: {
    textAlign: 'center',
    fontSize: 32,
    letterSpacing: 10,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: SPACING.xl,
    width: '100%',
  },
  resendContainer: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
  },
  resendText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});

