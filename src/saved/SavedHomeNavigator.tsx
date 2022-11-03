import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SavedHome from './SavedHome';
import ImageSelection from '../gallery/GalleryComponents/ImageSelectionComponents/ImageSelection';
import colors from '../../ColorTheme';

const Stack = createStackNavigator();

type SavedHomeNavigatorPropType = { DRAWER_ENABLED: boolean | undefined };

export const SavedHomeNavigator = (props: SavedHomeNavigatorPropType) => {
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
    <Stack.Navigator screenOptions={{ headerTintColor: colors.backgroundSecondary }}>
      <Stack.Screen
        name="SavedStack1"
        component={SavedHome}
        options={{ headerShown: headerShownEval(), headerTitle: 'Saved' }}
      />
      <Stack.Screen name="SavedStack2" component={ImageSelection} options={{ headerTitle: '' }} />
    </Stack.Navigator>
  );
};

export default SavedHomeNavigator;
