import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const ApplicationSuccessScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        
        <View style={styles.iconContainer}>
          <MaterialDesignIcons name="heart" size={80} color={COLORS.error} />
        </View>
        
        <Text style={styles.title}>Application Submitted!</Text>
        
        <Text style={styles.message}>
          Thank you for your interest in adopting. The shelter has received your application and will contact you within 2-3 business days.
        </Text>

        <View style={styles.card}>
          <MaterialDesignIcons name="email-check-outline" size={24} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
          <Text style={styles.cardText}>A confirmation email has been sent to your registered email address.</Text>
        </View>

        <Button 
          title="Back to Home" 
          onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })} 
          style={styles.button}
        />
        
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.error + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  message: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '10',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    width: '100%',
  },
  cardText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 20,
  },
  button: {
    width: '100%',
  },
});
