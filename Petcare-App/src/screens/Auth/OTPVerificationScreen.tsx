import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';

export const OTPVerificationScreen = ({ navigation, route }: any) => {
  const [code, setCode] = useState('');
  const { setUser } = useAppStore();
  const isReset = route.params?.isReset;

  const handleVerify = () => {
    if (isReset) {
      navigation.navigate('Login');
    } else {
      // Complete registration and login
      setUser({
        id: "u1",
        name: "New User",
        email: "user@example.com",
        avatar: "https://i.pravatar.cc/150?u=new",
        phone: "+1234567890",
        location: "Unknown"
      });
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
            A 4-digit code has been sent to your email.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            placeholder="0000"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={4}
            style={styles.codeInput}
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Verify & Proceed"
            onPress={handleVerify}
            style={styles.submitButton}
          />
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
});
