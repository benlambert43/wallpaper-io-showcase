/* eslint-disable camelcase */
import { adConfigProd } from './adConfigProd';

// AdMobBannerIOS
const test_AdMobBannerIOS_ID = 'ca-app-pub-3940256099942544/2934735716';
const production_AdMobBannerIOS_ID = 'my-id-ios';
export const AdMobBannerIOS = adConfigProd()
  ? production_AdMobBannerIOS_ID
  : test_AdMobBannerIOS_ID;

// AdMobBannerAndroid
const test_AdMobBannerAndroid_ID = 'ca-app-pub-3940256099942544/6300978111';
const production_AdMobBannerAndroid_ID = 'my-id-android';
export const AdMobBannerAndroid = adConfigProd()
  ? production_AdMobBannerAndroid_ID
  : test_AdMobBannerAndroid_ID;
