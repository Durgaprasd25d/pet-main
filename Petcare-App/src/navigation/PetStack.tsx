import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { PetsListScreen } from '../screens/Pets/PetsListScreen';
import { AddPetScreen } from '../screens/Pets/AddPetScreen';
import { PetProfileScreen } from '../screens/Pets/PetProfileScreen';
import { EditPetScreen } from '../screens/Pets/EditPetScreen';
import { PetHealthCardScreen } from '../screens/Pets/PetHealthCardScreen';
import { VaccinationRecordsScreen } from '../screens/Pets/VaccinationRecordsScreen';
import { MedicalHistoryScreen } from '../screens/Pets/MedicalHistoryScreen';
import { AddMedicalRecordScreen } from '../screens/Pets/AddMedicalRecordScreen';
import { AddVaccinationScreen } from '../screens/Pets/AddVaccinationScreen';

export type PetStackParamList = {
  PetsList: undefined;
  AddPet: undefined;
  PetProfile: { petId: string };
  EditPet: { petId: string };
  PetHealthCard: { petId: string };
  VaccinationRecords: { petId: string };
  MedicalHistory: { petId: string };
  AddMedicalRecord: { petId: string };
  AddVaccination: { petId: string };
};

const Stack = createNativeStackNavigator<PetStackParamList>();

export const PetStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PetsList" component={PetsListScreen} />
      <Stack.Screen name="AddPet" component={AddPetScreen} />
      <Stack.Screen name="PetProfile" component={PetProfileScreen} />
      <Stack.Screen name="EditPet" component={EditPetScreen} />
      <Stack.Screen name="PetHealthCard" component={PetHealthCardScreen} />
      <Stack.Screen name="VaccinationRecords" component={VaccinationRecordsScreen} />
      <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
      <Stack.Screen name="AddMedicalRecord" component={AddMedicalRecordScreen} />
      <Stack.Screen name="AddVaccination" component={AddVaccinationScreen} />
    </Stack.Navigator>
  );
};
