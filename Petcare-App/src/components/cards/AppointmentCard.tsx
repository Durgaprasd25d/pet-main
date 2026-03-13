import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Appointment } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress: () => void;
  petName?: string;
  vetName?: string;
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onPress, 
  petName, 
  vetName,
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

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { color: COLORS.success, icon: 'check-circle' as const, bg: COLORS.success + '10' };
      case 'cancelled':
        return { color: COLORS.error, icon: 'close-circle' as const, bg: COLORS.error + '10' };
      default:
        return { color: COLORS.primary, icon: 'clock-outline' as const, bg: COLORS.primary + '10' };
    }
  };

  const config = getStatusConfig(appointment.status);

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={[styles.card, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.statusLine, { backgroundColor: config.color }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.petInfo}>
            <View style={styles.petIconContainer}>
              <MaterialDesignIcons name="paw" size={14} color={COLORS.primary} />
            </View>
            <Text style={styles.petName}>{petName || 'My Pet'} • {appointment.reason}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
            <MaterialDesignIcons name={config.icon as any} size={16} color={config.color} />
            <Text style={[styles.statusText, { color: config.color }]}>{appointment.status}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.mainDetail}>
              <MaterialDesignIcons name="doctor" size={18} color={COLORS.text} style={styles.detailIcon} />
              <Text style={styles.vetName}>{vetName || 'Veterinarian'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.timeRow}>
            <View style={styles.timeItem}>
              <MaterialDesignIcons name="calendar-blank" size={16} color={COLORS.textLight} style={styles.timeIcon} />
              <Text style={styles.timeText}>{new Date(appointment.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.timeItem}>
              <MaterialDesignIcons name="clock-time-four-outline" size={16} color={COLORS.textLight} style={styles.timeIcon} />
              <Text style={styles.timeText}>{appointment.time}</Text>
            </View>
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
    flexDirection: 'row',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  statusLine: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  petIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  petName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 4,
  },
  detailsContainer: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 8,
  },
  vetName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border + '50',
    marginVertical: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 6,
  },
  timeText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },
});
