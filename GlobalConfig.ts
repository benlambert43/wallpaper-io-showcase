import Constants from 'expo-constants';

export const GlobalConfig = async () => {
  const PRO = await Constants.manifest!.extra!.pro;

  return {
    PRO,
  };
};

export default GlobalConfig;
