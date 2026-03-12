import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Share } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS, SIZES } from '../../theme/theme';
import { dataService } from '../../services/dataService';
import { Vet } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import { useVetStore } from '../../store/useVetStore';

export const VetProfileScreen = ({ route, navigation }: any) => {
  const { vetId } = route.params;
  const { vets, fetchVets } = useVetStore();
  
  const vet = vets.find(v => v.id === vetId);

  useEffect(() => {
    if (!vet) {
      fetchVets();
    }
  }, [vetId]);


  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${vet?.name} on PetCare! ${vet?.specialty} at ${vet?.clinicName}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!vet) {
    return (
      <ScreenContainer>
        <Header title="Veterinarian" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header 
        title="Profile" 
        onBackPress={() => navigation.goBack()} 
        rightIcon="share-variant-outline" 
        onRightPress={handleShare}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: vet.image }} style={styles.image} />
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]} />
          </View>
          <Text style={styles.name}>{vet.name}</Text>
          <Text style={styles.specialty}>{vet.specialty}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{vet.rating}</Text>
              <View style={styles.statRow}>
                <MaterialDesignIcons name="star" size={14} color="#fbbf24" />
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{vet.reviews}</Text>
              <View style={styles.statRow}>
                <MaterialDesignIcons name="comment-text-outline" size={14} color={COLORS.secondary} />
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{vet.distance}</Text>
              <View style={styles.statRow}>
                <MaterialDesignIcons name="map-marker-outline" size={14} color={COLORS.accent} />
                <Text style={styles.statLabel}>Distance</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{vet.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinic Location</Text>
          <TouchableOpacity style={styles.locationCard} activeOpacity={0.7}>
            <View style={styles.locationIcon}>
              <MaterialDesignIcons name="map-clock-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.locationContent}>
              <Text style={styles.clinicName}>{vet.clinicName}</Text>
              <Text style={styles.address}>123 Pet Care Lane, Downtown District</Text>
              <Text style={styles.hours}>Open today: 09:00 AM - 07:00 PM</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.border} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Days</Text>
          <View style={styles.daysRow}>
            {['M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <View key={i} style={[styles.dayCircle, i < 5 ? styles.dayActive : styles.dayInactive]}>
                <Text style={[styles.dayText, i < 5 ? styles.dayTextActive : styles.dayTextInactive]}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Book Appointment" 
          onPress={() => navigation.navigate('BookAppointment', { vetId: vet.id })} 
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
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.background,
    borderWidth: 4,
    borderColor: COLORS.surface,
    ...SHADOWS.medium,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  specialty: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: SPACING.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    width: '100%',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.border,
    alignSelf: 'center',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  locationContent: {
    flex: 1,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  address: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  hours: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 4,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  dayActive: {
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary + '30',
  },
  dayInactive: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
  },
  dayTextActive: {
    color: COLORS.primary,
  },
  dayTextInactive: {
    color: COLORS.textLight,
  },
  footer: {
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
  },
});
