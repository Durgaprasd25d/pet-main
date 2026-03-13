import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Badge } from '../../components/ui/Badge';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useHealthStore } from '../../store/useHealthStore';
import { useAppStore } from '../../store/useAppStore';
import { usePetStore } from '../../store/usePetStore';

export const VaccinationRecordsScreen = ({ route, navigation }: any) => {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isExpired = (dateString: string) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <ScreenContainer>
      <Header 
        title={`${pet?.name || 'Pet'}'s Vaccinations`} 
        onBackPress={() => navigation.goBack()} 
        rightIcon="plus"
        onRightPress={() => Alert.alert('Add Record', 'This feature will be available shortly.')}
      />
      
      {loading && petVaccinations.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : petVaccinations.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {petVaccinations.map((item) => {
            const expired = isExpired(item.nextDueDate);
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.titleRow}>
                    <MaterialDesignIcons 
                      name="needle" 
                      size={24} 
                      color={expired ? COLORS.error : COLORS.primary} 
                    />
                    <Text style={styles.vaccineName}>{item.vaccineType}</Text>
                  </View>
                  <Badge 
                    label={expired ? 'Expired' : 'Valid'} 
                    variant={expired ? 'error' : 'success'} 
                  />
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.detailsRow}>
                  <View style={styles.detailBox}>
                    <Text style={styles.detailLabel}>Date Given</Text>
                    <Text style={styles.detailValue}>{formatDate(item.dateAdministered)}</Text>
                  </View>
                  <View style={styles.detailBox}>
                    <Text style={styles.detailLabel}>Next Due</Text>
                    <Text style={[styles.detailValue, expired && { color: COLORS.error }]}>
                      {formatDate(item.nextDueDate)}
                    </Text>
                  </View>
                </View>
                
                {item.vetName && (
                  <View style={styles.vetRow}>
                    <MaterialDesignIcons name="account-tie-outline" size={14} color={COLORS.textLight} />
                    <Text style={styles.vetName}>Administered by {item.vetName}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.centerContainer}>
          <MaterialDesignIcons name="shield-outline" size={60} color={COLORS.border} />
          <Text style={styles.emptyText}>No vaccination records found.</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border + '50',
    marginVertical: SPACING.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBox: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  vetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    backgroundColor: COLORS.background,
    padding: 8,
    borderRadius: RADIUS.sm,
  },
  vetName: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 6,
    fontWeight: '500',
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '500',
  },
});
