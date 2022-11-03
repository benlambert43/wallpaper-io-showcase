import 'react-native-gesture-handler';
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import colors from './ColorTheme';
import { AppRoot } from './AppRoot';

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
  },
};

export const App = () => (
  <View style={{ flex: 1 }}>
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <AppRoot />
    </PaperProvider>
  </View>
);

export default App;
