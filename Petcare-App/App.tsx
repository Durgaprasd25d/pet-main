import React from 'react';
import { StatusBar } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <RootNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
