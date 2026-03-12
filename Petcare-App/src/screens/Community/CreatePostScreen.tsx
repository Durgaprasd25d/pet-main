import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useAppStore } from '../../store/useAppStore';

export const CreatePostScreen = ({ navigation }: any) => {

  const { user, token } = useAppStore();
  const { createPost } = useCommunityStore();
  
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await createPost({
        content,
        images: imageUri ? [imageUri] : [],
        category: 'General'
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
      <Header title="Create Post" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.authorRow}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{user?.name}</Text>
        </View>

        <Input 
          placeholder="Share something with the pet community..." 
          value={content} 
          onChangeText={setContent} 
          multiline
          numberOfLines={6}
          style={styles.textArea}
          containerStyle={styles.textContainer}
        />

        {imageUri ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.removeImageBtn} onPress={() => setImageUri(null)}>
              <MaterialDesignIcons name="close" size={20} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.addPhotoBtn}
            onPress={() => setImageUri('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600')} // Mocking image selection
          >
            <MaterialDesignIcons name="image-outline" size={32} color={COLORS.primary} />
            <Text style={styles.addPhotoText}>Add Photo / Video</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Post" 
          onPress={handlePost} 
          disabled={(!content.trim() && !imageUri) || loading}
          loading={loading}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  textContainer: {
    marginBottom: SPACING.lg,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    fontSize: 18,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  addPhotoBtn: {
    height: 120,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    marginTop: SPACING.xs,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
