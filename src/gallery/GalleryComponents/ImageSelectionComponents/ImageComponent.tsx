import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import { IconButton, Paragraph, ProgressBar, Surface } from 'react-native-paper';
import colors from '../../../../ColorTheme';
import { GalleryDataType } from '../../GalleryHome';
import { wallpaperImageItemType } from '../GalleryFlatList';
import ImageSelectionMenu from './ImageSelectionMenu';

const styles = StyleSheet.create({});

type ImageComponentPropType = {
  wallpaperImageItem: wallpaperImageItemType;
  galleryData: GalleryDataType;
  navigation: any;
};

export const ImageComponent = (props: ImageComponentPropType) => {
  const { wallpaperImageItem, galleryData, navigation } = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Surface
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,
          borderRadius: 8,
        }}
      >
        <View style={{ padding: 20 }}>
          <ImageSelectionMenu
            wallpaperImageItem={wallpaperImageItem}
            galleryData={galleryData}
            navigation={navigation}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <View
              style={{
                maxWidth: Dimensions.get('window').width / 1.75,
                maxHeight: Dimensions.get('window').height / 1.75,
              }}
            >
              <Image
                renderIndicator={(progress, indeterminate) => {
                  return <ProgressBar progress={progress} indeterminate={indeterminate} />;
                }}
                indicatorContainerStyle={{
                  width: Dimensions.get('window').width / 1.75,
                }}
                imageStyle={{
                  borderRadius: 8,
                  maxWidth: Dimensions.get('window').width / 1.75,
                  maxHeight: Dimensions.get('window').height / 1.75,
                }}
                style={{
                  width: galleryData.resWidth,
                  height: galleryData.resHeight,
                }}
                source={{
                  uri: `https://picsum.photos/id/${wallpaperImageItem.id}/${galleryData.resWidth}/${galleryData.resHeight}`,
                }}
              />
            </View>
          </View>
        </View>
      </Surface>
    </View>
  );
};

export default ImageComponent;
