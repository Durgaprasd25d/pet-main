import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppStore } from '../../store/useAppStore';
import { usePetStore } from '../../store/usePetStore';

export const AddPetScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { addPet, loading } = usePetStore();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');

  const handleSave = async () => {
    if (!name || !token) {
      Alert.alert('Error', 'Pet name is required');
      return;
    }
    
    try {
      await addPet({
        name,
        type,
        breed,
        age: parseInt(age) || 0,
        weight,
        gender,
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400' // Placeholder
      }, token);
      Alert.alert('Success', `${name} has been added to your profile!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save pet details');
      console.error('Error saving pet:', error);
    }
  };


  const renderTypeSelector = (label: string, icon: string) => (
    <TouchableOpacity 
      style={[styles.typeSelector, type === label && styles.typeSelectorActive]}
      onPress={() => setType(label)}
    >
      <MaterialDesignIcons name={icon as any} size={32} color={type === label ? COLORS.primary : COLORS.textLight} />
      <Text style={[styles.typeText, type === label && styles.typeTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderGenderSelector = (label: string, icon: string, color: string) => (
    <TouchableOpacity 
      style={[styles.genderSelector, gender === label && { borderColor: color, backgroundColor: color + '10' }]}
      onPress={() => setGender(label)}
    >
      <MaterialDesignIcons name={icon as any} size={24} color={gender === label ? color : COLORS.textLight} />
      <Text style={[styles.genderText, gender === label && { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Add Pet" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.imageSelector}>
          <MaterialDesignIcons name={"camera-plus" as any} size={40} color={COLORS.textLight} />
          <Text style={styles.imageConfigText}>Add Photo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Pet Type</Text>
          <View style={styles.row}>
            {renderTypeSelector('Dog', 'dog')}
            {renderTypeSelector('Cat', 'cat')}
            {renderTypeSelector('Bird', 'bird')}
            {renderTypeSelector('Other', 'paw')}
          </View>
        </View>

        <Input label="Pet Name" value={name} onChangeText={setName} placeholder="e.g. Bruno" />
        <Input label="Breed" value={breed} onChangeText={setBreed} placeholder="e.g. Golden Retriever" />

        <View style={styles.section}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.row}>
            {renderGenderSelector('Male', 'gender-male', '#3b82f6')}
            {renderGenderSelector('Female', 'gender-female', '#ec4899')}
          </View>
        </View>

        <View style={styles.row}>
          <Input label="Age (Years)" value={age} onChangeText={setAge} keyboardType="numeric" containerStyle={{ flex: 1, marginRight: SPACING.md }} />
          <Input label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" containerStyle={{ flex: 1 }} />
        </View>

        <Button 
          title="Save Pet" 
          onPress={handleSave} 
          style={styles.saveButton} 
          loading={loading}
          disabled={!name}
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
  imageSelector: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.md,
  },
  imageConfigText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  section: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeSelector: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: COLORS.surface,
  },
  typeSelectorActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  typeText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    fontWeight: '500',
  },
  typeTextActive: {
    color: COLORS.primary,
  },
  genderSelector: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: COLORS.surface,
  },
  genderText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 8,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: SPACING.lg,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: SPACING.sm,
  },
});
