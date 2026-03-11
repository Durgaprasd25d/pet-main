import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Vet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface VetCardProps {
  vet: Vet;
  onPress: () => void;
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const VetCard: React.FC<VetCardProps> = ({ vet, onPress, index = 0 }) => {
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
      <Image source={{ uri: vet.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{vet.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialDesignIcons name="star" size={14} color="#fbbf24" />
            <Text style={styles.rating}>{vet.rating}</Text>
          </View>
        </View>
        <Text style={styles.specialty}>{vet.specialty}</Text>
        
        <View style={styles.clinicInfo}>
          <MaterialDesignIcons name="hospital-building" size={14} color={COLORS.textLight} />
          <Text style={styles.clinicName} numberOfLines={1}>{vet.clinicName}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.locationTag}>
            <MaterialDesignIcons name="map-marker-outline" size={12} color={COLORS.primary} />
            <Text style={styles.distance}>{vet.distance}</Text>
          </View>
          <Text style={styles.reviewCount}>{vet.reviews} reviews</Text>
        </View>
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
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginLeft: SPACING.xs,
  },
  rating: {
    fontSize: 12,
    fontWeight: '800',
    color: '#d97706',
    marginLeft: 2,
  },
  specialty: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: -2,
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  clinicName: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.round,
  },
  distance: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '700',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
});
