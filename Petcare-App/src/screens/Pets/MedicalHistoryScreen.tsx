import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

const history = [
  { id: '1', date: 'March 10, 2026', diagnosis: 'Mild Ear Infection', treatment: 'Prescribed ear drops twice daily for 7 days.', clinic: 'Paws & Care Clinic' },
  { id: '2', date: 'August 22, 2025', diagnosis: 'Upset Stomach', treatment: 'Bland diet and probiotics.', clinic: 'City Animal Hospital' },
];

export const MedicalHistoryScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Medical History" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {history.map((record) => (
          <View key={record.id} style={styles.card}>
            <View style={styles.dateRow}>
              <MaterialDesignIcons name="calendar-blank-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.date}>{record.date}</Text>
            </View>
            
            <Text style={styles.diagnosis}>{record.diagnosis}</Text>
            
            <View style={styles.infoRow}>
              <MaterialDesignIcons name="hospital-building" size={20} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.infoText}>{record.clinic}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialDesignIcons name="medical-bag" size={20} color={COLORS.error} style={styles.icon} />
              <Text style={styles.infoText}>{record.treatment}</Text>
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
  },
  diagnosis: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
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
  },
});
