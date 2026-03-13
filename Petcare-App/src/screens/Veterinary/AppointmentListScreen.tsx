import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { AppointmentCard } from '../../components/cards/AppointmentCard';
import { COLORS, SPACING } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';
import { Appointment, Pet } from '../../types';

import { useAppointmentStore } from '../../store/useAppointmentStore';
import { usePetStore } from '../../store/usePetStore';
import { useVetStore } from '../../store/useVetStore';

export const AppointmentListScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { appointments, loading, fetchAppointments } = useAppointmentStore();
  const { pets, fetchPets } = usePetStore();
  const { vets, fetchVets } = useVetStore();

  useEffect(() => {
    if (token) {
      fetchAppointments(token);
      fetchPets(token);
      fetchVets();
    }
  }, [token]);

  const onRefresh = () => {
    if (token) {
      fetchAppointments(token);
      fetchPets(token);
      fetchVets();
    }
  };

  const upcomingAppts = appointments.filter(a => a.status === 'scheduled');
  
  const pastAppts = appointments.filter(a => 
    a.status === 'completed' || a.status === 'cancelled'
  );


  return (
    <ScreenContainer>
      <Header title="Appointments" rightIcon="plus" onRightPress={() => navigation.navigate('VetList')} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcomingAppts.length > 0 ? (
            upcomingAppts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(appt => {
              const pet = pets.find(p => p.id === appt.petId);
              const vet = vets.find(v => v.id === appt.vetId);
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appointment={appt} 
                  petName={pet?.name}
                  vetName={vet?.name}
                  onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: appt.id })} 
                />
              );
            })
          ) : (
            <Text style={styles.emptyText}>No upcoming appointments.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past</Text>
          {pastAppts.length > 0 ? (
            pastAppts.map(appt => {
              const pet = pets.find(p => p.id === appt.petId);
              const vet = vets.find(v => v.id === appt.vetId);
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appointment={appt} 
                  petName={pet?.name}
                  vetName={vet?.name}
                  onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: appt.id })} 
                />
              );
            })
          ) : (
            <Text style={styles.emptyText}>No past appointments.</Text>
          )}
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    flexGrow: 1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});
