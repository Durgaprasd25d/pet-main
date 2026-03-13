import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { useHealthStore } from '../../store/useHealthStore';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import * as ImagePicker from 'react-native-image-picker';

export const AddMedicalRecordScreen = ({ navigation, route }: any) => {
  const { petId } = route.params;
  const { token } = useAppStore();
  const { addMedicalRecord, loading } = useHealthStore();

  const [form, setForm] = useState({
    diagnosis: '',
    medication: '',
    notes: '',
    recordDate: new Date().toISOString()
  });
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleSelectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Image selection failed');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0]);
        }
      }
    );
  };

  const handleSave = async () => {
    if (!form.diagnosis) {
      Alert.alert('Error', 'Please enter a diagnosis');
      return;
    }

    try {
      const recordData = {
        ...form,
        petId,
        document: selectedImage ? {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName || 'record_image.jpg'
        } : null
      };

      await addMedicalRecord(recordData, token!);
      Alert.alert('Success', 'Medical record added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add medical record');
    }
  };

  return (
    <ScreenContainer>
      <Header title="Add Medical Record" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Diagnosis *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Seasonal Allergy"
            value={form.diagnosis}
            onChangeText={(text) => setForm({ ...form, diagnosis: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medication</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Antihistamine 5mg"
            value={form.medication}
            onChangeText={(text) => setForm({ ...form, medication: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any additional information..."
            multiline
            numberOfLines={4}
            value={form.notes}
            onChangeText={(text) => setForm({ ...form, notes: text })}
          />
        </View>

        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.removeImageBtn} 
              onPress={() => setSelectedImage(null)}
            >
              <MaterialDesignIcons name="close-circle" size={24} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleSelectImage}
        >
          <MaterialDesignIcons name="camera-outline" size={24} color={COLORS.primary} />
          <Text style={styles.uploadText}>
            {selectedImage ? 'Change Image / Document' : 'Upload Document / Prescription'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Record</Text>
          )}
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
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.background,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.primary + '05',
  },
  uploadText: {
    marginLeft: SPACING.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.lg,
    ...SHADOWS.medium,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
