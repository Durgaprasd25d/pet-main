import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { PetCard } from '../../components/cards/PetCard';
import { AppointmentCard } from '../../components/cards/AppointmentCard';
import { COLORS, SPACING, RADIUS, SIZES, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';
import { Pet, Appointment } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import { usePetStore } from '../../store/usePetStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';

export const HomeDashboardScreen = ({ navigation }: any) => {
  const { user, token } = useAppStore();
  const { pets, fetchPets, loading: petsLoading } = usePetStore();
  const { appointments, fetchAppointments, loading: apptsLoading } = useAppointmentStore();

  const loadData = async () => {
    if (!token) return;
    await Promise.all([
      fetchPets(token),
      fetchAppointments(token)
    ]);
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const refreshing = petsLoading || apptsLoading;
  
  // Filter for display
  const myPets = pets.slice(0, 2);
  const myAppointments = appointments.filter(a => a.status === 'upcoming').slice(0, 2);


  return (
    <ScreenContainer>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} colors={[COLORS.primary]} />}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name.split(' ')[0]} 👋</Text>
            <Text style={styles.subtitle}>Your pets are doing great!</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialDesignIcons name="bell-badge-outline" size={26} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('VetList')}>
            <View style={[styles.iconContainer, { backgroundColor: '#ecfdf5' }]}>
              <MaterialDesignIcons name="doctor" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.actionText}>Find Vet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('ReminderCenter')}>
            <View style={[styles.iconContainer, { backgroundColor: '#f0fdfa' }]}>
              <MaterialDesignIcons name="pill" size={28} color={COLORS.secondary} />
            </View>
            <Text style={styles.actionText}>Meds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('EmergencySOS')}>
            <View style={[styles.iconContainer, { backgroundColor: '#fef2f2' }]}>
              <MaterialDesignIcons name="shield-alert-outline" size={28} color={COLORS.error} />
            </View>
            <Text style={styles.actionText}>SOS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('AboutApp')}>
             <View style={[styles.iconContainer, { backgroundColor: '#fff7ed' }]}>
              <MaterialDesignIcons name="help-circle-outline" size={28} color={COLORS.accent} />
            </View>
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.aiBanner} 
          onPress={() => navigation.navigate('PetAIChat')}
          activeOpacity={0.9}
        >
          <View style={styles.aiBannerContent}>
            <View style={styles.aiBannerText}>
              <Text style={styles.aiBannerTitle}>Pet AI Assistant</Text>
              <Text style={styles.aiBannerDesc}>Instant answers for your pet's health & behavior.</Text>
            </View>
            <View style={styles.aiIconContainer}>
              <MaterialDesignIcons name="robot" size={32} color="#fff" />
            </View>
          </View>
          <View style={styles.aiBannerBadge}>
            <Text style={styles.aiBadgeText}>BETA</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Family</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PetsTab')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {myPets.length > 0 ? (
            myPets.map((pet, index) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                index={index}
                onPress={() => navigation.navigate('PetProfile', { petId: pet.id })} 
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialDesignIcons name="paw-off-outline" size={40} color={COLORS.textLight} />
              <Text style={styles.emptyStateText}>You don't have any pets yet.</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Visits</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AppointmentsTab')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {myAppointments.length > 0 ? (
            myAppointments.map((appt, index) => {
              const pet = pets.find(p => p.id === appt.petId);
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appointment={appt} 
                  petName={pet?.name}
                  index={index}
                  onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: appt.id })} 
                />
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <MaterialDesignIcons name="calendar-blank-outline" size={40} color={COLORS.textLight} />
              <Text style={styles.emptyStateText}>No upcoming appointments.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 2,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  emptyState: {
    padding: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyStateText: {
    color: COLORS.textLight,
    marginTop: SPACING.sm,
    fontSize: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  actionCard: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    ...SHADOWS.small,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  aiBanner: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  aiBannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  aiBannerText: {
    flex: 1,
    marginRight: SPACING.md,
  },
  aiBannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  aiBannerDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  aiIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiBannerBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
  },
});
