import * as React from 'react';
import { View, Image, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FlatListComponent from './GalleryFlatListComponents/FlatListComponent';
import { GalleryDataType } from '../GalleryHome';

export type wallpaperImageItemType = {
  id: number;
  src: string;
};

const ItemSeparator = () => {
  return <View style={{ paddingVertical: 10 }} />;
};

type GalleryFlatListPropType = {
  navigation: any;
  onPressDestination: 'GalleryStack2' | 'SavedStack2';
  galleryData: GalleryDataType;
  originalImageArray: {
    id: number;
    src: string;
  }[];
  reshuffle: () => {
    id: number;
    src: string;
  }[];
  refetch: (() => Promise<{ id: number; src: string }[] | undefined>) | undefined;
  wait: (timeout: number) => Promise<unknown>;
};

export const GalleryFlatList = (props: GalleryFlatListPropType) => {
  const {
    navigation,
    galleryData,
    onPressDestination,
    originalImageArray,
    reshuffle,
    refetch,
    wait,
  } = props;
  const [imageArray, setImageArray] = React.useState(originalImageArray);
  const [dataSource, setDataSource] = React.useState<wallpaperImageItemType[]>();
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(12);
  const [refreshing, setRefreshing] = React.useState(false);
  let isSubscribed = true;

  const triggerReshuffle = async () => {
    if (refetch) {
      const refetchVal = await refetch();
      if (refetchVal) {
        setImageArray(refetchVal);
      } else {
        setImageArray([]);
      }
    } else {
      setImageArray(reshuffle());
    }
  };

  React.useEffect(() => {
    const subsetImageArray = imageArray.slice(startIndex, endIndex);
    setDataSource(subsetImageArray);
  }, [imageArray, startIndex, endIndex]);

  React.useEffect(() => {
    const unsubscribe = navigation.getParent().addListener('focus', (e: any) => {
      if (refetch) {
        setRefreshing(true);
        setStartIndex(0);
        setEndIndex(12);
        triggerReshuffle();
        wait(300).then(() => setRefreshing(false));
      }
    });

    return () => {
      unsubscribe();
      isSubscribed = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isSubscribed && refetch) {
        setRefreshing(true);
        setStartIndex(0);
        setEndIndex(12);
        triggerReshuffle();
        wait(200).then(() => setRefreshing(false));
      }
      return () => {
        isSubscribed = false;
      };
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setStartIndex(0);
    setEndIndex(12);
    triggerReshuffle();
    wait(200).then(() => setRefreshing(false));
  }, []);

  const endReached = () => {
    setEndIndex(endIndex + 12);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={endReached}
        contentContainerStyle={{ paddingVertical: 20 }}
        ItemSeparatorComponent={ItemSeparator}
        data={dataSource}
        renderItem={(wallpaperImageItem) => (
          <FlatListComponent
            galleryData={galleryData}
            wallpaperImageItem={wallpaperImageItem.item}
            navigation={navigation}
            onPressDestination={onPressDestination}
          />
        )}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        numColumns={3}
        columnWrapperStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default GalleryFlatList;
