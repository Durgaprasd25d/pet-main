import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
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
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Pet Care</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginTop: SPACING.xl,
  },
});
