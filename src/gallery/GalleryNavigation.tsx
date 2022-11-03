import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from '../../ColorTheme';
import GalleryHomeNavigator from './GalleryHomeNavigator';

const DRAWER_ENABLED = false;

const Drawer = createDrawerNavigator();

export const GalleryNavigation = () => {
  if (DRAWER_ENABLED) {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: colors.backgroundPrimary,
          drawerActiveTintColor: colors.backgroundPrimary,
        }}
      >
        <Drawer.Screen
          name="GalleryDrawer1"
          component={GalleryHomeNavigator}
          options={{ title: 'Gallery' }}
        />
      </Drawer.Navigator>
    );
  }

  return <GalleryHomeNavigator DRAWER_ENABLED={DRAWER_ENABLED} />;
};

export default GalleryNavigation;
