import React from 'react';
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';
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
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800' }}
            style={styles.image}
          />
          <View style={styles.overlay} />
          <View style={styles.logoOverlay}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.welcomeLogo}
              resizeMode="contain"
            />
          </View>
        </View>
        
        <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, SPACING.lg) }]}>
          <View style={styles.indicator} />
          
          <Text style={styles.title}>Happy Pets,{"\n"}Healthy Life</Text>
          <Text style={styles.subtitle}>
            Connect with expert vets, manage records, and join a community that loves pets as much as you do.
          </Text>
          
          <View style={styles.buttonContainer}>
            <SwipeButton
              title="Swipe to get started"
              onSwipeComplete={() => navigation.navigate('Register')}
            />
            <Button
              title="Already have an account? Log In"
              variant="ghost"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
              color={COLORS.primary}
            />
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
  imageContainer: {
    flex: 1.2,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  logoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeLogo: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
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
  button: {
    width: '100%',
    height: 56,
    borderRadius: RADIUS.lg,
  },
  loginButton: {
    marginTop: SPACING.sm,
  },
});
