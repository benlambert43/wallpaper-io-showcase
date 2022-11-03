import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import { wallpaperImageItemType } from '../gallery/GalleryComponents/GalleryFlatList';
import { GalleryDataType } from '../gallery/GalleryHome';
import { wait } from '../images/imageSourcePicsum';

const cacheDir = `${FileSystem.cacheDirectory}wallpaperscache/`;

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(cacheDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
  }
}

export async function deleteAllGifs() {
  await FileSystem.deleteAsync(cacheDir);
}

export const downloadImage = async (
  galleryData: GalleryDataType,
  wallpaperImageItem: wallpaperImageItemType
) => {
  await wait(1000);
  const remoteURI = `https://picsum.photos/id/${wallpaperImageItem.id}/${galleryData.resWidth}/${galleryData.resHeight}`;
  const localURI = `${cacheDir}wallpaper${wallpaperImageItem.id}${galleryData.resWidth}${galleryData.resHeight}.jpg`;
  try {
    const mediaPerms = await MediaLibrary.getPermissionsAsync();

    if (!mediaPerms.granted && !mediaPerms.canAskAgain) {
      Alert.alert(
        'Unable to Download',
        'Please re-enable photos access in settings to download this wallpaper.'
      );
      return undefined;
    }
    if (!mediaPerms.granted) {
      await MediaLibrary.requestPermissionsAsync();
    }

    await ensureDirExists();

    const fileUri = localURI;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      const result = await FileSystem.downloadAsync(remoteURI, fileUri);
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      return asset;
    }
    const asset = await MediaLibrary.createAssetAsync(fileInfo.uri);
    return asset;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return undefined;
  }
};

export default downloadImage;
