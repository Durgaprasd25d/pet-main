import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const PrivacyPolicyScreen = ({ navigation }: any) => {
  const renderPoint = (icon: string, title: string, text: string) => (
    <View style={styles.pointCard}>
      <View style={styles.pointHeader}>
        <View style={styles.pointIconBox}>
          <MaterialDesignIcons name={icon as any} size={22} color={COLORS.success || '#10b981'} />
        </View>
        <Text style={styles.pointTitle}>{title}</Text>
      </View>
      <Text style={styles.pointText}>{text}</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Privacy Policy" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.shieldIcon}>
            <MaterialDesignIcons name="shield-check" size={50} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.lastUpdated}>Version 1.0 • March 2024</Text>
        </View>

        <View style={styles.introBox}>
          <Text style={styles.introText}>
            At PetCare, we are committed to protecting your and your pet's data. We use industry-standard encryption to keep your information safe and private.
          </Text>
        </View>

        {renderPoint(
          "database-outline",
          "1. Data We Collect",
          "We collect personal information (name, email), pet information (age, breed, health history), and device information (location for SOS, notification tokens)."
        )}

        {renderPoint(
          "account-cog-outline",
          "2. How We Use Data",
          "Your data is used to provide appointment scheduling, vaccination reminders, and community features. Location data is only used during SOS triggers."
        )}

        {renderPoint(
          "lock-check-outline",
          "3. Data Security",
          "We use industry-standard encryption and secure servers to protect your data. We never sell your personal information to third parties."
        )}

        {renderPoint(
          "user-check-outline",
          "4. Your Rights",
          "You have the right to access, correct, or delete your data at any time through the 'Manage My Data' section in App Settings."
        )}

        {renderPoint(
          "cookie-outline",
          "5. Cookies & Tracking",
          "We use essential cookies to keep you logged in and improve app performance. We do not track your activity outside the PetCare ecosystem."
        )}

        <View style={styles.bottomNote}>
          <MaterialDesignIcons name="lock-outline" size={16} color={COLORS.textLight} />
          <Text style={styles.noteText}>End-to-end encryption for health records.</Text>
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
  hero: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  shieldIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: SPACING.md,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
  },
  lastUpdated: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 4,
  },
  introBox: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    ...SHADOWS.small,
  },
  introText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  pointCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  pointIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#10b98115',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  pointTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  pointText: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
    fontWeight: '500',
  },
  bottomNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
    gap: 6,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
});
