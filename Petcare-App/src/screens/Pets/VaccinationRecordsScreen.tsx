import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Badge } from '../../components/ui/Badge';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

const vaccines = [
  { id: '1', name: 'Rabies', dateGiven: 'Feb 15, 2026', nextDue: 'Feb 15, 2027', status: 'Valid' },
  { id: '2', name: 'DHPP', dateGiven: 'Nov 10, 2025', nextDue: 'Nov 10, 2026', status: 'Valid' },
  { id: '3', name: 'Bordetella', dateGiven: 'Jan 05, 2022', nextDue: 'Jan 05, 2023', status: 'Expired' },
];

export const VaccinationRecordsScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Vaccinations" onBackPress={() => navigation.goBack()} rightIcon="plus" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {vaccines.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleRow}>
                <MaterialDesignIcons name="needle" size={24} color={item.status === 'Valid' ? COLORS.primary : COLORS.error} />
                <Text style={styles.vaccineName}>{item.name}</Text>
              </View>
              <Badge 
                label={item.status} 
                variant={item.status === 'Valid' ? 'success' : 'error'} 
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Date Given</Text>
                <Text style={styles.detailValue}>{item.dateGiven}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Next Due</Text>
                <Text style={[styles.detailValue, item.status === 'Expired' && { color: COLORS.error }]}>
                  {item.nextDue}
                </Text>
              </View>
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
    paddingBottom: SPACING.xl,
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
    backgroundColor: COLORS.border,
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
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
});
