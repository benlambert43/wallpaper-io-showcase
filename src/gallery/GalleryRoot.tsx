import * as React from 'react';
import { View } from 'react-native';
import { GalleryNavigation } from './GalleryNavigation';

export const GalleryRoot = () => (
  <View style={{ flex: 1 }}>
    <GalleryNavigation />
  </View>
);

export default GalleryRoot;
