import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const TermsOfServiceScreen = ({ navigation }: any) => {
  const renderSection = (icon: string, title: string, text: string) => (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconCircle}>
          <MaterialDesignIcons name={icon as any} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Terms of Service" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <MaterialDesignIcons name="file-document-outline" size={80} color={COLORS.primary + '30'} />
          <Text style={styles.heroTitle}>Our Terms</Text>
          <Text style={styles.lastUpdated}>Updated: March 2026</Text>
        </View>

        {renderSection(
          "handshake-outline",
          "1. Introduction",
          "Welcome to PetCare Super App. By using our application, you agree to these terms. Please read them carefully. Our service allows you to manage pet records, book appointments, and interact with a community of pet lovers."
        )}

        {renderSection(
          "account-circle-outline",
          "2. User Account",
          "You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old or have parental consent to use this app. Any suspicious activity should be reported immediately."
        )}

        {renderSection(
          "shield-account-outline",
          "3. Privacy & Data",
          "Your privacy is important to us. We collect data essential for providing pet care services, such as health records and location for emergency SOS. Please refer to our Privacy Policy for more details."
        )}

        {renderSection(
          "alert-octagram-outline",
          "4. Limitations of Liability",
          "PetCare provides a platform for connection. We are not responsible for the actual medical advice provided by veterinarians or the actions of community members. Always consult a professional for critical pet health decisions."
        )}

        {renderSection(
            "update",
            "5. Changes to Terms",
            "We reserve the right to modify these terms at any time. We will notify users of any significant changes via app notifications or email."
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>By using the app, you accept these terms.</Text>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  lastUpdated: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionText: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
    fontWeight: '500',
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
  }
});
