import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Share } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS, SIZES } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { usePetStore } from '../../store/usePetStore';
import { useAppStore } from '../../store/useAppStore';
import LinearGradient from 'react-native-linear-gradient';

export const PetHealthCardScreen = ({ navigation, route }: any) => {
  const { petId } = route.params;
  const { user } = useAppStore();
  const { pets } = usePetStore();
  
  const pet = pets.find(p => p.id === petId);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${pet?.name}'s Digital Health Card on PetCare! ID: ${pet?.id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!pet) return null;

  return (
    <ScreenContainer withSafeArea={false}>
      <Header 
        title="Digital Health Card" 
        onBackPress={() => navigation.goBack()} 
        rightIcon="share-variant"
        onRightPress={handleShare}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Digital ID Card */}
        <LinearGradient
          colors={['#4f46e5', '#818cf8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.idCard}
        >
          {/* Card Decorations */}
          <View style={styles.cardCircleSmall} />
          <View style={styles.cardCircleLarge} />
          
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardBrand}>PETCARE PASSPORT</Text>
              <Text style={styles.cardIssueDate}>Issued: {new Date().getFullYear()}</Text>
            </View>
            <MaterialDesignIcons name="paw" size={24} color="rgba(255,255,255,0.6)" />
          </View>

          <View style={styles.cardMain}>
            <Image 
              source={{ uri: pet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1' }} 
              style={styles.petPhoto} 
            />
            <View style={styles.petDetails}>
              <Text style={styles.petName}>{pet.name.toUpperCase()}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
              
              <View style={styles.badgeRow}>
                <View style={[styles.miniBadge, { backgroundColor: pet.gender === 'Male' ? '#2563eb' : '#db2777' }]}>
                  <Text style={styles.miniBadgeText}>{pet.gender}</Text>
                </View>
                <View style={[styles.miniBadge, { backgroundColor: '#059669' }]}>
                  <Text style={styles.miniBadgeText}>{pet.age} Years</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>MICROCHIP ID</Text>
              <Text style={styles.footerValue}>{pet.microchipId || `PC-${pet.id.substring(0, 8).toUpperCase()}`}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>PET TYPE</Text>
              <Text style={styles.footerValue}>{pet.type.toUpperCase()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* QR Code Identification Section */}
        <View style={styles.qrSection}>
          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <MaterialDesignIcons name="qrcode" size={120} color={COLORS.text} />
              <View style={[styles.qrDot, { top: -5, left: -5 }]} />
              <View style={[styles.qrDot, { top: -5, right: -5 }]} />
              <View style={[styles.qrDot, { bottom: -5, left: -5 }]} />
              <View style={[styles.qrDot, { bottom: -5, right: -5 }]} />
            </View>
          </View>
          <Text style={styles.qrHint}>Scan to verify pet records</Text>
        </View>

        {/* Vitals Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Vitals</Text>
          <View style={styles.vitalsGrid}>
            <View style={styles.vitalCard}>
              <MaterialDesignIcons name="weight-kilogram" size={24} color="#6366f1" />
              <Text style={styles.vitalValue}>{pet.weight || 'N/A'}</Text>
              <Text style={styles.vitalLabel}>Last Weight</Text>
            </View>
            <View style={styles.vitalCard}>
              <MaterialDesignIcons name="water" size={24} color="#ef4444" />
              <Text style={styles.vitalValue}>{pet.bloodGroup || 'Not Set'}</Text>
              <Text style={styles.vitalLabel}>Blood Group</Text>
            </View>
            <View style={styles.vitalCard}>
              <MaterialDesignIcons name="shield-check" size={24} color="#10b981" />
              <Text style={styles.vitalValue}>Verified</Text>
              <Text style={styles.vitalLabel}>Health Status</Text>
            </View>
          </View>
        </View>

        {/* Owner Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ownership</Text>
          <View style={styles.ownerCard}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerInitial}>{user?.name?.charAt(0) || 'P'}</Text>
            </View>
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerName}>{user?.name || 'Pet Owner'}</Text>
              <Text style={styles.ownerContact}>{user?.phone || '+1 234 567 890'}</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <MaterialDesignIcons name="phone" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadBtn}>
          <LinearGradient
            colors={[COLORS.primary, '#10b981']}
            style={styles.downloadGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialDesignIcons name="file-pdf-box" size={22} color="#fff" />
            <Text style={styles.downloadText}>Download Digital Passport</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  idCard: {
    height: 220,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.large,
    marginBottom: SPACING.xl,
  },
  cardCircleSmall: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cardCircleLarge: {
    position: 'absolute',
    bottom: -50,
    left: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  cardBrand: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  cardIssueDate: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  cardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  petPhoto: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.lg,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  petDetails: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  petName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  petBreed: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  miniBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  footerItem: {
    flex: 1,
  },
  footerLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '800',
  },
  footerValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  qrContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  qrPlaceholder: {
    position: 'relative',
    padding: 5,
  },
  qrDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  qrHint: {
    marginTop: SPACING.sm,
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: SPACING.md,
    letterSpacing: -0.3,
  },
  vitalsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  vitalCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border + '30',
    ...SHADOWS.small,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 8,
  },
  vitalLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
    ...SHADOWS.small,
  },
  ownerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  ownerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  ownerContact: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadBtn: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
    ...SHADOWS.medium,
  },
  downloadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    gap: 10,
  },
  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
