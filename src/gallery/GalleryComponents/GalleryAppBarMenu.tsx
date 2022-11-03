import * as React from 'react';
import { View, Text, Linking } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import colors from '../../../ColorTheme';
import { GalleryDataType } from '../GalleryHome';
import ResolutionMenu from './GalleryMenuComponents/ResolutionMenu';

type GalleryAppBarMenuPropType = {
  color: string;
  galleryData: GalleryDataType;
  changeGalleryData: (newGalleryData: GalleryDataType) => void;
};

export const GalleryAppBarMenu = (props: GalleryAppBarMenuPropType) => {
  const { galleryData, changeGalleryData, color } = props;
  return (
    <View>
      <Appbar style={{ backgroundColor: color, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <ResolutionMenu galleryData={galleryData} changeGalleryData={changeGalleryData} />
          </View>
          <View>
            <IconButton
              icon="web"
              color="white"
              onPress={() => Linking.openURL('https://wallpaperioinfomain.gatsbyjs.io/')}
            />
          </View>
        </View>
      </Appbar>
    </View>
  );
};

export default GalleryAppBarMenu;
