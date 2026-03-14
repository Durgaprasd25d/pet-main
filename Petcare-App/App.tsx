import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { NotificationService } from './src/services/notificationService';
import { useAppStore } from './src/store/useAppStore';
import { dataService } from './src/services/dataService';
import { AppLock } from './src/components/layout/AppLock';

function App(): React.JSX.Element {
  const { user, token, isAuthenticated, hasHydrated } = useAppStore();

  useEffect(() => {
    if (!hasHydrated) return;

    if (isAuthenticated && token) {
      // Fetch latest profile to ensure data like phone/location is fresh
      dataService.getUserProfile(token).then((updatedUser: any) => {
        useAppStore.getState().setUser(updatedUser);
        console.log('[App] Profile refreshed');
      }).catch((err: Error) => console.error('[App] Profile refresh failed:', err));

      NotificationService.requestUserPermission().then(async fcmToken => {
        // If we got a token, sync it with backend!
        if (fcmToken) {
          console.log('[App] Sending FCM Token to backend...');
          try {
            await dataService.updateUserProfile({ fcmToken }, token);
            console.log('[App] FCM Token successfully synced to user profile');
          } catch (error) {
            console.error('[App] Failed to sync FCM token:', error);
          }
        }
      });
    }

    const unsubscribeForeground = NotificationService.setupForegroundListener();
    NotificationService.handleBackgroundInteraction();
    NotificationService.handleQuitInteraction();

    return () => {
      unsubscribeForeground();
    };
  }, [hasHydrated, isAuthenticated, token]);

  return (
    <SafeAreaProvider>
      <AppLock>
        <PaperProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <RootNavigator />
        </PaperProvider>
      </AppLock>
    </SafeAreaProvider>
  );
}

export default App;
