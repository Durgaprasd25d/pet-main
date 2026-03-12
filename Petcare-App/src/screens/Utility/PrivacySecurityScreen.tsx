import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const PrivacySecurityScreen = ({ navigation }: any) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );

  const renderToggle = (icon: string, title: string, description: string, value: boolean, onValueChange: (v: boolean) => void) => (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <MaterialDesignIcons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.border, true: COLORS.primary + '50' }}
        thumbColor={value ? COLORS.primary : '#f4f3f4'}
      />
    </View>
  );

  const renderLink = (icon: string, title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.iconBox}>
        <MaterialDesignIcons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Privacy & Security" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {renderSection("Security", (
          <>
            {renderToggle(
              "shield-lock-outline", 
              "Two-Factor Authentication", 
              "Add an extra layer of security to your account.",
              is2FAEnabled,
              setIs2FAEnabled
            )}
            <View style={styles.divider} />
            {renderToggle(
              "fingerprint", 
              "Biometric Login", 
              "Use FaceID or Fingerprint to unlock the app.",
              isBiometricEnabled,
              setIsBiometricEnabled
            )}
            <View style={styles.divider} />
            {renderLink("key-outline", "Change Password", () => {})}
          </>
        ))}

        {renderSection("Privacy", (
          <>
            {renderToggle(
              "map-marker-outline", 
              "Location Sharing", 
              "Share your location for better nearby vet results.",
              isLocationEnabled,
              setIsLocationEnabled
            )}
            <View style={styles.divider} />
            {renderLink("database-outline", "Manage My Data", () => {})}
            <View style={styles.divider} />
            {renderLink("eye-off-outline", "Block List", () => {})}
          </>
        ))}

        <TouchableOpacity style={styles.deleteAccount}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  rowDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 72,
  },
  deleteAccount: {
    marginTop: SPACING.md,
    alignItems: 'center',
    padding: SPACING.md,
  },
  deleteText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
