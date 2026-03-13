import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import { View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens and Stacks
import { HomeDashboardScreen } from '../screens/Main/HomeDashboardScreen';
import { CommunityFeedScreen } from '../screens/Community/CommunityFeedScreen';
import { PetStack } from './PetStack';
import { StoreStack } from './StoreStack';
import { AppointmentListScreen } from '../screens/Veterinary/AppointmentListScreen';

export type MainTabParamList = {
  HomeTab: undefined;
  PetsTab: undefined;
  AppointmentsTab: undefined;
  CommunityTab: undefined;
  StoreTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'home-variant';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
          } else if (route.name === 'PetsTab') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'AppointmentsTab') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'CommunityTab') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'StoreTab') {
            iconName = focused ? 'store' : 'store-outline';
          }

          return <MaterialDesignIcons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border + '50',
          height: Platform.OS === 'ios' ? 88 + insets.bottom : 70 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : (Platform.OS === 'ios' ? 28 : 12),
          paddingTop: 10,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeDashboardScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="PetsTab" component={PetStack} options={{ tabBarLabel: 'My Pets' }} />
      <Tab.Screen name="AppointmentsTab" component={AppointmentListScreen} options={{ tabBarLabel: 'Visits' }} />
      <Tab.Screen name="CommunityTab" component={CommunityFeedScreen} options={{ tabBarLabel: 'Talk' }} />
      <Tab.Screen name="StoreTab" component={StoreStack} options={{ tabBarLabel: 'Store' }} />
    </Tab.Navigator>
  );
};
