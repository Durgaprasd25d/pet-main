import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { AdoptionCard } from '../../components/cards/AdoptionCard';
import { Input } from '../../components/ui/Input';
import { COLORS, SPACING } from '../../theme/theme';
import { dataService } from '../../services/dataService';
import { Adoption } from '../../types';

export const AdoptionListScreen = ({ route, navigation }: any) => {
  const initialFilter = route.params?.filter || '';
  const [pets, setPets] = useState<Adoption[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialFilter);

  const loadData = async () => {
    setRefreshing(true);
    const fetchedAdoptions = await dataService.getAdoptions();
    setPets(fetchedAdoptions);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPets = pets.filter(p => 
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
      >
        <View style={styles.grid}>
          {filteredPets.map((pet, index) => (
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
