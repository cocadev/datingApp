import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';

export const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: 24,
  },
});
