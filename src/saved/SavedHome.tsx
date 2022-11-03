import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { View, Dimensions, PixelRatio } from 'react-native';
import colors from '../../ColorTheme';
import { savedImagesType } from '../data/savedImages';
import GalleryAppBarMenu from '../gallery/GalleryComponents/GalleryAppBarMenu';
import GalleryFlatList from '../gallery/GalleryComponents/GalleryFlatList';
import { reshuffle, wait, getSavedImage } from '../images/imageSourcePicsum';

export type SavedDataType = {
  resWidth: number;
  resHeight: number;
};
type SavedHomePropType = {
  navigation: any;
};
export const SavedHome = (props: SavedHomePropType) => {
  const [savedImageArr, setSavedImageArr] = React.useState<{ id: number; src: string }[]>();
  const { navigation } = props;
  const [savedData, setSavedData] = React.useState<SavedDataType>({
    resWidth: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width),
    resHeight: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height),
  });
  let isSubscribed = true;

  const getSavedImagesAsync = async () => {
    const savedImageRes = await getSavedImage();
    if (typeof savedImageRes.value !== 'boolean') {
      const wallpaperImageItem = savedImageRes.value
        .map((i) => {
          return { id: i.wallpaperImageItem.id, src: i.wallpaperImageItem.src };
        })
        .reverse();
      setSavedImageArr(wallpaperImageItem);
      return wallpaperImageItem;
    }
    return undefined;
  };

  React.useEffect(() => {
    const unsubscribe = navigation.getParent().addListener('focus', (e: any) => {
      getSavedImagesAsync();
    });

    return () => {
      unsubscribe();
      isSubscribed = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isSubscribed) {
        getSavedImagesAsync();
      }
      return () => {
        isSubscribed = false;
      };
    }, [])
  );

  const changeSavedData = (newSavedData: SavedDataType) => {
    setSavedData(newSavedData);
  };

  return (
    <View style={{ flex: 1 }}>
      <GalleryAppBarMenu
        galleryData={savedData}
        changeGalleryData={changeSavedData}
        color={colors.backgroundSecondary}
      />
      {typeof savedImageArr !== 'undefined' ? (
        <GalleryFlatList
          galleryData={savedData}
          navigation={navigation}
          onPressDestination="SavedStack2"
          originalImageArray={savedImageArr}
          reshuffle={reshuffle}
          refetch={getSavedImagesAsync}
          wait={wait}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default SavedHome;
