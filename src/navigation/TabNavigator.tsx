import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { GalleryRoot } from '../gallery/GalleryRoot';
import { SavedRoot } from '../saved/SavedRoot';
import colors from '../../ColorTheme';
import CustomPublisherAdMobBanner from '../revenue/ads/adMobElements';

const Tab = createMaterialBottomTabNavigator();

type TabNavigatorPropType = {
  pro: boolean;
};

export const TabNavigator = (props: TabNavigatorPropType) => {
  const { pro } = props;
  return (
    <NavigationContainer>
      {pro ? undefined : (
        <View>
          {Platform.OS === 'ios' ? (
            <SafeAreaViewIOS>
              <CustomPublisherAdMobBanner proStatus={pro} />
            </SafeAreaViewIOS>
          ) : (
            <SafeAreaViewAndroid>
              <CustomPublisherAdMobBanner proStatus={pro} />
            </SafeAreaViewAndroid>
          )}
        </View>
      )}
      <Tab.Navigator shifting>
        <Tab.Screen
          name="Gallery"
          component={GalleryRoot}
          options={{
            tabBarIcon: 'wallpaper',
            tabBarColor: colors.backgroundPrimary,
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedRoot}
          options={{
            tabBarIcon: 'heart',
            tabBarColor: colors.backgroundSecondary,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
