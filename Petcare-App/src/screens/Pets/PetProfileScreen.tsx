import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Badge } from '../../components/ui/Badge';
import { COLORS, SPACING, RADIUS, SHADOWS, wp, hp, SIZES } from '../../theme/theme';
import { dataService } from '../../services/dataService';
import { Pet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const PetProfileScreen = ({ route, navigation }: any) => {
  const { petId } = route.params;
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      const p = await dataService.getPetById(petId);
      if (p) {
        setPet(p);
      }
    };
    fetchPet();
  }, [petId]);

  if (!pet) {
    return (
      <ScreenContainer>
        <Header title="Pet Profile" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  const renderActionCard = (title: string, icon: string, onPress: () => void, color: string) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIconContainer, { backgroundColor: color + '20' }]}>
        <MaterialDesignIcons name={icon as any} size={28} color={color} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header 
        title="Pet Profile" 
        onBackPress={() => navigation.goBack()} 
        rightIcon="pencil-outline"
        onRightPress={() => navigation.navigate('EditPet', { petId })}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerSection}>
          <Image source={{ uri: pet.image }} style={styles.image} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{pet.name}</Text>
            <MaterialDesignIcons name={pet.gender === 'Male' ? 'gender-male' : 'gender-female'} size={24} color={pet.gender === 'Male' ? '#3b82f6' : '#ec4899'} />
          </View>
          <Text style={styles.breed}>{pet.breed}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{pet.age}</Text>
            <Text style={styles.statLabel}>Years Old</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{pet.weight}</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: pet.gender === 'Male' ? '#3b82f6' : '#ec4899' }]}>{pet.gender}</Text>
            <Text style={styles.statLabel}>Sex</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Health & Records</Text>
        <View style={styles.actionsGrid}>
          {renderActionCard('Health Card', 'cards-heart-outline', () => navigation.navigate('PetHealthCard', { petId }), COLORS.primary)}
          {renderActionCard('Vaccinations', 'needle', () => navigation.navigate('VaccinationRecords', { petId }), COLORS.secondary)}
          {renderActionCard('History', 'history', () => navigation.navigate('MedicalHistory', { petId }), COLORS.accent)}
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  image: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
    backgroundColor: COLORS.border,
    marginBottom: SPACING.md,
    borderWidth: 4,
    borderColor: COLORS.surface,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: SIZES.isSmallDevice ? 24 : 28,
    fontWeight: '900',
    color: COLORS.text,
    marginRight: 8,
  },
  breed: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  actionIconContainer: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
});
