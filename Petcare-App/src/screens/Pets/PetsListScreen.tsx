import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { PetCard } from '../../components/cards/PetCard';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { usePetStore } from '../../store/usePetStore';

import { Pet } from '../../types';

export const PetsListScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { pets, loading, fetchPets } = usePetStore();

  useEffect(() => {
    if (token) fetchPets(token);
  }, [token]);

  const onRefresh = () => {
    if (token) fetchPets(token);
  };


  return (
    <ScreenContainer>
      <Header 
        title="My Pets" 
        rightIcon="plus" 
        onRightPress={() => navigation.navigate('AddPet')} 
      />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >
        {pets.length > 0 ? (
          pets.map((pet, index) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              index={index}
              onPress={() => navigation.navigate('PetProfile', { petId: pet.id })} 
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Pets Found</Text>
            <Text style={styles.emptyDesc}>You haven't added any pets to your profile yet.</Text>
            <Button 
              title="Add a Pet" 
              icon="plus" 
              onPress={() => navigation.navigate('AddPet')} 
              style={styles.addButton}
            />
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  addButton: {
    width: 200,
  },
});
