import { useFocusEffect } from '@react-navigation/native';
import { Asset } from 'expo-media-library';
import * as React from 'react';
import { View } from 'react-native';
import { Paragraph, IconButton, ActivityIndicator, Avatar } from 'react-native-paper';
import colors from '../../../../ColorTheme';
import { getSavedImageData, like, savedImagesType, unlike } from '../../../data/savedImages';
import { downloadImage } from '../../../download/downloadImage';
import { wait } from '../../../images/imageSourcePicsum';
import { GalleryDataType } from '../../GalleryHome';
import { wallpaperImageItemType } from '../GalleryFlatList';

type ImageSelectionMenuPropType = {
  galleryData: GalleryDataType;
  wallpaperImageItem: wallpaperImageItemType;
  navigation: any;
};

type DownloadResponsiveIconPropType = {
  handleDownloadButton: () => Promise<void>;
  download: Asset | undefined;
  downloadLoading: boolean;
  downloadError: boolean;
};

const DownloadResponsiveIcon = (props: DownloadResponsiveIconPropType) => {
  const { handleDownloadButton, download, downloadLoading, downloadError } = props;

  if (downloadLoading) {
    return (
      <IconButton
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => <ActivityIndicator color={colors.primary} />}
        color={colors.primary}
        style={{ paddingRight: 2 }}
        onPress={handleDownloadButton}
      />
    );
  }

  if (downloadError) {
    return (
      <IconButton
        icon="refresh"
        color={colors.error}
        style={{ paddingRight: 2 }}
        onPress={handleDownloadButton}
      />
    );
  }

  if (download) {
    return <IconButton icon="check" color={colors.success} style={{ paddingRight: 2 }} />;
  }

  return (
    <IconButton
      icon="download-outline"
      color={colors.primary}
      style={{ paddingRight: 2 }}
      onPress={handleDownloadButton}
    />
  );
};

export const ImageSelectionMenu = (props: ImageSelectionMenuPropType) => {
  const { galleryData, wallpaperImageItem, navigation } = props;

  const [download, setDownload] = React.useState<Asset>();
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState(false);

  const [liked, setLiked] = React.useState<boolean>();
  let isSubscribed = true;

  const isLiked = (image: savedImagesType, imageArr: savedImagesType[]) => {
    if (imageArr.find((i) => i.wallpaperImageItem.id === image.wallpaperImageItem.id)) {
      return true;
    }
    return false;
  };

  const getLiked = async () => {
    const savedImageDataOnDisk = await getSavedImageData();
    if (typeof savedImageDataOnDisk.value !== 'boolean') {
      const determineLiked = isLiked(
        { galleryData, wallpaperImageItem },
        savedImageDataOnDisk.value
      );
      setLiked(determineLiked);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.getParent().addListener('focus', (e: any) => {
      getLiked();
    });

    return () => {
      unsubscribe();
      isSubscribed = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isSubscribed) {
        getLiked();
      }
      return () => {
        isSubscribed = false;
      };
    }, [])
  );

  const handleLikeButton = async () => {
    const savedImageDataOnDisk = await getSavedImageData();
    if (typeof savedImageDataOnDisk.value !== 'boolean') {
      const getIsLiked = isLiked({ galleryData, wallpaperImageItem }, savedImageDataOnDisk.value);
      if (getIsLiked) {
        await unlike({ galleryData, wallpaperImageItem });
        setLiked(false);
      } else {
        await like({ galleryData, wallpaperImageItem });
        setLiked(true);
      }
    }
  };

  const handleDownloadButton = async () => {
    await wait(100);
    setDownloadLoading(true);
    await wait(200);
    const downloadRes = await downloadImage(galleryData, wallpaperImageItem);

    if (downloadRes) {
      setDownload(downloadRes);
      setDownloadError(false);
    } else {
      setDownload(undefined);
      setDownloadError(true);
    }
    await wait(200);
    setDownloadLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Paragraph
          style={{
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 20,
            color: colors.primary,
            fontWeight: 'bold',
          }}
        >
          {`${galleryData.resHeight} x ${galleryData.resWidth}`}
        </Paragraph>
        <IconButton
          icon={liked ? 'heart' : 'heart-outline'}
          color={colors.primary}
          style={{ paddingLeft: 2 }}
          onPress={handleLikeButton}
        />
        <DownloadResponsiveIcon
          handleDownloadButton={handleDownloadButton}
          download={download}
          downloadLoading={downloadLoading}
          downloadError={downloadError}
        />
      </View>
    </View>
  );
};

export default ImageSelectionMenu;
