import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

// Mock notifications
const notifications = [
  { id: '1', title: 'Vaccination Reminder', message: 'Bruno is due for rabies vaccination next week.', time: '2h ago', icon: 'needle', color: COLORS.accent },
  { id: '2', title: 'Appointment Confirmed', message: 'Dr. Sarah Jenkins has confirmed your appointment.', time: '5h ago', icon: 'calendar-check', color: COLORS.success },
  { id: '3', title: 'New Pet Adoptions', message: 'Check out the new puppies at City Shelter.', time: '1d ago', icon: 'paw', color: COLORS.primary },
];

export const NotificationsScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Notifications" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map((notif) => (
          <View key={notif.id} style={styles.notificationCard}>
            <View style={[styles.iconContainer, { backgroundColor: notif.color + '20' }]}>
              <MaterialDesignIcons name={notif.icon as any} size={24} color={notif.color} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{notif.title}</Text>
                <Text style={styles.time}>{notif.time}</Text>
              </View>
              <Text style={styles.message}>{notif.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  time: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  message: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});
