import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withSafeArea?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ 
  children, 
  style,
  withSafeArea = true 
}) => {
  const content = <View style={[styles.container, style]}>{children}</View>;

  const insets = useSafeAreaInsets();

  if (withSafeArea) {
    return (
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {content}
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
