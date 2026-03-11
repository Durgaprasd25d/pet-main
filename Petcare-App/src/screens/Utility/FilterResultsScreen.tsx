import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

export const FilterResultsScreen = ({ navigation }: any) => {

  const [distance, setDistance] = useState('5mi');
  const [rating, setRating] = useState('4+');
  const [availability, setAvailability] = useState('Any');
  const [price, setPrice] = useState('$$');

  const DISTANCES = ['5mi', '10mi', '25mi', '50mi+'];
  const RATINGS = ['Any', '3+', '4+', '4.5+'];
  const AVAILABILITY = ['Any', 'Open Now', 'Today', 'This Week'];
  const PRICES = ['$', '$$', '$$$', 'Any'];

  const renderFilterSection = (title: string, options: string[], selected: string, onSelect: (val: string) => void) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.chipRow}>
        {options.map(opt => (
          <TouchableOpacity 
            key={opt} 
            style={[styles.chip, selected === opt && styles.chipActive]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[styles.chipText, selected === opt && styles.chipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Filters" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {renderFilterSection('Distance', DISTANCES, distance, setDistance)}
        {renderFilterSection('Rating', RATINGS, rating, setRating)}
        {renderFilterSection('Availability', AVAILABILITY, availability, setAvailability)}
        {renderFilterSection('Price Range', PRICES, price, setPrice)}

      </ScrollView>
      <View style={styles.footer}>
        <Button title="Reset" variant="outline" onPress={() => {}} style={styles.resetBtn} />
        <Button title="Apply Filters" onPress={() => navigation.goBack()} style={styles.applyBtn} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.round,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  chipTextActive: {
    color: COLORS.surface,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resetBtn: {
    flex: 0.4,
    marginRight: SPACING.md,
  },
  applyBtn: {
    flex: 0.6,
  },
});
