import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { useHealthStore } from '../../store/useHealthStore';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export const AddVaccinationScreen = ({ navigation, route }: any) => {
  const { petId } = route.params;
  const { token } = useAppStore();
  const { addVaccination, loading } = useHealthStore();

  const [form, setForm] = useState({
    vaccineType: '',
    vetName: '',
    notes: ''
  });

  const [dateAdministered, setDateAdministered] = useState(new Date());
  const [nextDueDate, setNextDueDate] = useState<Date | null>(null);
  
  const [showAdminPicker, setShowAdminPicker] = useState(false);
  const [showDuePicker, setShowDuePicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const onAdminDateChange = (event: any, selectedDate?: Date) => {
    setShowAdminPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateAdministered(selectedDate);
    }
  };

  const onDueDateChange = (event: any, selectedDate?: Date) => {
    setShowDuePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNextDueDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!form.vaccineType) {
      Alert.alert('Error', 'Please fill in vaccine type');
      return;
    }

    if (nextDueDate && nextDueDate < dateAdministered) {
      Alert.alert('Error', 'Next due date cannot be before administration date');
      return;
    }

    try {
      const vaccinationData = {
        ...form,
        petId,
        dateAdministered: formatDate(dateAdministered),
        nextDueDate: nextDueDate ? formatDate(nextDueDate) : undefined
      };

      await addVaccination(vaccinationData, token!);
      Alert.alert('Success', 'Vaccination record added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add vaccination record');
    }
  };

  return (
    <ScreenContainer>
      <Header title="Add Vaccination" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vaccine Type *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Rabies, DHPP, FVRCP"
            value={form.vaccineType}
            onChangeText={(text) => setForm({ ...form, vaccineType: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date Administered *</Text>
          <TouchableOpacity 
            style={styles.dateInput} 
            onPress={() => setShowAdminPicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(dateAdministered)}</Text>
            <MaterialDesignIcons name="calendar-month" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          {showAdminPicker && (
            <DateTimePicker
              value={dateAdministered}
              mode="date"
              display="default"
              onChange={onAdminDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Next Due Date</Text>
          <TouchableOpacity 
            style={styles.dateInput} 
            onPress={() => setShowDuePicker(true)}
          >
            <Text style={[styles.dateText, !nextDueDate && { color: COLORS.textLight }]}>
              {nextDueDate ? formatDate(nextDueDate) : 'Select optional due date'}
            </Text>
            <MaterialDesignIcons name="calendar-clock" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          {nextDueDate && (
            <TouchableOpacity 
              style={styles.clearDate} 
              onPress={() => setNextDueDate(null)}
            >
              <Text style={styles.clearDateText}>Clear Due Date</Text>
            </TouchableOpacity>
          )}
          {showDuePicker && (
            <DateTimePicker
              value={nextDueDate || new Date()}
              mode="date"
              display="default"
              onChange={onDueDateChange}
              minimumDate={dateAdministered}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Veterinarian / Clinic</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Dr. Smith @ PetCare Clinic"
            value={form.vetName}
            onChangeText={(text) => setForm({ ...form, vetName: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any reactions, brand info, etc."
            multiline
            numberOfLines={4}
            value={form.notes}
            onChangeText={(text) => setForm({ ...form, notes: text })}
          />
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Record</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  clearDate: {
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  clearDateText: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xl,
    ...SHADOWS.medium,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
