import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  Image, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, wp } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { usePetStore } from '../../store/usePetStore';
import { useAppStore } from '../../store/useAppStore';

export const EditPetScreen = ({ route, navigation }: any) => {
  const { petId } = route.params;
  const { token } = useAppStore();
  const { pets, updatePet, fetchPets, loading } = usePetStore();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync state with pet data
  useEffect(() => {
    const pet = pets.find(p => p.id === petId);
    if (pet && !isInitialized) {
      setName(pet.name);
      setType(pet.type);
      setBreed(pet.breed);
      setAge(pet.age?.toString() || '');
      setWeight(pet.weight || '');
      setGender(pet.gender || 'Male');
      setIsInitialized(true);
    } else if (!pet && token) {
      fetchPets(token);
    }
  }, [pets, petId, token, isInitialized]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a name for your pet');
      return;
    }
    
    try {
      await updatePet(petId, {
        name: name.trim(),
        type,
        breed: breed.trim(),
        age: parseInt(age) || 0,
        weight: weight.trim(),
        gender,
      }, token!);
      
      Alert.alert('Success', 'Pet profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update pet details. Please try again.');
    }
  };

  const renderTypeSelector = (label: string, icon: string) => (
    <TouchableOpacity 
      style={[styles.typeSelector, type === label && styles.typeSelectorActive]}
      onPress={() => setType(label)}
      activeOpacity={0.7}
    >
      <MaterialDesignIcons 
        name={icon as any} 
        size={32} 
        color={type === label ? COLORS.primary : COLORS.textLight} 
      />
      <Text style={[styles.typeText, type === label && styles.typeTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderGenderSelector = (label: string, icon: string, color: string) => (
    <TouchableOpacity 
      style={[
        styles.genderSelector, 
        gender === label && { borderColor: color, backgroundColor: color + '15' }
      ]}
      onPress={() => setGender(label)}
      activeOpacity={0.7}
    >
      <MaterialDesignIcons 
        name={icon as any} 
        size={22} 
        color={gender === label ? color : COLORS.textLight} 
      />
      <Text style={[styles.genderText, gender === label && { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  const currentPet = pets.find(p => p.id === petId);

  if (!isInitialized && loading) {
    return (
      <ScreenContainer>
        <Header title="Edit Pet" onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading pet data...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Header title="Edit Pet" onBackPress={() => navigation.goBack()} />
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageSelectorContainer}>
            <View style={styles.imageSelector}>
              {currentPet?.image ? (
                <Image source={{ uri: currentPet.image }} style={styles.image} />
              ) : (
                <MaterialDesignIcons name="camera-plus" size={40} color={COLORS.textLight} />
              )}
              <TouchableOpacity 
                style={styles.editIconBadge}
                onPress={() => Alert.alert('Coming Soon', 'Image upload will be available in the next update.')}
              >
                <MaterialDesignIcons name="camera" size={16} color={COLORS.surface} />
              </TouchableOpacity>
            </View>
            <Text style={styles.imageHint}>Tap camera to change photo</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Pet Type</Text>
            <View style={styles.row}>
              {renderTypeSelector('Dog', 'dog')}
              {renderTypeSelector('Cat', 'cat')}
              {renderTypeSelector('Bird', 'bird')}
              {renderTypeSelector('Other', 'paw')}
            </View>
          </View>

          <Input 
            label="Pet Name" 
            value={name} 
            onChangeText={setName} 
            placeholder="e.g. Bruno"
          />
          
          <Input 
            label="Breed" 
            value={breed} 
            onChangeText={setBreed} 
            placeholder="e.g. Golden Retriever"
          />

          <View style={styles.section}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.row}>
              {renderGenderSelector('Male', 'gender-male', '#3b82f6')}
              {renderGenderSelector('Female', 'gender-female', '#ec4899')}
            </View>
          </View>

          <View style={styles.row}>
            <Input 
              label="Age (Years)" 
              value={age} 
              onChangeText={setAge} 
              keyboardType="numeric" 
              containerStyle={{ flex: 1, marginRight: SPACING.md }} 
            />
            <Input 
              label="Weight (kg)" 
              value={weight} 
              onChangeText={setWeight} 
              placeholder="e.g. 15"
              containerStyle={{ flex: 1 }} 
            />
          </View>

          <Button 
            title="Update Pet Details" 
            onPress={handleSave} 
            style={styles.saveButton}
            loading={loading}
            disabled={!name.trim()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl * 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textLight,
    fontSize: 16,
  },
  imageSelectorContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.md,
  },
  imageSelector: {
    height: wp(32),
    width: wp(32),
    borderRadius: wp(16),
    backgroundColor: COLORS.border + '30',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.border + '50',
  },
  image: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(16),
  },
  imageHint: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  section: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeSelector: {
    flex: 1,
    height: 85,
    borderWidth: 1.5,
    borderColor: COLORS.border + '60',
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: COLORS.surface,
  },
  typeSelectorActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '08',
  },
  typeText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 6,
    fontWeight: '700',
  },
  typeTextActive: {
    color: COLORS.primary,
  },
  genderSelector: {
    flex: 1,
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.border + '60',
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: COLORS.surface,
  },
  genderText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 10,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: SPACING.xl,
    height: 56,
  },
});
