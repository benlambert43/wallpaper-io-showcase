import * as React from 'react';
import { View } from 'react-native';
import { SavedNavigation } from './SavedNavigation';

export const SavedRoot = () => (
  <View style={{ flex: 1 }}>
    <SavedNavigation />
  </View>
);

export default SavedRoot;
