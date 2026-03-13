import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import LinearGradient from 'react-native-linear-gradient';

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
      <Header title="Edit Profile" onBackPress={() => navigation.goBack()} transparent />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.primary, '#10b981']}
          style={styles.gradientHeader}
        />
        
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Avatar source={user?.avatar ? { uri: user.avatar } : undefined} size={110} />
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialDesignIcons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>Tap camera to update photo</Text>
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
    flexGrow: 1,
    paddingBottom: SPACING.xl,
  },
  gradientHeader: {
    height: 120,
    width: '100%',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: -55,
    marginBottom: SPACING.xl,
  },
  avatarWrapper: {
    position: 'relative',
    ...SHADOWS.large,
    backgroundColor: '#fff',
    borderRadius: RADIUS.round,
    padding: 6,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.secondary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 10,
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: SPACING.lg,
    width: '100%',
  },
  saveButton: {
    marginTop: SPACING.xl,
  },
});
