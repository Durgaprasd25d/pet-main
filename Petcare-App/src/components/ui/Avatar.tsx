import React from 'react';
import { Image, View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

interface AvatarProps {
  source?: { uri: string } | number;
  size?: number;
  style?: any;
}

export const Avatar: React.FC<AvatarProps> = ({ source, size = 50, style }) => {
  if (source && (typeof source === 'number' || source.uri)) {
    return (
      <Image
        source={source}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholderContainer,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <MaterialDesignIcons name="account" size={size * 0.6} color={COLORS.textLight} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    backgroundColor: COLORS.border,
  },
  placeholderContainer: {
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
