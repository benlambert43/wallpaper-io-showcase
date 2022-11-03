import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from '../../ColorTheme';
import SavedHomeNavigator from './SavedHomeNavigator';

const DRAWER_ENABLED = false;

const Drawer = createDrawerNavigator();

export const SavedNavigation = () => {
  if (DRAWER_ENABLED) {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: colors.backgroundSecondary,
          drawerActiveTintColor: colors.backgroundSecondary,
        }}
      >
        <Drawer.Screen
          name="SavedDrawer1"
          component={SavedHomeNavigator}
          options={{ title: 'Saved' }}
        />
      </Drawer.Navigator>
    );
  }

  return <SavedHomeNavigator DRAWER_ENABLED={DRAWER_ENABLED} />;
};

export default SavedNavigation;
