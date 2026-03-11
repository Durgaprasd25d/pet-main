import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { AppointmentCard } from '../../components/cards/AppointmentCard';
import { COLORS, SPACING } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';
import { Appointment, Pet } from '../../types';

export const AppointmentListScreen = ({ navigation }: any) => {
  const { user } = useAppStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const fetchedPets = await dataService.getPets();
    const fetchedAppts = await dataService.getAppointments();
    
    const userPets = fetchedPets.filter(p => p.ownerId === user?.id);
    setPets(userPets);
    
    // Filter appointments for user's pets
    const userAppts = fetchedAppts.filter(a => userPets.some(p => p.id === a.petId));
    setAppointments(userAppts);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Split into Upcoming and Past appointments (mock logic: index filtering)
  const upcomingAppts = appointments.filter(a => a.status === 'upcoming');
  const pastAppts = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  return (
    <ScreenContainer>
      <Header title="Appointments" rightIcon="plus" onRightPress={() => navigation.navigate('VetList')} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
      >
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcomingAppts.length > 0 ? (
            upcomingAppts.map(appt => {
              const pet = pets.find(p => p.id === appt.petId);
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appointment={appt} 
                  petName={pet?.name}
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
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appointment={appt} 
                  petName={pet?.name}
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
