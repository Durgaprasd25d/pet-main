import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import { useLostPetStore } from '../../store/useLostPetStore';
import { useAppStore } from '../../store/useAppStore';

export const ReportFoundPetScreen = ({ navigation }: any) => {
  const { reportPet } = useLostPetStore();
  const { token } = useAppStore();
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleReport = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await reportPet({
        type,
        breed,
        location,
        date,
        description,
        status: 'Found',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400' // Placeholder
      }, token);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const renderTypeSelector = (label: string, icon: string) => (
    <TouchableOpacity 
      style={[styles.typeSelector, type === label && styles.typeSelectorActive]}
      onPress={() => setType(label)}
    >
      <MaterialDesignIcons name={icon as any} size={28} color={type === label ? COLORS.success : COLORS.textLight} />
      <Text style={[styles.typeText, type === label && { color: COLORS.success }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Report Found Pet" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.imageConfig}>
          <MaterialDesignIcons name={"camera-plus" as any} size={40} color={COLORS.textLight} />
          <Text style={styles.imageText}>Upload Photo of the Pet</Text>
        </View>

        <Text style={styles.sectionTitle}>Pet Type</Text>
        <View style={styles.typeRow}>
          {renderTypeSelector('Dog', 'dog')}
          {renderTypeSelector('Cat', 'cat')}
          {renderTypeSelector('Bird', 'bird')}
          {renderTypeSelector('Other', 'paw')}
        </View>

        <Input label="Apparent Breed (If known)" value={breed} onChangeText={setBreed} placeholder="e.g. Labrador Mix" />
        <Input label="Found Location" value={location} onChangeText={setLocation} placeholder="e.g. Near City Hall" leftIcon="map-marker-outline" />
        <Input label="Date Found" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" leftIcon="calendar-outline" />
        
        <Text style={styles.sectionTitle}>Condition & Distinguishing Marks</Text>
        <Input 
          placeholder="Collar details, injuries, friendly/scared..." 
          value={description} 
          onChangeText={setDescription} 
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        <Button 
          title="Submit Report" 
          onPress={handleReport} 
          style={styles.submitBtn}
          color={COLORS.success}
          loading={loading}
          disabled={loading || !location}
        />

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  imageConfig: {
    height: 150,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  imageText: {
    marginTop: SPACING.sm,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  typeSelector: {
    flex: 1,
    height: 70,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  typeSelectorActive: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '10',
  },
  typeText: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  submitBtn: {
    marginTop: SPACING.xl,
  },
});
