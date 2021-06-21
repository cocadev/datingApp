import React from 'react';
import { FlatList, View } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import Modal from 'react-native-modalbox';
import { IMFriendItem } from '../..';
import { SearchBar } from '../../../..';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

function IMUserSearchModal(props) {
  const {
    data,
    onSearchTextChange,
    isModalOpen,
    onClose,
    onSearchBarCancel,
    onFriendItemPress,
    searchBarRef,
    onAddFriend,
    onSearchClear,
    appStyles
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const renderItem = ({ item, index }) => (
    <IMFriendItem
      item={item}
      onFriendAction={() => onAddFriend(item, index)}
      onFriendItemPress={onFriendItemPress}
      appStyles={appStyles}
    />
  );

  return (
    <Modal
      style={styles.container}
      isOpen={isModalOpen}
      onClosed={onClose}
      position="center"
      keyboardTopOffset={0}
      swipeToClose={false}
      swipeArea={250}
      coverScreen={true}
      useNativeDriver={false}
      animationDuration={0}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            onChangeText={onSearchTextChange}
            onSearchBarCancel={onSearchBarCancel}
            searchRef={searchBarRef}
            onSearchClear={onSearchClear}
            appStyles={appStyles}
          />
        </View>
        <FlatList
          keyboardShouldPersistTaps='always'
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.user.id}
        />
      </View>
    </Modal>
  );
}

IMUserSearchModal.propTypes = {
  onCommentPress: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  onSearchBarCancel: PropTypes.func,
  onSearchClear: PropTypes.func,
  isModalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onAddFriend: PropTypes.func,
  searchBarRef: PropTypes.object,
};

export default IMUserSearchModal;
