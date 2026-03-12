import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

export const PrivacyPolicyScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Privacy Policy" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: March 2024</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>1. Data We Collect</Text>
          <Text style={styles.text}>
            We collect personal information (name, email), pet information (age, breed, health history), and device information (location for SOS, notification tokens).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>2. How We Use Data</Text>
          <Text style={styles.text}>
            Your data is used to provide appointment scheduling, vaccination reminders, and community features. Location data is only used during SOS triggers to notify nearby clinics.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>3. Data Security</Text>
          <Text style={styles.text}>
            We use industry-standard encryption and secure servers (MongoDB Atlas) to protect your sensitive pet data. We never sell your personal information to third parties.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>4. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to access, correct, or delete your data at any time through the "Manage My Data" section in Privacy Settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>5. Cookies & Tracking</Text>
          <Text style={styles.text}>
            We use essential cookies to keep you logged in and improve app performance.
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
