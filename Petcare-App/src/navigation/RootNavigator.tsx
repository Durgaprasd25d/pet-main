import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { useAppStore } from '../store/useAppStore';
import { NavigationTheme } from '../theme/theme';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  // Other global modals or full screen views could go here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated } = useAppStore();

  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
