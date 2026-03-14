import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

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

  useFocusEffect(
    useCallback(() => {
      console.log('[PetsListScreen] Focused, fetching pets...');
      if (token) {
        fetchPets(token);
      }
    }, [token])
  );

  const onRefresh = () => {
    if (token) fetchPets(token);
  };

  return (
    <ScreenContainer>
      <Header title={`My Pets (${pets.length})`} />
      
      {loading && pets.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Fetching your pets...</Text>
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={onRefresh} 
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {pets.length > 0 ? (
            pets.map((pet, index) => (
              <PetCard 
                key={pet.id || index} 
                pet={pet} 
                index={index}
                onPress={() => navigation.navigate('PetProfile', { petId: pet.id })} 
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialDesignIcons name="paw-off" size={64} color={COLORS.border} />
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
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddPet')}
        activeOpacity={0.8}
      >
        <MaterialDesignIcons name="plus" size={32} color={COLORS.surface} />
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    flexGrow: 1,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: SPACING.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.md,
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
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
