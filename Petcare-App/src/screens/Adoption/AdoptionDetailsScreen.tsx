import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Adoption } from '../../types';

export const AdoptionDetailsScreen = ({ route, navigation }: any) => {
  const { adoptionId } = route.params;
  const [pet, setPet] = useState<Adoption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const adoptions = await dataService.getAdoptions();
      const a = adoptions.find(ad => ad.id === adoptionId);
      if (a) setPet(a);
    };
    fetchData();
  }, [adoptionId]);

  if (!pet) {
    return (
      <ScreenContainer>
        <Header title="Adoption Details" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.image }} style={styles.image} />
          <View style={styles.headerControls}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <MaterialDesignIcons name="arrow-left" size={24} color={COLORS.surface} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.favBtn}>
              <MaterialDesignIcons name="heart-outline" size={24} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{pet.name}</Text>
            <MaterialDesignIcons name={pet.gender === 'Male' ? 'gender-male' : 'gender-female'} size={28} color={pet.gender === 'Male' ? '#3b82f6' : '#ec4899'} />
          </View>
          
          <View style={styles.locationRow}>
            <MaterialDesignIcons name="map-marker" size={16} color={COLORS.primary} />
            <Text style={styles.location}>{pet.shelter}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>{pet.age}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Breed</Text>
              <Text style={styles.statValue}>{pet.breed}</Text>
            </View>
            <View style={[styles.statBox, { borderRightWidth: 0 }]}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>{pet.weight}</Text>
            </View>
          </View>

          <View style={styles.shelterCard}>
            <View style={styles.shelterIcon}>
              <MaterialDesignIcons name="home-heart" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.shelterInfo}>
              <Text style={styles.shelterName}>{pet.shelter}</Text>
              <Text style={styles.shelterSub}>Verified Shelter</Text>
            </View>
            <MaterialDesignIcons name="message-text" size={24} color={COLORS.primary} />
          </View>

          <Text style={styles.sectionTitle}>About {pet.name}</Text>
          <Text style={styles.aboutText}>{pet.description}</Text>

        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Adopt Me" 
          onPress={() => navigation.navigate('AdoptionApplication', { adoptionId: pet.id })}
        />
      </View>
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
    paddingBottom: SPACING.xxl,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerControls: {
    position: 'absolute',
    top: 40,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: -30,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  shelterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shelterIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  shelterInfo: {
    flex: 1,
  },
  shelterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  shelterSub: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
