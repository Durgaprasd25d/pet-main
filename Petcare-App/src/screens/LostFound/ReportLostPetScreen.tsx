import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import { useLostPetStore } from '../../store/useLostPetStore';
import { useAppStore } from '../../store/useAppStore';

export const ReportLostPetScreen = ({ navigation }: any) => {
  const { reportPet } = useLostPetStore();
  const { token } = useAppStore();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleReport = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await reportPet({
        petName: name,
        type,
        breed,
        location,
        date,
        description,
        status: 'Lost',
        image: selectedImage ? selectedImage : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400' // Placeholder
      }, token);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.8,
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Unknown error');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImage({
          uri: Platform.OS === 'android' ? asset.uri : asset.uri?.replace('file://', ''),
          type: asset.type,
          name: asset.fileName || `lost_pet_${Date.now()}.jpg`,
        });
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to select image: ' + error.message);
    }
  };


  const renderTypeSelector = (label: string, icon: string) => (
    <TouchableOpacity 
      style={[styles.typeSelector, type === label && styles.typeSelectorActive]}
      onPress={() => setType(label)}
    >
      <MaterialDesignIcons name={icon as any} size={28} color={type === label ? COLORS.error : COLORS.textLight} />
      <Text style={[styles.typeText, type === label && { color: COLORS.error }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Report Lost Pet" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <TouchableOpacity style={styles.imageConfig} onPress={selectImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} />
          ) : (
            <>
              <MaterialDesignIcons name={"camera-plus" as any} size={40} color={COLORS.textLight} />
              <Text style={styles.imageText}>Upload Photo</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Pet Type</Text>
        <View style={styles.typeRow}>
          {renderTypeSelector('Dog', 'dog')}
          {renderTypeSelector('Cat', 'cat')}
          {renderTypeSelector('Bird', 'bird')}
          {renderTypeSelector('Other', 'paw')}
        </View>

        <Input label="Pet Name" value={name} onChangeText={setName} placeholder="e.g. Max" />
        <Input label="Breed" value={breed} onChangeText={setBreed} placeholder="e.g. Golden Retriever" />
        <Input label="Last Seen Location" value={location} onChangeText={setLocation} placeholder="e.g. Central Park, NY" leftIcon="map-marker-outline" />
        <Input label="Date Lost" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" leftIcon="calendar-outline" />
        
        <Text style={styles.sectionTitle}>Distinctive Features & Details</Text>
        <Input 
          placeholder="Describe collar color, markings, tags, etc." 
          value={description} 
          onChangeText={setDescription} 
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        <Button 
          title="Submit Report" 
          onPress={handleReport} 
          style={styles.submitBtn}
          color={COLORS.error}
          loading={loading}
          disabled={loading || !name || !location}
        />

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  imageConfig: {
    height: 150,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    overflow: 'hidden',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    marginTop: SPACING.sm,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  typeSelector: {
    flex: 1,
    height: 70,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  typeSelectorActive: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.error + '10',
  },
  typeText: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  submitBtn: {
    marginTop: SPACING.xl,
  },
});
