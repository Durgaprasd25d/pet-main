import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS, SPACING } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { ScreenContainer } from '../../components/layout/ScreenContainer';

export const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    // Simulate initial loading or token check
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer style={styles.container}>
      <MaterialDesignIcons name="paw" size={100} color={COLORS.surface} />
      <Text style={styles.title}>PetCare</Text>
      <Text style={styles.subtitle}>Super App</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.surface,
    opacity: 0.8,
  },
});
