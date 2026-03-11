import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { dataService } from '../../services/dataService';
import { LostAndFound } from '../../types';

export const LostPetDetailsScreen = ({ route, navigation }: any) => {
  const { itemId } = route.params;
  const [item, setItem] = useState<LostAndFound | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getLostAndFound();
      const i = data.find(d => d.id === itemId);
      if (i) setItem(i);
    };
    fetchData();
  }, [itemId]);

  if (!item) {
    return (
      <ScreenContainer>
        <Header title="Lost Pet Details" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.headerControls}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <MaterialDesignIcons name="arrow-left" size={24} color={COLORS.surface} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <MaterialDesignIcons name="share-variant" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.badgeContainer}>
            <Badge label="LOST PET" variant="error" />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{item.petName || 'Unknown Pet'}</Text>
          </View>
          <Text style={styles.subtext}>{item.breed} • {item.type}</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialDesignIcons name="map-marker" size={20} color={COLORS.primary} style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Last Seen Location</Text>
                <Text style={styles.infoValue}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <MaterialDesignIcons name="calendar-clock" size={20} color={COLORS.primary} style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Date Lost</Text>
                <Text style={styles.infoValue}>{item.date}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>

          <Text style={styles.sectionTitle}>Contact Informant</Text>
          <View style={styles.contactCard}>
            <View style={styles.avatar}>
              <MaterialDesignIcons name="account" size={24} color={COLORS.surface} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.reportedBy}</Text>
              <Text style={styles.contactSub}>Pet Owner / Reporter</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <MaterialDesignIcons name="phone" size={20} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="I Have Found This Pet" 
          onPress={() => {}} 
          color={COLORS.success}
        />
      </View>
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
    paddingBottom: SPACING.xxl,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerControls: {
    position: 'absolute',
    top: 40,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 40,
    left: SPACING.md,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: -20,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtext: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    textAlign: 'center',
    lineHeight: 40,
    marginRight: SPACING.md,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  contactSub: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
