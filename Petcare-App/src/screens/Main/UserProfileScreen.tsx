import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Avatar } from '../../components/ui/Avatar';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const UserProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAppStore();

  const handleLogout = () => {
    logout();
  };

  const renderMenuItem = (icon: any, title: string, onPress: () => void, color = COLORS.text) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialDesignIcons name={icon} size={24} color={color} style={styles.menuIcon} />
      <Text style={[styles.menuText, { color }]}>{title}</Text>
      <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Profile" rightIcon="cog-outline" onRightPress={() => navigation.navigate('Settings')} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Avatar source={user?.avatar ? { uri: user.avatar } : undefined} size={100} />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            {renderMenuItem('account-outline', 'My Profile', () => navigation.navigate('EditProfile'))}
            <View style={styles.divider} />
            {renderMenuItem('bell-outline', 'Notifications', () => navigation.navigate('Notifications'))}
            <View style={styles.divider} />
            {renderMenuItem('shield-account-outline', 'Privacy & Security', () => navigation.navigate('PrivacySecurity'))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            {renderMenuItem('help-circle-outline', 'Help & Support', () => navigation.navigate('HelpSupport'))}
            <View style={styles.divider} />
            {renderMenuItem('information-outline', 'About App', () => navigation.navigate('AboutApp'))}
          </View>
        </View>

        <View style={[styles.section, { marginTop: SPACING.md }]}>
          <View style={styles.card}>
            {renderMenuItem('logout', 'Log Out', handleLogout, COLORS.error)}
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  email: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 4,
  },
  editButton: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary + '15',
    borderRadius: RADIUS.round,
  },
  editButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  menuIcon: {
    marginRight: SPACING.md,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 56,
  },
});
