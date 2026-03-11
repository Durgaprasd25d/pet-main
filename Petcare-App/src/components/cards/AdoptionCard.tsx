import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Adoption } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface AdoptionCardProps {
  adoption: Adoption;
  onPress: () => void;
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AdoptionCard: React.FC<AdoptionCardProps> = ({ 
  adoption, 
  onPress,
  index = 0
}) => {
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
      <Image source={{ uri: adoption.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{adoption.name}</Text>
        <Text style={styles.breed} numberOfLines={1}>{adoption.breed}</Text>
        
        <View style={styles.info}>
          <View style={styles.infoTag}>
            <MaterialDesignIcons name="map-marker-outline" size={12} color={COLORS.textLight} />
            <Text style={styles.infoText}>{adoption.shelter}</Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  breed: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
    marginVertical: 2,
  },
  info: {
    flexDirection: 'row',
    marginTop: 4,
  },
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
  },
});
