import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

export const VaccinationReminderScreen = ({ navigation }: any) => {

  return (
    <ScreenContainer>
      <Header title="Add Vaccination Reminder" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Keep track of your pet's vaccination schedule to ensure they stay healthy and compliant with local laws.</Text>
        </View>

        <Input label="Select Pet" placeholder="e.g. Max" />
        <Input label="Vaccine Type" placeholder="e.g. Rabies, DHPP" />
        <Input label="Date Administered" placeholder="YYYY-MM-DD" leftIcon="calendar" />
        <Input label="Next Due Date" placeholder="YYYY-MM-DD" leftIcon="calendar-alert" />
        <Input label="Veterinarian/Clinic" placeholder="e.g. City Vet Clinic" />
        <Input 
          label="Notes" 
          placeholder="Any reactions, brand of vaccine, etc." 
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        <Button title="Save Reminder" onPress={() => navigation.goBack()} style={{ marginTop: SPACING.xl }} />

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
    backgroundColor: COLORS.primary + '15',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});
