import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const EmergencyContactScreen = ({ navigation }: any) => {

  const renderContactCard = (title: string, phone: string, description: string, icon: string, color: string) => (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
        <MaterialDesignIcons name={icon as any} size={28} color={color} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardPhone}>{phone}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      <TouchableOpacity style={[styles.callBtn, { backgroundColor: color }]}>
        <MaterialDesignIcons name="phone" size={20} color={COLORS.surface} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Emergency Contacts" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Primary Vet</Text>
        {renderContactCard('Pet Health Center', '+1 555-0198', 'Regular Veterinarian (Dr. Sarah)', COLORS.primary, 'hospital-box')}
        
        <Text style={styles.sectionTitle}>24/7 Emergency Numbers</Text>
        {renderContactCard('Animal Poison Control', '(888) 426-4435', 'ASPCA Poison Control Center', COLORS.error, 'skull-crossbones')}
        {renderContactCard('City Emergency Vet', '+1 555-0999', '24/7 Trauma and Surgery', '#f59e0b', 'alert-box')}
        
        <Text style={styles.sectionTitle}>Local Authorities</Text>
        {renderContactCard('Animal Control', '+1 555-0122', 'For stray or dangerous animals', COLORS.textLight, 'shield-alert')}

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
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
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardPhone: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
});
