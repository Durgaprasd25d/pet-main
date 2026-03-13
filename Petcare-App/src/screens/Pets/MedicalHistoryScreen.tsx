import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { usePetStore } from '../../store/usePetStore';

export const MedicalHistoryScreen = ({ route, navigation }: any) => {
  const { petId } = route.params;
  const { pets } = usePetStore();
  const pet = pets.find(p => p.id === petId);

  const medicalHistory = pet?.medicalHistory || [];

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <ScreenContainer>
      <Header 
        title={`${pet?.name || 'Pet'}'s Medical History`} 
        onBackPress={() => navigation.goBack()} 
      />
      
      {medicalHistory.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {medicalHistory.map((record, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.dateRow}>
                <MaterialDesignIcons name="calendar-blank-outline" size={16} color={COLORS.textLight} />
                <Text style={styles.date}>{formatDate(record.date)}</Text>
              </View>
              
              <Text style={styles.diagnosis}>{record.title}</Text>
              
              <View style={styles.infoRow}>
                <MaterialDesignIcons name="clipboard-pulse-outline" size={20} color={COLORS.primary} style={styles.icon} />
                <Text style={styles.infoText}>{record.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialDesignIcons name="clipboard-off-outline" size={60} color={COLORS.border} />
          <Text style={styles.emptyText}>No medical records found for {pet?.name}.</Text>
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    marginTop: SPACING.md,
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  date: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '600',
  },
  diagnosis: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    backgroundColor: COLORS.background + '50',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: '500',
  },
});
