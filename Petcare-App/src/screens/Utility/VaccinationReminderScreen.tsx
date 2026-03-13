import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { useHealthStore } from '../../store/useHealthStore';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const VaccinationReminderScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { upcomingVaccinations, fetchUpcomingVaccinations, loading } = useHealthStore();

  useEffect(() => {
    if (token) {
      fetchUpcomingVaccinations(token);
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <ScreenContainer>
      <Header title="Vaccination Reminders" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Never miss a shot! Here are the upcoming vaccinations for all your pets to keep them protected.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : upcomingVaccinations.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialDesignIcons name="calendar-check-outline" size={64} color={COLORS.textLight + '40'} />
            <Text style={styles.emptyText}>No upcoming vaccinations found.</Text>
          </View>
        ) : (
          upcomingVaccinations.map((v: any) => (
            <View key={v.id} style={styles.reminderCard}>
              <View style={styles.cardHeader}>
                <Image 
                  source={{ uri: v.petId?.image || 'https://via.placeholder.com/150' }} 
                  style={styles.petImage} 
                />
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{v.petId?.name}</Text>
                  <Text style={styles.petBreed}>{v.petId?.breed || v.petId?.type}</Text>
                </View>
                <View style={[styles.dueBadge, isOverdue(v.nextDueDate) && styles.overdueBadge]}>
                  {isOverdue(v.nextDueDate) && (
                    <MaterialDesignIcons name="alert-circle-outline" size={14} color={COLORS.white} style={{ marginRight: 4 }} />
                  )}
                  <Text style={styles.dueText}>
                    {isOverdue(v.nextDueDate) ? 'OVERDUE' : 'DUE'}
                  </Text>
                </View>
              </View>

              <View style={styles.vaccineDetails}>
                <Text style={styles.vaccineName}>{v.vaccineType}</Text>
                <View style={styles.dateRow}>
                  <MaterialDesignIcons name="calendar-clock" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>Due: {formatDate(v.nextDueDate)}</Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => navigation.navigate('Booking', { petId: v.petId?._id })}
                >
                  <Text style={styles.bookButtonText}>Book Vet</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.doneButton}
                  onPress={() => navigation.navigate('AddVaccination', { petId: v.petId?._id })}
                >
                  <Text style={styles.doneButtonText}>Mark Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  infoBox: {
    backgroundColor: COLORS.primary + '10',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },
  infoText: {
    color: COLORS.primary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: SPACING.md,
    color: COLORS.textLight,
    fontSize: 16,
  },
  reminderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  petImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: SPACING.sm,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  petBreed: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  dueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  overdueBadge: {
    backgroundColor: COLORS.error,
  },
  dueText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  vaccineDetails: {
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  vaccineName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    fontSize: 14,
    color: COLORS.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  bookButton: {
    flex: 1,
    backgroundColor: COLORS.primary + '15',
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  bookButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  doneButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  doneButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
