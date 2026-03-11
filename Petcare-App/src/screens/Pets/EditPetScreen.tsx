import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, wp, SIZES } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Pet } from '../../types';

export const EditPetScreen = ({ route, navigation }: any) => {
  const { petId } = route.params;
  const [pet, setPet] = useState<Pet | null>(null);
  
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    const fetchPet = async () => {
      const p = await dataService.getPetById(petId);
      if (p) {
        setPet(p);
        setName(p.name);
        setType(p.type);
        setBreed(p.breed);
        setAge(p.age.toString());
        setWeight(p.weight);
        setGender(p.gender);
      }
    };
    fetchPet();
  }, [petId]);

  const handleSave = () => {
    // Save logic
    navigation.goBack();
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

  return (
    <ScreenContainer>
      <Header title="Edit Pet" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.imageSelector}>
          {pet ? (
            <Image source={{ uri: pet.image }} style={styles.image} />
          ) : (
            <MaterialDesignIcons name={"camera-plus" as any} size={40} color={COLORS.textLight} />
          )}
          <View style={styles.editIconBadge}>
            <MaterialDesignIcons name={"pencil" as any} size={16} color={COLORS.surface} />
          </View>
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

        <Input label="Pet Name" value={name} onChangeText={setName} />
        <Input label="Breed" value={breed} onChangeText={setBreed} />

        <View style={styles.row}>
          <Input label="Age (Years)" value={age} onChangeText={setAge} keyboardType="numeric" containerStyle={{ flex: 1, marginRight: SPACING.md }} />
          <Input label="Weight" value={weight} onChangeText={setWeight} containerStyle={{ flex: 1 }} />
        </View>

        <Button title="Update Pet Details" onPress={handleSave} style={styles.saveButton} />

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
    height: wp(30),
    width: wp(30),
    borderRadius: wp(15),
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.md,
    position: 'relative',
  },
  image: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
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
  saveButton: {
    marginTop: SPACING.lg,
  },
});
