import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { usePetStore } from '../../store/usePetStore';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';
import { Vet } from '../../types';


export const AppointmentConfirmationScreen = ({ route, navigation }: any) => {
  const { vetId, petId, reason, date, time } = route.params;
  const { token } = useAppStore();
  const { pets } = usePetStore();
  const { bookAppointment, loading } = useAppointmentStore();
  
  const [vet, setVet] = useState<Vet | null>(null);
  const pet = pets.find(p => p.id === petId);

  useEffect(() => {
    const fetchVet = async () => {
      const vets = await dataService.getVets();
      const v = vets.find(v => v.id === vetId);
      if (v) setVet(v);
    };
    fetchVet();
  }, [vetId]);

  const handleConfirm = async () => {
    if (!token) return;
    try {
      await bookAppointment({
        petId,
        vetId,
        date,
        time,
        reason,
        status: 'scheduled'
      }, token);
      navigation.navigate('MainTabs', { screen: 'AppointmentsTab' });
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };


  return (
    <ScreenContainer>
      <Header title="Confirmation" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        
        <View style={styles.successIconContainer}>
          <MaterialDesignIcons name="check-circle" size={80} color={COLORS.success} />
        </View>
        <Text style={styles.title}>Review & Confirm</Text>
        <Text style={styles.subtitle}>Please review the details below before confirming your appointment.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <View style={styles.detailRow}>
            <MaterialDesignIcons name="calendar-blank-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.detailText}>{date}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialDesignIcons name="clock-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialDesignIcons name="tag-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.detailText}>{reason}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Veterinarian</Text>
          {vet && (
            <View style={styles.profileRow}>
              <Image source={{ uri: vet.image }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{vet.name}</Text>
                <Text style={styles.subtext}>{vet.clinicName}</Text>
              </View>
            </View>
          )}

          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Patient</Text>
          {pet && (
            <View style={styles.profileRow}>
              <Image source={{ uri: pet.image }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{pet.name}</Text>
                <Text style={styles.subtext}>{pet.breed}</Text>
              </View>
            </View>
          )}

        </View>

      </View>
      
      <View style={styles.footer}>
        <Button 
          title="Confirm Appointment" 
          onPress={handleConfirm} 
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.border,
    marginRight: SPACING.md,
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
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
