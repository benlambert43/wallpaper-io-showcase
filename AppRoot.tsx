import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import GlobalConfig from './GlobalConfig';
import { NavigationRoot } from './src/navigation/NavigationRoot';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const AppRoot = () => {
  const [pro, setPro] = React.useState(false);
  let isSub = true;

  const runAsync = async () => {
    const globalConfigRes = await GlobalConfig();
    if (typeof globalConfigRes.PRO === 'string' && globalConfigRes.PRO === 'true') {
      setPro(true);
    } else {
      setPro(false);
    }
  };

  React.useEffect(() => {
    if (isSub) {
      runAsync();
    }
    return () => {
      isSub = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <NavigationRoot pro={pro} />
    </View>
  );
};

export default AppRoot;
