import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const EmergencySOSScreen = ({ navigation }: any) => {
  
  const handleSOSPress = () => {
    // In a real app, this would trigger an alarm, call emergency contacts, or nearby vets
    navigation.navigate('NearbyVetClinics');
  };

  return (
    <ScreenContainer>
      <Header title="Emergency SOS" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Are you in an emergency?</Text>
          <Text style={styles.subtitle}>Press the SOS button below to find immediate help for your pet.</Text>
        </View>

        <View style={styles.sosContainer}>
          <View style={styles.pulseRing1} />
          <View style={styles.pulseRing2} />
          <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress} activeOpacity={0.8}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate('NearbyVetClinics')}
          >
            <View style={[styles.iconBox, { backgroundColor: COLORS.error + '20' }]}>
              <MaterialDesignIcons name="hospital-box" size={32} color={COLORS.error} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Nearby Clinics</Text>
              <Text style={styles.actionDesc}>Find open veterinary hospitals near you.</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate('EmergencyContact')}
          >
            <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '20' }]}>
              <MaterialDesignIcons name="phone-alert" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Emergency Contacts</Text>
              <Text style={styles.actionDesc}>Call your vet or poison control.</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate('MedicalHistory', { petId: '1' })} // Example pass
          >
            <View style={[styles.iconBox, { backgroundColor: '#eab30820' }]}>
              <MaterialDesignIcons name="file-document-outline" size={32} color="#eab308" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Medical Records</Text>
              <Text style={styles.actionDesc}>Quickly access pet health data.</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  headerInfo: {
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    lineHeight: 24,
  },
  sosContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  pulseRing1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.error + '20',
  },
  pulseRing2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.error + '40',
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  sosText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  quickActions: {
    width: '100%',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 13,
    color: COLORS.textLight,
  },
});
