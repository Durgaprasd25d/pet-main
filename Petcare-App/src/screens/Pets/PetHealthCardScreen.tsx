import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { usePetStore } from '../../store/usePetStore';

const mockTimeline = [
  { id: '1', date: 'March 10, 2026', title: 'Annual Checkup', doctor: 'Dr. Sarah Jenkins', type: 'visit', icon: 'stethoscope', color: COLORS.primary },
  { id: '2', date: 'February 15, 2026', title: 'Rabies Vaccine', doctor: 'Dr. Mark Ruffles', type: 'vaccine', icon: 'needle', color: COLORS.secondary },
  { id: '3', date: 'January 05, 2026', title: 'Deworming', doctor: 'Dr. Sarah Jenkins', type: 'treatment', icon: 'pill', color: COLORS.accent },
];

export const PetHealthCardScreen = ({ navigation, route }: any) => {
  const { petId } = route.params;
  const { pets } = usePetStore();
  const pet = pets.find(p => p.id === petId);

  return (
    <ScreenContainer>
      <Header title={`${pet?.name || 'Digital'} Health Card`} onBackPress={() => navigation.goBack()} rightIcon="share-variant" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.summaryCard}>
          <MaterialDesignIcons name={"cards-heart" as any} size={40} color={COLORS.error} style={{ marginBottom: SPACING.sm }} />
          <Text style={styles.summaryTitle}>Overall Health</Text>
          <Text style={styles.summaryStatus}>Excellent</Text>
          <Text style={styles.summaryDesc}>All vaccinations are up to date. Next checkup recommended in 6 months.</Text>
        </View>

        <Text style={styles.sectionTitle}>Medical Timeline</Text>
        
        <View style={styles.timelineContainer}>
          {mockTimeline.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineIconContainer, { backgroundColor: item.color + '20' }]}>
                  <MaterialDesignIcons name={item.icon as any} size={20} color={item.color} />
                </View>
                {index !== mockTimeline.length - 1 && <View style={styles.timelineLine} />}
              </View>
              
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{item.date}</Text>
                <View style={styles.timelineCard}>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineDoctor}>{item.doctor}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  summaryTitle: {
    fontSize: 18,
    color: COLORS.textLight,
  },
  summaryStatus: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: SPACING.xs,
  },
  summaryDesc: {
    textAlign: 'center',
    color: COLORS.textLight,
    lineHeight: 20,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  timelineContainer: {
    paddingLeft: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timelineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginTop: -8,
    marginBottom: -8,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: SPACING.lg,
  },
  timelineDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
    marginTop: SPACING.xs,
  },
  timelineCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timelineDoctor: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
