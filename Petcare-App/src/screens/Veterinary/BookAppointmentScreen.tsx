import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';
import { Pet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const BookAppointmentScreen = ({ route, navigation }: any) => {
  const { vetId } = route.params;
  const { user } = useAppStore();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      const allPets = await dataService.getPets();
      setPets(allPets.filter(p => p.ownerId === user?.id));
    };
    fetchPets();
  }, [user]);

  const handleNext = () => {
    if (selectedPet && reason) {
      navigation.navigate('SelectAppointmentTime', {
        vetId,
        petId: selectedPet,
        reason
      });
    }
  };

  return (
    <ScreenContainer>
      <Header title="Book Appointment" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>
        <Text style={styles.stepText}>Step 1: Details</Text>

        <Text style={styles.sectionTitle}>Who needs the appointment?</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petScroll}>
          {pets.map(pet => (
            <TouchableOpacity 
              key={pet.id} 
              style={[
                styles.petCard, 
                selectedPet === pet.id && styles.petCardActive
              ]}
              onPress={() => setSelectedPet(pet.id)}
            >
              <MaterialDesignIcons 
                name={pet.type === 'Dog' ? 'dog' : 'cat'} 
                size={32} 
                color={selectedPet === pet.id ? COLORS.primary : COLORS.textLight} 
              />
              <Text style={[styles.petName, selectedPet === pet.id && styles.petNameActive]}>{pet.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addPetBtn} onPress={() => navigation.navigate('AddPet')}>
            <MaterialDesignIcons name="plus" size={24} color={COLORS.primary} />
            <Text style={styles.addPetText}>New</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>Reason for Visit</Text>
        <Input 
          placeholder="E.g. Annual Checkup, Sick, Injury..." 
          value={reason} 
          onChangeText={setReason} 
          multiline
          numberOfLines={4}
          containerStyle={styles.reasonInput}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleNext} 
          disabled={!selectedPet || !reason}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressLine: {
    height: 2,
    width: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  stepText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  petScroll: {
    marginBottom: SPACING.xl,
  },
  petCard: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.small,
  },
  petCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  petName: {
    marginTop: SPACING.sm,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  petNameActive: {
    color: COLORS.primary,
  },
  addPetBtn: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addPetText: {
    marginTop: 4,
    color: COLORS.primary,
    fontWeight: '500',
  },
  reasonInput: {
    marginTop: SPACING.xs,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
