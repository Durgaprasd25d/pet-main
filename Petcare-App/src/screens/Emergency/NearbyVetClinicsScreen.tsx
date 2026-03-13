import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Linking,
  Platform,
  Image
} from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { Vet } from '../../types';

export const NearbyVetClinicsScreen = ({ navigation }: any) => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyVets = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using mock coordinates for Mumbai for demonstration
      const lat = 19.0760;
      const lng = 72.8777;
      const data = await dataService.getNearbyVets(lat, lng);
      setVets(data);
    } catch (err: any) {
      console.error('Error fetching nearby vets:', err);
      setError(err.message || 'Failed to connect to emergency services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyVets();
  }, []);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleDirections = (address: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <ScreenContainer>
      <Header title="Nearby Clinics" onBackPress={() => navigation.goBack()} />
      
      {/* Interactive Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapMock}>
          <View style={styles.mapOverlay}>
             <MaterialDesignIcons name="map-marker-radius" size={48} color={COLORS.error} />
             <Text style={styles.mapText}>Finding Fastest Routes...</Text>
             <TouchableOpacity 
              style={styles.openMapsBtn}
              onPress={() => handleDirections("Veterinary Clinics near me")}
             >
               <Text style={styles.openMapsText}>Open in System Maps</Text>
             </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/static/72.8777,19.0760,12/400x200?access_token=mock' }} 
            style={styles.mapPlaceholderImg}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.listHeader}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.listTitle}>Available Now</Text>
          <View style={styles.liveIndicator}>
             <View style={styles.liveDot} />
             <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        <Text style={styles.listSubtitle}>Sorted by response time and distance</Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.error} />
          <Text style={styles.loaderText}>Locating nearest specialists...</Text>
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
           <MaterialDesignIcons name="alert-circle-outline" size={60} color={COLORS.error} />
           <Text style={styles.emptyTitle}>Connection Issue</Text>
           <Text style={styles.emptyDesc}>{error}</Text>
           <TouchableOpacity style={[styles.retryBtn, { backgroundColor: COLORS.error }]} onPress={fetchNearbyVets}>
             <Text style={styles.retryText}>Try Again</Text>
           </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {vets.length > 0 ? (
            vets.map(vet => (
              <TouchableOpacity 
                key={vet.id} 
                style={styles.vetCard}
                onPress={() => navigation.navigate('VetProfile', { vetId: vet.id })}
                activeOpacity={0.9}
              >
                <View style={styles.vetHeader}>
                  <View style={styles.vetInfoBox}>
                    <Text style={styles.vetName}>{vet.clinicName}</Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.distanceText}>{vet.distance}</Text>
                      <View style={styles.dotSeparator} />
                      <Text style={styles.ratingText}>⭐ {vet.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.badgeContainer}>
                    <View style={[styles.statusBadge, { backgroundColor: COLORS.success + '15' }]}>
                      <Text style={[styles.statusText, { color: COLORS.success }]}>24/7 EMERGENCY</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <MaterialDesignIcons name="map-marker" size={18} color={COLORS.textLight} />
                  <Text style={styles.addressText} numberOfLines={1}>{vet.address}</Text>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.callBtn]}
                    onPress={() => vet.contactNumber && handleCall(vet.contactNumber)}
                  >
                    <MaterialDesignIcons name="phone" size={20} color="#fff" />
                    <Text style={styles.actionBtnText}>Call Now</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.directionsBtn]}
                    onPress={() => vet.address && handleDirections(vet.address)}
                  >
                    <MaterialDesignIcons name="directions" size={20} color={COLORS.primary} />
                    <Text style={[styles.actionBtnText, { color: COLORS.primary }]}>Directions</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
               <MaterialDesignIcons name="hospital-marker" size={60} color={COLORS.textLight + '50'} />
               <Text style={styles.emptyTitle}>No Clinics Found</Text>
               <Text style={styles.emptyDesc}>We couldn't find any emergency clinics in your immediate area.</Text>
               <TouchableOpacity style={styles.retryBtn} onPress={fetchNearbyVets}>
                 <Text style={styles.retryText}>Retry Search</Text>
               </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 180,
    width: '100%',
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  mapMock: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    position: 'relative',
  },
  mapPlaceholderImg: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  mapText: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: SPACING.sm,
    fontWeight: 'bold',
  },
  openMapsBtn: {
    marginTop: SPACING.md,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
    ...SHADOWS.small,
  },
  openMapsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  listHeader: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  listSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.error,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.error,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  vetCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  vetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  vetInfoBox: {
    flex: 1,
  },
  vetName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '700',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.textLight,
    marginHorizontal: 8,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  badgeContainer: {
    marginLeft: SPACING.md,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.md,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '900',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginLeft: 8,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  callBtn: {
    backgroundColor: COLORS.error,
    ...SHADOWS.small,
  },
  directionsBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxl,
  },
  loaderText: {
    marginTop: SPACING.lg,
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxl,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.lg,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  retryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: RADIUS.lg,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
