import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { VetCard } from '../../components/cards/VetCard';
import { Input } from '../../components/ui/Input';
import { COLORS, SPACING, SIZES } from '../../theme/theme';
import { dataService } from '../../services/dataService';
import { Vet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const VetListScreen = ({ navigation }: any) => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setRefreshing(true);
    const fetchedVets = await dataService.getVets();
    setVets(fetchedVets);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredVets = vets.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      <Header title="Find a Vet" onBackPress={() => navigation.goBack()} rightIcon="map-legend" />
      
      <View style={styles.searchSection}>
        <Input 
          placeholder="Search for vets or specialties..." 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          leftIcon="magnify"
          containerStyle={styles.searchInput}
        />
        <View style={styles.filterRow}>
          <View style={styles.filterChip}>
            <Text style={styles.filterText}>Nearby</Text>
            <MaterialDesignIcons name="chevron-down" size={14} color={COLORS.primary} />
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterText}>Specialty</Text>
            <MaterialDesignIcons name="chevron-down" size={14} color={COLORS.primary} />
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterText}>Rating</Text>
            <MaterialDesignIcons name="chevron-down" size={14} color={COLORS.primary} />
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} colors={[COLORS.primary]} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultsCount}>{filteredVets.length} Vets found in your area</Text>
        {filteredVets.map((vet, index) => (
          <VetCard 
            key={vet.id} 
            vet={vet} 
            index={index}
            onPress={() => navigation.navigate('VetProfile', { vetId: vet.id })} 
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    marginBottom: SPACING.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
    flexGrow: 1,
  },
});
