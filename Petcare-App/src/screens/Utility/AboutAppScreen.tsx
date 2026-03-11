import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const AboutAppScreen = ({ navigation }: any) => {

  const handleLink = (url: string) => {
    // In a real app, use Linking.openURL(url)
    console.log('Opening:', url);
  };

  const renderLinkRow = (icon: string, title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.linkRow} onPress={onPress}>
      <View style={styles.iconBox}>
        <MaterialDesignIcons name={icon as any} size={24} color={COLORS.textLight} />
      </View>
      <Text style={styles.linkText}>{title}</Text>
      <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="About App" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.headerArea}>
          <View style={styles.logoContainer}>
            <MaterialDesignIcons name="paw" size={60} color={COLORS.surface} />
          </View>
          <Text style={styles.appName}>PetCare Super App</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            PetCare Super App is your all-in-one platform for managing your pet's life. From medical records and vet appointments to community discussions and emergency SOS, we strive to make pet parenting as easy and joyful as possible.
          </Text>
        </View>

        <View style={styles.linksContainer}>
          {renderLinkRow('file-document-outline', 'Terms of Service', () => handleLink('https://example.com/terms'))}
          {renderLinkRow('shield-check-outline', 'Privacy Policy', () => handleLink('https://example.com/privacy'))}
          {renderLinkRow('information-outline', 'Open Source Libraries', () => handleLink('https://example.com/licenses'))}
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} onPress={() => handleLink('https://twitter.com')}>
            <MaterialDesignIcons name="twitter" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={() => handleLink('https://facebook.com')}>
            <MaterialDesignIcons name="facebook" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={() => handleLink('https://instagram.com')}>
            <MaterialDesignIcons name="instagram" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>© {new Date().getFullYear()} PetCare Inc. All rights reserved.</Text>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  headerArea: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  descriptionBox: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
    width: '100%',
  },
  description: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24,
    textAlign: 'center',
  },
  linksContainer: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
    overflow: 'hidden',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  socialRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
  },
  copyright: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
