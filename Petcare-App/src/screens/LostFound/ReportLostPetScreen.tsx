import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const ReportLostPetScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleReport = () => {
    // Submit logic
    navigation.goBack();
  };

  const renderTypeSelector = (label: string, icon: string) => (
    <TouchableOpacity 
      style={[styles.typeSelector, type === label && styles.typeSelectorActive]}
      onPress={() => setType(label)}
    >
      <MaterialDesignIcons name={icon as any} size={28} color={type === label ? COLORS.error : COLORS.textLight} />
      <Text style={[styles.typeText, type === label && { color: COLORS.error }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Report Lost Pet" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.imageConfig}>
          <MaterialDesignIcons name={"camera-plus" as any} size={40} color={COLORS.textLight} />
          <Text style={styles.imageText}>Upload Photo</Text>
        </View>

        <Text style={styles.sectionTitle}>Pet Type</Text>
        <View style={styles.typeRow}>
          {renderTypeSelector('Dog', 'dog')}
          {renderTypeSelector('Cat', 'cat')}
          {renderTypeSelector('Bird', 'bird')}
          {renderTypeSelector('Other', 'paw')}
        </View>

        <Input label="Pet Name" value={name} onChangeText={setName} placeholder="e.g. Max" />
        <Input label="Breed" value={breed} onChangeText={setBreed} placeholder="e.g. Golden Retriever" />
        <Input label="Last Seen Location" value={location} onChangeText={setLocation} placeholder="e.g. Central Park, NY" leftIcon="map-marker-outline" />
        <Input label="Date Lost" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" leftIcon="calendar-outline" />
        
        <Text style={styles.sectionTitle}>Distinctive Features & Details</Text>
        <Input 
          placeholder="Describe collar color, markings, tags, etc." 
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
          color={COLORS.error}
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
    borderColor: COLORS.error,
    backgroundColor: COLORS.error + '10',
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
