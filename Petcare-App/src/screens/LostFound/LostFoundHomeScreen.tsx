import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { LostAndFound } from '../../types';


import { useLostPetStore } from '../../store/useLostPetStore';

export const LostFoundHomeScreen = ({ navigation }: any) => {
  const { reports, loading, fetchReports } = useLostPetStore();
  const [filter, setFilter] = useState<'All' | 'Lost' | 'Found'>('All');

  useEffect(() => {
    fetchReports();
  }, []);


  const getFilteredItems = () => {
    if (filter === 'All') return reports;
    return reports.filter((item: LostAndFound) => item.status === filter);
  };

  const onRefresh = () => {
    fetchReports();
  };


  const renderCard = (item: LostAndFound) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.card}
      onPress={() => navigation.navigate(item.status === 'Lost' ? 'LostPetDetails' : 'FoundPetDetails', { itemId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardStatusBadge}>
        <Text style={[styles.cardStatusText, { color: item.status === 'Lost' ? COLORS.error : COLORS.success }]}>
          {item.status?.toUpperCase()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.petName || 'Unknown Pet'}</Text>
        <Text style={styles.cardSub}>{item.breed} • {item.type}</Text>
        <View style={styles.locationRow}>
          <MaterialDesignIcons name="map-marker" size={14} color={COLORS.primary} />
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Lost & Found" onBackPress={() => navigation.goBack()} />
      
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: COLORS.error + '15', borderColor: COLORS.error }]}
          onPress={() => navigation.navigate('ReportLostPet')}
        >
          <MaterialDesignIcons name="alert-circle-outline" size={24} color={COLORS.error} />
          <Text style={[styles.actionBtnText, { color: COLORS.error }]}>Report Lost</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: COLORS.success + '15', borderColor: COLORS.success }]}
          onPress={() => navigation.navigate('ReportFoundPet')}
        >
          <MaterialDesignIcons name="check-circle-outline" size={24} color={COLORS.success} />
          <Text style={[styles.actionBtnText, { color: COLORS.success }]}>Report Found</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {['All', 'Lost', 'Found'].map(f => (
          <TouchableOpacity 
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f as any)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >
        <View style={styles.grid}>
          {getFilteredItems().map(renderCard)}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginHorizontal: SPACING.xs,
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.surface,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.border,
  },
  cardStatusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  cardStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: SPACING.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 2,
    flex: 1,
  },
  dateText: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
