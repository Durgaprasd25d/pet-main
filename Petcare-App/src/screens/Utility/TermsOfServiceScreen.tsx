import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

export const TermsOfServiceScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Terms of Service" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: March 2024</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>1. Introduction</Text>
          <Text style={styles.text}>
            Welcome to PetCare Super App. By using our application, you agree to these terms. Please read them carefully. Our service allows you to manage pet records, book appointments, and interact with a community of pet lovers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>2. User Account</Text>
          <Text style={styles.text}>
            You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old or have parental consent to use this app. Any suspicious activity should be reported immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>3. Privacy & Data</Text>
          <Text style={styles.text}>
            Your privacy is important to us. We collect data essential for providing pet care services, such as health records and location for emergency SOS. Please refer to our Privacy Policy for more details.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>4. Limitations of Liability</Text>
          <Text style={styles.text}>
            PetCare provides a platform for connection. We are not responsible for the actual medical advice provided by veterinarians or the actions of community members. Always consult a professional for critical pet health decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>5. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these terms at any time. We will notify users of any significant changes via app notifications or email.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  lastUpdated: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  text: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
  },
});
