import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { usePetStore } from '../../store/usePetStore';
import { useHealthStore } from '../../store/useHealthStore';
import { useAppStore } from '../../store/useAppStore';

export const PetHealthCardScreen = ({ navigation, route }: any) => {
  const { petId } = route.params;
  const { token } = useAppStore();
  const { pets } = usePetStore();
  const { vaccinations, fetchVaccinations, loading } = useHealthStore();
  
  const pet = pets.find(p => p.id === petId);
  const petVaccinations = vaccinations[petId] || [];

  useEffect(() => {
    if (token && petId) {
      fetchVaccinations(petId, token);
    }
  }, [petId, token]);

  const timelineData = useMemo(() => {
    const data: any[] = [];
    
    // Add vaccinations
    petVaccinations.forEach(v => {
      data.push({
        id: `v-${v.id}`,
        timestamp: new Date(v.dateAdministered).getTime(),
        date: new Date(v.dateAdministered).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: v.vaccineType,
        subtitle: v.vetName || 'General Practice',
        type: 'vaccine',
        icon: 'needle',
        color: COLORS.primary
      });
    });

    // Add medical history
    if (pet?.medicalHistory) {
      pet.medicalHistory.forEach((m, idx) => {
        data.push({
          id: `m-${idx}`,
          timestamp: new Date(m.date).getTime(),
          date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          title: m.title,
          subtitle: m.description,
          type: 'medical',
          icon: 'clipboard-pulse-outline',
          color: COLORS.secondary
        });
      });
    }

    // Sort by date descending
    return data.sort((a, b) => b.timestamp - a.timestamp);
  }, [petVaccinations, pet]);

  if (!pet) return null;

  return (
    <ScreenContainer>
      <Header title={`${pet.name}'s Health Card`} onBackPress={() => navigation.goBack()} rightIcon="share-variant" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.summaryCard}>
          <MaterialDesignIcons name="shield-check" size={48} color={COLORS.primary} style={{ marginBottom: SPACING.sm }} />
          <Text style={styles.summaryStatus}>Digital Health Profile</Text>
          <Text style={styles.summaryDesc}>
            All medical records and vaccinations for {pet.name} are securely stored and synced.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Activity Timeline</Text>
        
        {loading && timelineData.length === 0 ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
        ) : timelineData.length > 0 ? (
          <View style={styles.timelineContainer}>
            {timelineData.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineIconContainer, { backgroundColor: item.color + '20' }]}>
                    <MaterialDesignIcons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  {index !== timelineData.length - 1 && <View style={styles.timelineLine} />}
                </View>
                
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                  <View style={styles.timelineCard}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    <Text style={styles.timelineSubtitle} numberOfLines={2}>{item.subtitle}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No health records yet.</Text>
          </View>
        )}

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
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  summaryStatus: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    marginVertical: SPACING.xs,
    letterSpacing: -0.5,
  },
  summaryDesc: {
    textAlign: 'center',
    color: COLORS.textLight,
    lineHeight: 20,
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: SPACING.lg,
    letterSpacing: -0.5,
  },
  timelineContainer: {
    paddingLeft: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timelineIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border + '50',
    marginTop: -4,
    marginBottom: -4,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: SPACING.xl,
  },
  timelineDate: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  timelineCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border + '40',
    ...SHADOWS.small,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  timelineSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
    fontWeight: '500',
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '500',
  },
});
