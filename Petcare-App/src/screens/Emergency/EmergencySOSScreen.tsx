import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppStore } from '../../store/useAppStore';
import { useEmergencyStore } from '../../store/useEmergencyStore';
import { CustomModal } from '../../components/ui/CustomModal';

export const EmergencySOSScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { triggerSOS, loading } = useEmergencyStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  // Premium Animation Values
  const pulse1 = useSharedValue(1);
  const opacity1 = useSharedValue(0.6);
  const pulse2 = useSharedValue(1);
  const opacity2 = useSharedValue(0.6);
  const pulse3 = useSharedValue(1);
  const opacity3 = useSharedValue(0.6);

  useEffect(() => {
    const duration = 2500;
    
    pulse1.value = withRepeat(
      withTiming(2.2, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    );
    opacity1.value = withRepeat(
      withTiming(0, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    );

    pulse2.value = withDelay(800, withRepeat(
      withTiming(2.2, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    ));
    opacity2.value = withDelay(800, withRepeat(
      withTiming(0, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    ));

    pulse3.value = withDelay(1600, withRepeat(
      withTiming(2.2, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    ));
    opacity3.value = withDelay(1600, withRepeat(
      withTiming(0, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    ));
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1.value }],
    opacity: opacity1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2.value }],
    opacity: opacity2.value,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse3.value }],
    opacity: opacity3.value,
  }));
  
  const handleSOSPress = () => {
    if (!token) {
      return;
    }
    setModalVisible(true);
  };

  const confirmSOS = async () => {
    setModalVisible(false);
    const sosData = {
      latitude: 19.0760,
      longitude: 72.8777,
      address: "Current location detected",
      description: "User triggered emergency SOS",
      emergencyType: "Critical"
    };

    const result = await triggerSOS(sosData, token as string);
    if (result) {
      setSuccessModalVisible(true);
    }
  };

  return (
    <ScreenContainer>
      <Header title="Emergency SOS" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Are you in an emergency?</Text>
          <Text style={styles.subtitle}>Press the SOS button below to find immediate help for your pet.</Text>
        </View>

        <View style={styles.sosContainer}>
          {/* Multi-layered Premium Ripples */}
          <Animated.View style={[styles.pulseRing, animatedStyle1]} />
          <Animated.View style={[styles.pulseRing, animatedStyle2]} />
          <Animated.View style={[styles.pulseRing, animatedStyle3]} />
          
          <View style={styles.buttonShadow} />
          
          <TouchableOpacity 
            style={[styles.sosButton, loading && { opacity: 0.7 }]} 
            onPress={handleSOSPress} 
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <View style={styles.innerButton}>
                <Text style={styles.sosText}>SOS</Text>
                <Text style={styles.tapText}>TAP TO CALL</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate('NearbyVetClinics')}
          >
            <View style={[styles.iconBox, { backgroundColor: COLORS.error + '20' }]}>
              <MaterialDesignIcons name="hospital-box" size={32} color={COLORS.error} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Nearby Clinics</Text>
              <Text style={styles.actionDesc}>Find open veterinary hospitals near you.</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate('EmergencyContact')}
          >
            <View style={[styles.iconBox, { backgroundColor: COLORS.primary + '20' }]}>
              <MaterialDesignIcons name="phone-alert" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Emergency Contacts</Text>
              <Text style={styles.actionDesc}>Call your vet or poison control.</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate('MedicalHistory', { petId: '1' })} // Example pass
          >
            <View style={[styles.iconBox, { backgroundColor: '#eab30820' }]}>
              <MaterialDesignIcons name="file-document-outline" size={32} color="#eab308" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Medical Records</Text>
              <Text style={styles.actionDesc}>Quickly access pet health data.</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Premium SOS Modals */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmSOS}
        title="Confirm SOS Alert"
        message="This will broadcast your location to all nearby veterinary clinics for immediate assistance."
        confirmLabel="Trigger Emergency"
        type="error"
        loading={loading}
      />

      <CustomModal
        visible={successModalVisible}
        onClose={() => {
          setSuccessModalVisible(false);
          navigation.navigate('NearbyVetClinics');
        }}
        title="SOS Alert Sent"
        message="Nearby veterinarians have been notified. Please stay where you are, help is coming."
        confirmLabel="View Nearby Vets"
        type="success"
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  headerInfo: {
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    lineHeight: 24,
  },
  sosContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  pulseRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.error + '40',
  },
  buttonShadow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.error,
    opacity: 0.2,
    ...SHADOWS.large,
    shadowColor: COLORS.error,
    shadowRadius: 30,
    shadowOpacity: 0.8,
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 20,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  innerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: -4,
  },
  tapText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    opacity: 0.9,
    letterSpacing: 1,
  },
  quickActions: {
    width: '100%',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
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
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 13,
    color: COLORS.textLight,
  },
});
