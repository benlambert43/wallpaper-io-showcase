import AsyncStorage from '@react-native-async-storage/async-storage';
import { wallpaperImageItemType } from '../gallery/GalleryComponents/GalleryFlatList';
import { GalleryDataType } from '../gallery/GalleryHome';

const STORE_KEY = 'saved_images';

export type savedImagesType = {
  galleryData: GalleryDataType;
  wallpaperImageItem: wallpaperImageItemType;
};

type getDataObjectType = {
  error: boolean;
  value: savedImagesType[] | false;
  errorMsg: string;
};

export const storeSavedImageData = async (value: savedImagesType[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORE_KEY, jsonValue);
    return { error: false };
  } catch (e) {
    // saving error
    return { error: true };
  }
};

export const getSavedImageData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORE_KEY);
    const parseVal: savedImagesType[] | null = jsonValue != null ? JSON.parse(jsonValue) : null;
    const returnObject: getDataObjectType = {
      error: false,
      errorMsg: '',
      value: parseVal || [],
    };
    return returnObject;
  } catch (e) {
    // error reading value
    const returnObjectErr: getDataObjectType = {
      error: true,
      errorMsg: JSON.stringify(e, undefined, ' '),
      value: false,
    };
    return returnObjectErr;
  }
};

export const like = async (value: savedImagesType) => {
  const currentLikeArray = await getSavedImageData();
  if (typeof currentLikeArray.value !== 'boolean') {
    currentLikeArray.value.push(value);
    await storeSavedImageData(currentLikeArray.value);
  }
};

export const unlike = async (value: savedImagesType) => {
  const currentLikeArray = await getSavedImageData();
  if (typeof currentLikeArray.value !== 'boolean') {
    const newArray = currentLikeArray.value.filter(
      (i) => i.wallpaperImageItem.id !== value.wallpaperImageItem.id
    );
    await storeSavedImageData(newArray);
  }
};
