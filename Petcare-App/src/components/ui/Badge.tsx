import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', style, textStyle }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { container: { backgroundColor: COLORS.secondary + '20' }, text: { color: COLORS.secondary } };
      case 'success':
        return { container: { backgroundColor: COLORS.success + '20' }, text: { color: COLORS.success } };
      case 'warning':
        return { container: { backgroundColor: COLORS.accent + '20' }, text: { color: COLORS.accent } };
      case 'error':
        return { container: { backgroundColor: COLORS.error + '20' }, text: { color: COLORS.error } };
      case 'neutral':
        return { container: { backgroundColor: COLORS.border }, text: { color: COLORS.textLight } };
      case 'primary':
      default:
        return { container: { backgroundColor: COLORS.primary + '20' }, text: { color: COLORS.primary } };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <View style={[styles.container, vStyles.container, style]}>
      <Text style={[styles.text, vStyles.text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
