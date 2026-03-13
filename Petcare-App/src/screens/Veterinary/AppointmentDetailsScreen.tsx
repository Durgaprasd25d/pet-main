import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Appointment, Vet, Pet } from '../../types';

import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useAppStore } from '../../store/useAppStore';
import { usePetStore } from '../../store/usePetStore';
import { useVetStore } from '../../store/useVetStore';

export const AppointmentDetailsScreen = ({ route, navigation }: any) => {
  const { appointmentId } = route.params;
  const { token } = useAppStore();
  const { appointments, fetchAppointments } = useAppointmentStore();
  const { pets, fetchPets } = usePetStore();
  const { vets, fetchVets } = useVetStore();
  
  const appointment = appointments.find(a => a.id === appointmentId);
  const [pet, setPet] = useState<Pet | null>(null);
  const [vet, setVet] = useState<Vet | null>(null);

  useEffect(() => {
    if (token) {
      if (!appointment) fetchAppointments(token);
      if (pets.length === 0) fetchPets(token);
      if (vets.length === 0) fetchVets();
    }
  }, [appointmentId, token]);

  useEffect(() => {
    if (appointment) {
      const p = pets.find(p => p.id === appointment.petId);
      const v = vets.find(v => v.id === appointment.vetId);
      if (p) setPet(p);
      if (v) setVet(v);
    }
  }, [appointment, pets, vets]);

  if (!appointment) {
    return (
      <ScreenContainer>
        <Header title="Appointment Details" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  const getStatusColor = (status: string): "success" | "warning" | "error" | "neutral" => {
    switch (status) {
      case 'upcoming': return 'success';
      case 'completed': return 'neutral';
      case 'cancelled': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <ScreenContainer>
      <Header title="Appointment Details" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerCard}>
          <View style={styles.statusRow}>
            <Text style={styles.appointmentRef}>#APT-{appointment.id}</Text>
            <Badge label={appointment.status} variant={getStatusColor(appointment.status)} />
          </View>
          <Text style={styles.reason}>{appointment.reason}</Text>
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeItem}>
              <MaterialDesignIcons name="calendar-blank-outline" size={20} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.dateTimeText}>{new Date(appointment.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.dateTimeItem}>
              <MaterialDesignIcons name="clock-outline" size={20} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.dateTimeText}>{appointment.time}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Veterinarian</Text>
        <View style={styles.profileCard}>
          <Image source={{ uri: vet?.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop' }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{vet?.name || 'Veterinarian'}</Text>
            <Text style={styles.subtext}>{vet?.clinicName || 'PetCare Wellness Clinic'}</Text>
          </View>
          <View style={styles.actionIcons}>
            <View style={styles.iconCircle}>
              <MaterialDesignIcons name="phone" size={20} color={COLORS.primary} />
            </View>
            <View style={[styles.iconCircle, { marginLeft: SPACING.sm }]}>
              <MaterialDesignIcons name="message-text" size={20} color={COLORS.primary} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Patient</Text>
        <View style={styles.profileCard}>
          <Image source={{ uri: pet?.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop' }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{pet?.name || 'Pet Name'}</Text>
            <Text style={styles.subtext}>{pet?.breed || 'Breed'} • {pet?.age || '?'} yrs</Text>
          </View>
        </View>

      </ScrollView>

      {appointment.status === 'upcoming' ? (
        <View style={styles.footer}>
          <Button 
            title="Reschedule" 
            variant="outline" 
            style={[styles.footerBtn, { marginRight: SPACING.sm }] as any} 
            onPress={() => {}}
          />
          <Button 
            title="Cancel" 
            style={[styles.footerBtn, { backgroundColor: COLORS.error }] as any} 
            onPress={() => {}}
          />
        </View>
      ) : null}

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
  headerCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  appointmentRef: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  reason: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    flex: 1,
    marginHorizontal: 4,
  },
  icon: {
    marginRight: 8,
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.border,
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtext: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerBtn: {
    flex: 1,
  },
});
