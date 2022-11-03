import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryHome from './GalleryHome';
import ImageSelection from './GalleryComponents/ImageSelectionComponents/ImageSelection';
import colors from '../../ColorTheme';

const Stack = createStackNavigator();

type GalleryHomeNavigatorPropType = { DRAWER_ENABLED: boolean | undefined };

export const GalleryHomeNavigator = (props: GalleryHomeNavigatorPropType) => {
  const { DRAWER_ENABLED } = props;

  const headerShownEval = () => {
    if (DRAWER_ENABLED === undefined) {
      return false;
    }
    if (DRAWER_ENABLED === false) {
      return true;
    }
    return false;
  };
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.backgroundPrimary }}>
      <Stack.Screen
        name="GalleryStack1"
        component={GalleryHome}
        options={{ headerShown: headerShownEval(), headerTitle: 'Gallery' }}
      />
      <Stack.Screen name="GalleryStack2" component={ImageSelection} options={{ headerTitle: '' }} />
    </Stack.Navigator>
  );
};

export default GalleryHomeNavigator;
