import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { AdoptionCard } from '../../components/cards/AdoptionCard';
import { Input } from '../../components/ui/Input';
import { COLORS, SPACING } from '../../theme/theme';
import { dataService } from '../../services/dataService';
import { Adoption } from '../../types';

import { useAdoptionStore } from '../../store/useAdoptionStore';

export const AdoptionListScreen = ({ route, navigation }: any) => {
  const initialFilter = route.params?.filter || '';
  const { adoptions, loading, fetchAdoptions } = useAdoptionStore();
  const [searchQuery, setSearchQuery] = useState(initialFilter);

  useEffect(() => {
    fetchAdoptions();
  }, []);


  const filteredPets = adoptions.filter((p: Adoption) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      <Header title="Adopt a Pet" onBackPress={() => navigation.goBack()} rightIcon="tune" />
      
      <View style={styles.searchContainer}>
        <Input 
          placeholder="Search by breed, type, or name..." 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          leftIcon="magnify"
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchAdoptions} />}
      >
        <View style={styles.grid}>
          {filteredPets.map((pet: Adoption, index: number) => (
            <View key={pet.id} style={styles.gridItem}>
              <AdoptionCard 
                adoption={pet} 
                index={index}
                onPress={() => navigation.navigate('AdoptionDetails', { adoptionId: pet.id })} 
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};


const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  scrollContent: {
    padding: SPACING.sm,
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  gridItem: {
    width: '49%',
    marginBottom: SPACING.sm,
  },
});
