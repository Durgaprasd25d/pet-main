import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const SettingsScreen = ({ navigation }: any) => {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const renderSettingToggle = (icon: string, title: string, value: boolean, onValueChange: (val: boolean) => void) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <MaterialDesignIcons name={icon as any} size={24} color={COLORS.textLight} style={styles.settingIcon} />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={COLORS.surface}
      />
    </View>
  );

  const renderSettingLink = (icon: string, title: string, value?: string) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <MaterialDesignIcons name={icon as any} size={24} color={COLORS.textLight} style={styles.settingIcon} />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Settings" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            {renderSettingToggle('bell-outline', 'Push Notifications', pushNotif, setPushNotif)}
            <View style={styles.divider} />
            {renderSettingToggle('email-outline', 'Email Notifications', emailNotif, setEmailNotif)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            {renderSettingToggle('theme-light-dark', 'Dark Mode', darkMode, setDarkMode)}
            <View style={styles.divider} />
            {renderSettingToggle('map-marker-outline', 'Location Services', locationServices, setLocationServices)}
            <View style={styles.divider} />
            {renderSettingLink('web', 'Language', 'English (US)')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            {renderSettingLink('information-outline', 'App Version', '1.0.0')}
            <View style={styles.divider} />
            {renderSettingLink('file-document-outline', 'Terms of Service')}
            <View style={styles.divider} />
            {renderSettingLink('shield-check-outline', 'Privacy Policy')}
          </View>
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.sm,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SPACING.md,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 56,
  },
});
