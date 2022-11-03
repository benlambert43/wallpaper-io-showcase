import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator } from './TabNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type NavigationRootPropType = {
  pro: boolean;
};

export const NavigationRoot = (props: NavigationRootPropType) => {
  const { pro } = props;
  return (
    <View style={styles.container}>
      <TabNavigator pro={pro} />
    </View>
  );
};

export default NavigationRoot;
