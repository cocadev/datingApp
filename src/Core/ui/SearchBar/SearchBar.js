import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SearchBox from 'react-native-search-box';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

export default function SearchBar(props) {
  const { onChangeText, onSearchBarCancel, onSearchClear, searchRef, appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const onSearchTextChange = text => {
    onChangeText(text);
  };

  const onCancel = () => {
    onSearchTextChange('');
    onSearchBarCancel();
  };

  return (
    <View style={styles.container}>
      <SearchBox
        ref={searchRef}
        backgroundColor={'transparent'}
        cancelTitle={'Cancel'}
        cancelButtonTextStyle={styles.cancelButtonText}
        inputBorderRadius={9}
        onChangeText={onSearchTextChange}
        onCancel={onCancel}
        onDelete={onSearchClear}
        inputStyle={styles.searchInput}
      />
    </View>
  );
}

SearchBar.propTypes = {
  onSearchBarCancel: PropTypes.func,
  onSearchClear: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  activeOpacity: PropTypes.number,
  searchRef: PropTypes.object,
};
