import * as React from 'react';
import { View, Dimensions, PixelRatio } from 'react-native';
import colors from '../../ColorTheme';
import GalleryAppBarMenu from './GalleryComponents/GalleryAppBarMenu';
import GalleryFlatList from './GalleryComponents/GalleryFlatList';
import { imageArray as originalImageArray, reshuffle, wait } from '../images/imageSourcePicsum';

export type GalleryDataType = {
  resWidth: number;
  resHeight: number;
};
type GalleryHomePropType = {
  navigation: any;
};
export const GalleryHome = (props: GalleryHomePropType) => {
  const { navigation } = props;
  const [galleryData, setGalleryData] = React.useState<GalleryDataType>({
    resWidth: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width),
    resHeight: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height),
  });

  const changeGalleryData = (newGalleryData: GalleryDataType) => {
    setGalleryData(newGalleryData);
  };

  return (
    <View style={{ flex: 1 }}>
      <GalleryAppBarMenu
        galleryData={galleryData}
        changeGalleryData={changeGalleryData}
        color={colors.backgroundPrimary}
      />
      <GalleryFlatList
        galleryData={galleryData}
        navigation={navigation}
        onPressDestination="GalleryStack2"
        originalImageArray={originalImageArray}
        reshuffle={reshuffle}
        refetch={undefined}
        wait={wait}
      />
    </View>
  );
};

export default GalleryHome;
