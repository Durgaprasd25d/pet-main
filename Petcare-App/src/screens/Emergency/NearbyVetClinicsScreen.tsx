import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Vet } from '../../types';

export const NearbyVetClinicsScreen = ({ navigation }: any) => {
  const [vets, setVets] = useState<Vet[]>([]);

  useEffect(() => {
    const fetchVets = async () => {
      const data = await dataService.getVets();
      // Mock filtering for 'nearby' by just taking a slice or all of them
      setVets(data.slice(0, 3)); 
    };
    fetchVets();
  }, []);

  return (
    <ScreenContainer>
      <Header title="Nearby Clinics" onBackPress={() => navigation.goBack()} />
      
      {/* Mock Map Area */}
      <View style={styles.mapContainer}>
        <View style={styles.mapMock}>
          <MaterialDesignIcons name="map-outline" size={60} color={COLORS.textLight + '50'} />
          <Text style={styles.mapText}>Map View</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Open Now Near You</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {vets.map(vet => (
          <TouchableOpacity 
            key={vet.id} 
            style={styles.vetCard}
            onPress={() => navigation.navigate('VetProfile', { vetId: vet.id })}
          >
            <View style={styles.vetHeader}>
              <View style={styles.vetInfoBox}>
                <Text style={styles.vetName}>{vet.clinicName}</Text>
                <Text style={styles.distanceText}>1.2 miles away</Text>
              </View>
              <View style={styles.badgeContainer}>
                <View style={[styles.statusBadge, { backgroundColor: COLORS.success + '20' }]}>
                  <Text style={[styles.statusText, { color: COLORS.success }]}>OPEN 24/7</Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <MaterialDesignIcons name="map-marker-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>{vet.address}</Text>
            </View>
            <View style={styles.row}>
              <MaterialDesignIcons name="phone-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>+1 {vet.contactNumber}</Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <MaterialDesignIcons name="phone" size={20} color={COLORS.surface} />
                <Text style={styles.actionBtnText}>Call Clinic</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }]} onPress={() => navigation.navigate('VetProfile', { vetId: vet.id })}>
                <MaterialDesignIcons name="directions" size={20} color={COLORS.primary} />
                <Text style={[styles.actionBtnText, { color: COLORS.primary }]}>Directions</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    width: '100%',
    backgroundColor: COLORS.surface,
  },
  mapMock: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
    fontWeight: 'bold',
  },
  listHeader: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  vetCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  vetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  vetInfoBox: {
    flex: 1,
  },
  vetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  distanceText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginTop: 2,
  },
  badgeContainer: {
    marginLeft: SPACING.md,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.error,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  actionBtnText: {
    color: COLORS.surface,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
    fontSize: 14,
  },
});
