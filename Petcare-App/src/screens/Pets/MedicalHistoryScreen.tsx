import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Alert, TouchableOpacity, Image, Linking } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { usePetStore } from '../../store/usePetStore';
import { useHealthStore } from '../../store/useHealthStore';
import { useAppStore } from '../../store/useAppStore';

export const MedicalHistoryScreen = ({ route, navigation }: any) => {
  const { petId } = route.params;
  const { token } = useAppStore();
  const { pets } = usePetStore();
  const { medicalRecords, fetchMedicalRecords, deleteMedicalRecord, loading } = useHealthStore();
  
  const pet = pets.find(p => p.id === petId);
  const records = medicalRecords[petId] || [];

  useEffect(() => {
    if (token && petId) {
      fetchMedicalRecords(petId, token);
    }
  }, [petId, token]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this medical record?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMedicalRecord(id, petId, token!);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete record');
            }
          }
        }
      ]
    );
  };

  return (
    <ScreenContainer>
      <Header 
        title={`${pet?.name || 'Pet'}'s Medical History`} 
        onBackPress={() => navigation.goBack()} 
        rightIcon="plus"
        onRightPress={() => navigation.navigate('AddMedicalRecord', { petId })}
      />
      
      {loading && records.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : records.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {records.map((record) => (
            <View key={record.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.dateRow}>
                  <MaterialDesignIcons name="calendar-blank-outline" size={16} color={COLORS.textLight} />
                  <Text style={styles.date}>{formatDate(record.recordDate)}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(record.id)}>
                  <MaterialDesignIcons name="delete-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.diagnosis}>{record.diagnosis}</Text>
              
              {record.medication && (
                <View style={styles.medicationRow}>
                  <MaterialDesignIcons name="pill" size={16} color={COLORS.secondary} />
                  <Text style={styles.medicationText}>Medication: {record.medication}</Text>
                </View>
              )}
              
              <View style={styles.infoRow}>
                <MaterialDesignIcons name="clipboard-pulse-outline" size={20} color={COLORS.primary} style={styles.icon} />
                <Text style={styles.infoText}>{record.notes || 'No additional notes.'}</Text>
              </View>

              {record.vet && (
                <View style={styles.vetRow}>
                  <MaterialDesignIcons name="account-tie-outline" size={14} color={COLORS.textLight} />
                  <Text style={styles.vetText}>By Dr. {record.vet}</Text>
                </View>
              )}

              {record.documentUrl && (
                <TouchableOpacity 
                  style={styles.documentBtn}
                  onPress={() => record.documentUrl && Linking.openURL(record.documentUrl)}
                >
                  <MaterialDesignIcons name="file-document-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.documentBtnText}>View Document / Prescription</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialDesignIcons name="clipboard-off-outline" size={60} color={COLORS.border} />
          <Text style={styles.emptyText}>No medical records found for {pet?.name}.</Text>
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    marginTop: SPACING.md,
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  date: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '600',
  },
  diagnosis: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    backgroundColor: COLORS.background + '50',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: '500',
  },
  medicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  medicationText: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '700',
    marginLeft: 6,
  },
  vetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    justifyContent: 'flex-end',
  },
  vetText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
    fontStyle: 'italic',
  },
  documentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  documentBtnText: {
    marginLeft: SPACING.xs,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
