import React from 'react';
import { View, StyleSheet, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Button } from '../../components/ui/Button';
import { SwipeButton } from '../../components/ui/SwipeButton';
import { COLORS, SPACING, RADIUS, SIZES } from '../../theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const WelcomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer withSafeArea={false}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.welcomeLogo}
            resizeMode="contain"
          />
        </View>
        
        <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, SPACING.lg) }]}>
          <View style={styles.indicator} />
          
          <Text style={styles.title}>Happy Pets,{"\n"}Healthy Life</Text>
          <Text style={styles.subtitle}>
            Connect with expert vets, manage records, and join a community that loves pets as much as you do.
          </Text>
          
          <View style={styles.buttonContainer}>
            <SwipeButton
              title="Swipe to sign in"
              onSwipeComplete={() => navigation.navigate('Login')}
            />
            <View style={styles.signupPrompt}>
              <Text style={styles.footerText}>New to Pet Care? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupText}>Sign Up Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  logoContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeLogo: {
    width: 250,
    height: 250,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl * 1.5,
    borderTopRightRadius: RADIUS.xl * 1.5,
    marginTop: -RADIUS.xl * 1.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: SIZES.isSmallDevice ? 28 : 34,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: SIZES.isSmallDevice ? 34 : 40,
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SPACING.xl,
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '500',
  },
  signupText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 14,
  },
});
