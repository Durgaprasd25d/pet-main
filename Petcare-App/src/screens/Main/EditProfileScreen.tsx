import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const EditProfileScreen = ({ navigation }: any) => {
  const { user, setUser } = useAppStore();
  
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name,
        phone,
        location
      });
    }
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Header title="Edit Profile" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.imageContainer}>
          <View style={styles.avatarWrapper}>
            <Avatar source={user?.avatar ? { uri: user.avatar } : undefined} size={120} />
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialDesignIcons name="camera" size={20} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            leftIcon="account-outline"
          />
          <Input
            label="Email Address"
            value={user?.email || ''}
            editable={false}
            leftIcon="email-outline"
          />
          <Input
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            leftIcon="phone-outline"
            keyboardType="phone-pad"
          />
          <Input
            label="Location"
            value={location}
            onChangeText={setLocation}
            leftIcon="map-marker-outline"
          />

          <Button 
            title="Save Changes" 
            onPress={handleSave} 
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.md,
  },
  avatarWrapper: {
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  formContainer: {
    width: '100%',
  },
  saveButton: {
    marginTop: SPACING.xl,
  },
});
