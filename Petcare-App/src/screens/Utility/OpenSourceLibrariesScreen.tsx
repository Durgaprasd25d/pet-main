import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';

const LIBRARIES = [
  { name: 'React Native', version: '0.74.x', license: 'MIT' },
  { name: 'React Navigation', version: '6.x', license: 'MIT' },
  { name: 'Zustand', version: '4.x', license: 'MIT' },
  { name: 'React Native Reanimated', version: '3.x', license: 'MIT' },
  { name: 'React Native Vector Icons', version: '9.x', license: 'MIT' },
  { name: 'Axios', version: '1.x', license: 'MIT' },
  { name: 'Mongoose', version: '8.x', license: 'MIT' },
];

export const OpenSourceLibrariesScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Open Source Libraries" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          This application is built using incredible open-source technology. We are grateful to the following creators and communities:
        </Text>

        {LIBRARIES.map((lib, index) => (
          <View key={index} style={styles.libCard}>
            <View style={styles.row}>
              <Text style={styles.libName}>{lib.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{lib.license}</Text>
              </View>
            </View>
            <Text style={styles.version}>Version: {lib.version}</Text>
          </View>
        ))}

        <Text style={styles.footerText}>
          And many other small but important dependencies that make PetCare possible.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  intro: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.xs,
  },
  libCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  libName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  badge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.round,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  version: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  footerText: {
    marginTop: SPACING.xl,
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});
