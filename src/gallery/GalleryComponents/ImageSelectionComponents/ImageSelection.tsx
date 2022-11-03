import * as React from 'react';
import { View, Text } from 'react-native';
import { GalleryDataType } from '../../GalleryHome';
import { wallpaperImageItemType } from '../GalleryFlatList';
import ImageComponent from './ImageComponent';

type ImageSelectionPropType = {
  navigation: any;
  route: any;
};

type routeParamTypeImageSelection = {
  wallpaperImageItem: wallpaperImageItemType;
  galleryData: GalleryDataType;
};

export const ImageSelection = (props: ImageSelectionPropType) => {
  const { route, navigation } = props;
  const { wallpaperImageItem, galleryData }: routeParamTypeImageSelection = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ImageComponent
        wallpaperImageItem={wallpaperImageItem}
        galleryData={galleryData}
        navigation={navigation}
      />
    </View>
  );
};

export default ImageSelection;
