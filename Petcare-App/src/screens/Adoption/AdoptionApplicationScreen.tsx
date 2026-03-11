import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';

export const AdoptionApplicationScreen = ({ route, navigation }: any) => {
  const { adoptionId } = route.params;

  const [experience, setExperience] = useState('');
  const [homeType, setHomeType] = useState('');
  const [otherPets, setOtherPets] = useState('');

  const handleSubmit = () => {
    // Navigate to success screen
    navigation.navigate('ApplicationSuccess');
  };

  return (
    <ScreenContainer>
      <Header title="Adoption Application" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Before you apply</Text>
          <Text style={styles.infoText}>
            Adopting a pet is a long-term commitment. Please ensure you have the time, resources, and dedication to provide a loving forever home.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Pet Experience</Text>
        <Input 
          label="Have you owned a pet before?" 
          placeholder="Yes/No, please describe briefly..." 
          value={experience} 
          onChangeText={setExperience} 
          multiline
          numberOfLines={3}
          style={styles.textArea}
        />

        <Text style={styles.sectionTitle}>Living Situation</Text>
        <Input 
          label="Type of Home" 
          placeholder="House, Apartment, Condo, etc." 
          value={homeType} 
          onChangeText={setHomeType} 
        />

        <Text style={styles.sectionTitle}>Other Pets</Text>
        <Input 
          label="Do you have other pets currently?" 
          placeholder="Describe any current pets..." 
          value={otherPets} 
          onChangeText={setOtherPets} 
          multiline
          numberOfLines={3}
          style={styles.textArea}
        />

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Submit Application" 
          onPress={handleSubmit} 
          disabled={!experience || !homeType}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  infoCard: {
    backgroundColor: COLORS.primary + '15',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
    marginBottom: SPACING.xl,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
