import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Pet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface PetCardProps {
  pet: Pet;
  onPress: () => void;
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PetCard: React.FC<PetCardProps> = ({ pet, onPress, index = 0 }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={[styles.card, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Image source={{ uri: pet.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pet.name}</Text>
          <View style={styles.genderIcon}>
            <MaterialDesignIcons 
              name={pet.gender === 'Male' ? 'gender-male' : 'gender-female'} 
              size={18} 
              color={pet.gender === 'Male' ? '#3b82f6' : '#ec4899'} 
            />
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialDesignIcons name="cake-variant-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.infoText}>{pet.age}y</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialDesignIcons name="weight-kilogram" size={14} color={COLORS.textLight} />
            <Text style={styles.infoText}>{pet.weight}</Text>
          </View>
        </View>
        
        <View style={styles.tagContainer}>
          <View style={[styles.tag, { backgroundColor: COLORS.primary + '10' }]}>
            <Text style={[styles.tagText, { color: COLORS.primary }]}>{pet.breed}</Text>
          </View>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.border} />
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: SPACING.xs,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    marginLeft: 4,
  },
  tagContainer: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  genderIcon: {
    marginLeft: SPACING.xs,
  },
  arrowContainer: {
    paddingHorizontal: SPACING.xs,
  },
});
