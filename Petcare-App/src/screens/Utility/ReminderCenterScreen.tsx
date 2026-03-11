import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const ReminderCenterScreen = ({ navigation }: any) => {

  const REMINDERS = [
    { id: 1, title: 'Annual Vaccination', pet: 'Max', date: 'Oct 15, 2023', icon: 'needle', color: COLORS.error },
    { id: 2, title: 'Grooming Appointment', pet: 'Bella', date: 'Oct 20, 2023', icon: 'content-cut', color: COLORS.primary },
    { id: 3, title: 'Heartworm Medication', pet: 'Max', date: 'Nov 01, 2023', icon: 'pill', color: COLORS.success },
  ];

  return (
    <ScreenContainer>
      <Header title="Reminders" onBackPress={() => navigation.goBack()} rightIcon="plus" onRightPress={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.dateSelectorRow}>
          <TouchableOpacity style={styles.dateActive}>
            <Text style={styles.dateTextActive}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInactive}>
            <Text style={styles.dateTextInactive}>Past</Text>
          </TouchableOpacity>
        </View>

        {REMINDERS.map(rem => (
          <View key={rem.id} style={styles.reminderCard}>
            <View style={[styles.iconBox, { backgroundColor: rem.color + '20' }]}>
              <MaterialDesignIcons name={rem.icon as any} size={18} color={COLORS.primary} />
            </View>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderTitle}>{rem.title}</Text>
              <Text style={styles.reminderSub}>For: {rem.pet} • {rem.date}</Text>
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <MaterialDesignIcons name="dots-vertical" size={24} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.createBanner}>
          <MaterialDesignIcons name="bell-ring-outline" size={32} color={COLORS.surface} />
          <View style={{ marginLeft: SPACING.md }}>
            <Text style={styles.bannerTitle}>Set a Custom Reminder</Text>
            <Text style={styles.bannerSub}>Meds, walks, feeding...</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
  },
  dateSelectorRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.surface,
    padding: 4,
    borderRadius: RADIUS.lg,
  },
  dateActive: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  dateInactive: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  dateTextActive: {
    color: COLORS.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateTextInactive: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 14,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  reminderSub: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  moreBtn: {
    padding: SPACING.xs,
  },
  createBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginTop: SPACING.lg,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  bannerSub: {
    fontSize: 14,
    color: COLORS.surface + 'dd',
    marginTop: 2,
  },
});
