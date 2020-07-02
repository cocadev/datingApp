import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

const IMProfileItemView = props => {
  const { appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const rightArrowIcon = require('../../../../../CoreAssets/right-arrow.png');

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <Image style={[styles.icon, props.iconStyle]} source={props.icon} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <Image style={styles.itemNavigationIcon} source={rightArrowIcon} />
    </TouchableOpacity>
  );
};

export default IMProfileItemView;
