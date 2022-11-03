import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Surface } from 'react-native-paper';
import { GalleryDataType } from '../../GalleryHome';
import { wallpaperImageItemType } from '../GalleryFlatList';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 1,
  },
  surfaceContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 4,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderRadius: 4,
  },
});

type FlatListComponentPropType = {
  galleryData: GalleryDataType;
  wallpaperImageItem: wallpaperImageItemType;
  navigation: any;
  onPressDestination: 'GalleryStack2' | 'SavedStack2';
};

export const FlatListComponent = (props: FlatListComponentPropType) => {
  const { galleryData, wallpaperImageItem, navigation, onPressDestination } = props;
  const { src } = wallpaperImageItem;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(onPressDestination, { wallpaperImageItem, galleryData })}
      >
        <Surface style={styles.surfaceContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1,
            }}
          >
            <Image style={styles.imageThumbnail} source={{ uri: src }} />
          </View>
        </Surface>
      </TouchableOpacity>
    </View>
  );
};

export default FlatListComponent;
