import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

export default function SearchBarAlternate(props) {
  const { onPress, appStyles, placeholderTitle } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const searchIcon = require('../../../CoreAssets/search.png');

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}>
      <Image style={styles.searchIcon} source={searchIcon} />
      <Text style={styles.searchInput}>{placeholderTitle}</Text>
    </TouchableOpacity>
  );
}

SearchBarAlternate.propTypes = {
  onPress: PropTypes.func,
};
