import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useAppStore } from '../../store/useAppStore';

const PET_TYPES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export const AskQuestionScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { createPost } = useCommunityStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('Dog');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token || !title.trim()) return;
    setLoading(true);
    try {
      await createPost({
        content: `[Q: ${title}] ${description}`,
        category: 'health', // Questions usually fall under health/advice
        images: imageUri ? [imageUri] : [],
        petType: selectedType // Backend can handle extra fields
      }, token);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Header title="Ask a Question" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.label}>What is your question about?</Text>
        <Input 
          placeholder="e.g. Is chocolate bad for dogs?" 
          value={title} 
          onChangeText={setTitle}
          containerStyle={styles.inputContainer}
        />

        <Text style={styles.label}>Tell us more</Text>
        <Input 
          placeholder="Provide more details so the community can help..." 
          value={description} 
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          style={styles.textArea}
          containerStyle={styles.inputContainer}
        />

        <Text style={styles.label}>Pet Type</Text>
        <View style={styles.typeContainer}>
          {PET_TYPES.map(type => (
            <TouchableOpacity 
              key={type} 
              style={[
                styles.typeBtn, 
                selectedType === type && styles.selectedTypeBtn
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[
                styles.typeText,
                selectedType === type && styles.selectedTypeText
              ]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.imageSelector}
          onPress={() => setImageUri('https://images.unsplash.com/photo-1544191173-05f426588277?q=80&w=600')} // Mocking
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <>
              <MaterialDesignIcons name="camera-plus-outline" size={32} color={COLORS.primary} />
              <Text style={styles.imagePlaceholderText}>Add a photo to help explain</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Post Question" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!title.trim() || loading}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  typeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTypeBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  selectedTypeText: {
    color: COLORS.surface,
    fontWeight: 'bold',
  },
  imageSelector: {
    height: 200,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textLight,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
