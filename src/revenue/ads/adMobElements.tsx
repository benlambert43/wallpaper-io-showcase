import * as React from 'react';
import {
  AdMobBanner,
  getPermissionsAsync,
  PermissionResponse,
  requestPermissionsAsync,
} from 'expo-ads-admob';
import { Platform, View } from 'react-native';
import { AdMobBannerAndroid, AdMobBannerIOS } from '../config';

type CustomPublisherAdMobBannerPropType = {
  proStatus: boolean;
};

export const CustomPublisherAdMobBanner = (props: CustomPublisherAdMobBannerPropType) => {
  const { proStatus } = props;
  const [bannerError, setBannerError] = React.useState(false);
  const [bannerErrorReport, setBannerErrorReport] = React.useState<any>(undefined);
  const [perms, setPerms] = React.useState<PermissionResponse>();
  let isSub = true;

  const getPermissionsEvent = async () => {
    const existingPerms = await getPermissionsAsync();
    if (existingPerms.canAskAgain || existingPerms.granted === false) {
      await requestPermissionsAsync();
    }
    const getPermsAgain = await getPermissionsAsync();
    setPerms(getPermsAgain);
  };

  React.useEffect(() => {
    if (isSub && !proStatus) {
      getPermissionsEvent();
    }
    return () => {
      isSub = false;
    };
  }, []);

  const handleBannerError = (s: any) => {
    setBannerError(true);
    setBannerErrorReport(s);
  };

  const determineAdID = () => {
    if (Platform.OS === 'ios') {
      return AdMobBannerIOS;
    }
    return AdMobBannerAndroid;
  };

  return (
    <View style={{ minHeight: 50 }}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={determineAdID()}
        servePersonalizedAds={perms?.granted}
        onDidFailToReceiveAdWithError={(e) => handleBannerError(e)}
      />
    </View>
  );
};
export default CustomPublisherAdMobBanner;
