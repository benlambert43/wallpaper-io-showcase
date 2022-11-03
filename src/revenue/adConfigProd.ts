import * as Device from 'expo-device';

export const adConfigProd = () => {
  if (typeof Device.isDevice === 'boolean' && typeof __DEV__ === 'boolean') {
    const determineSimul = Device.isDevice && !__DEV__;
    return determineSimul;
  }
  return true;
};

export default adConfigProd;
