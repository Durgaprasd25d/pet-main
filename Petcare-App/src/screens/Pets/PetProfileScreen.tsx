import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  Image, 
  TouchableOpacity, 
  ImageBackground,
  StatusBar
} from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS, wp, hp, SIZES } from '../../theme/theme';
import { Pet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppStore } from '../../store/useAppStore';
import { usePetStore } from '../../store/usePetStore';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

export const PetProfileScreen = ({ route, navigation }: any) => {
  const { petId } = route.params;
  const { pets, fetchPets } = usePetStore();
  
  const pet = pets.find(p => p.id === petId);

  useEffect(() => {
    if (!pet) {
      const { token } = useAppStore.getState();
      if (token) fetchPets(token);
    }
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

  const renderActionCard = (title: string, icon: string, onPress: () => void, color: string, index: number) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(500)}
      style={styles.actionCardWrapper}
    >
      <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.actionIconContainer, { backgroundColor: color + '15' }]}>
          <MaterialDesignIcons name={icon as any} size={28} color={color} />
        </View>
        <View style={styles.actionTextContent}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionSub}>View & Update</Text>
        </View>
        <MaterialDesignIcons name="chevron-right" size={20} color={COLORS.textLight} />
      </TouchableOpacity>
    </Animated.View>
  );

  const getGenderColor = () => pet.gender === 'Male' ? '#3b82f6' : '#ec4899';

  return (
    <ScreenContainer withSafeArea={false}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground 
            source={{ uri: pet.image }} 
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />
            <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <MaterialDesignIcons name="chevron-left" size={30} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.editBtn}
              onPress={() => navigation.navigate('EditPet', { petId })}
            >
              <MaterialDesignIcons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.heroBottom}>
              <Animated.View entering={FadeIn.duration(800)}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{pet.name}</Text>
                  <View style={[styles.genderBadge, { backgroundColor: getGenderColor() }]}>
                    <MaterialDesignIcons 
                      name={pet.gender === 'Male' ? 'gender-male' : 'gender-female'} 
                      size={16} 
                      color="#fff" 
                    />
                  </View>
                </View>
                <Text style={styles.breedText}>{pet.breed}</Text>
              </Animated.View>
            </View>
          </ImageBackground>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{pet.age}</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{pet.weight}</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.typeBadge, { backgroundColor: COLORS.primary + '15' }]}>
                <MaterialDesignIcons 
                  name={pet.type === 'Dog' ? 'dog' : 'cat'} 
                  size={18} 
                  color={COLORS.primary} 
                />
              </View>
              <Text style={styles.statLabel}>{pet.type}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medical Records</Text>
          </View>
          
          <View style={styles.recordsList}>
            {renderActionCard('Health Card', 'cards-heart-outline', () => navigation.navigate('PetHealthCard', { petId }), '#6366f1', 0)}
            {renderActionCard('Vaccination History', 'needle', () => navigation.navigate('VaccinationRecords', { petId }), '#f59e0b', 1)}
            {renderActionCard('Medical History', 'clipboard-text-outline', () => navigation.navigate('MedicalHistory', { petId }), '#10b981', 2)}
            {renderActionCard('Reminders', 'bell-ring-outline', () => navigation.navigate('ReminderCenter'), '#ef4444', 3)}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About {pet.name}</Text>
          </View>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              {pet.name} is a healthy {pet.breed}. All medical records are synchronized and up-to-date with your previous vet visits.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.deleteBtn}
            onPress={() => {}}
          >
            <MaterialDesignIcons name="trash-can-outline" size={20} color={COLORS.error} />
            <Text style={styles.deleteText}>Remove {pet.name} from Profile</Text>
          </TouchableOpacity>
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
    paddingBottom: SPACING.xl,
  },
  heroContainer: {
    height: hp(45),
    width: SIZES.width,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  editBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.xl,
    paddingBottom: 40,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  genderBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  breedText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: SPACING.md,
    marginTop: -30,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border + '50',
  },
  typeBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  mainContent: {
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  recordsList: {
    marginBottom: SPACING.lg,
  },
  actionCardWrapper: {
    marginBottom: SPACING.sm,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border + '40',
    ...SHADOWS.small,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  actionTextContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  actionSub: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  aboutCard: {
    backgroundColor: COLORS.primary + '08',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary + '15',
    marginBottom: SPACING.xl,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: '500',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  deleteText: {
    color: COLORS.error,
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 14,
  },
});
