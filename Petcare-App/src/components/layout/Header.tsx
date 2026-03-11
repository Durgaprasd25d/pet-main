import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, RADIUS, SIZES } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: any; // Name type can be tricky with new lib, using any for flexibility
  onRightPress?: () => void;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBackPress, 
  rightIcon, 
  onRightPress,
  transparent = false
}) => {
  return (
    <View style={[styles.container, transparent && styles.transparent]}>
      <View style={styles.leftContainer}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <MaterialDesignIcons name="chevron-left" size={28} color={COLORS.text} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <MaterialDesignIcons name={rightIcon} size={24} color={COLORS.text} />
          </TouchableOpacity>
        ) : <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    height: SPACING.xxl * 1.5,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '50',
    marginTop: Platform.OS === 'android' ? 0 : 0, 
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  leftContainer: {
    width: 50,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 50,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  placeholder: {
    width: 40,
  }
});
