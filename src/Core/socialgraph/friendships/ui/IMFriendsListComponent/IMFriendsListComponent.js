import React from 'react';
import { FlatList, View } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import PropTypes from 'prop-types';
import { IMFriendItem } from '../..';
import { IMUserSearchModal } from '../..';
import { SearchBarAlternate } from '../../../..';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../../localization/IMLocalization';
import { TNEmptyStateView, TNActivityIndicator } from '../../../../truly-native';

function IMFriendsListComponent(props) {
  const {
    searchBar,
    containerStyle,
    onFriendAction,
    friendsData,
    onSearchBarPress,
    onSearchBarCancel,
    searchData,
    onSearchTextChange,
    isSearchModalOpen,
    onSearchModalClose,
    onSearchClear,
    onFriendItemPress,
    searchBarRef,
    displayActions,
    appStyles,
    onEmptyStatePress,
    isLoading
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const renderItem = ({ item }) => (
    <IMFriendItem
      onFriendItemPress={onFriendItemPress}
      item={item}
      onFriendAction={onFriendAction}
      displayActions={displayActions}
      appStyles={appStyles}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {searchBar &&
        <SearchBarAlternate
          onPress={onSearchBarPress}
          placeholderTitle={IMLocalized("Search for friends")}
          appStyles={appStyles}
        />}
      {friendsData.length > 0 && (
        <FlatList
          data={friendsData}
          renderItem={renderItem}
          keyExtractor={item => item.user.id}
        />
      )}
      {friendsData.length <= 0 && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            title={IMLocalized("No Friends")}
            description={IMLocalized("Make some friend requests and have your friends to accept them. All your friends will show up here.")}
            buttonName={IMLocalized("Find friends")}
            onPress={onEmptyStatePress}
            appStyles={appStyles}
          />
        </View>
      )}
      <IMUserSearchModal
        onSearchBarCancel={onSearchBarCancel}
        onSearchClear={onSearchClear}
        data={searchData}
        onSearchTextChange={onSearchTextChange}
        isModalOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        searchBarRef={searchBarRef}
        onAddFriend={onFriendAction}
        onFriendItemPress={onFriendItemPress}
        appStyles={appStyles}
      />
      {isLoading && (<TNActivityIndicator appStyles={appStyles} />)}
    </View>
  );
}

IMFriendsListComponent.propTypes = {
  onCommentPress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  searchBar: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  friendsData: PropTypes.array,
  onSearchBarPress: PropTypes.func,
  onSearchBarCancel: PropTypes.func,
  searchData: PropTypes.array,
  onSearchTextChange: PropTypes.func,
  isSearchModalOpen: PropTypes.bool,
  onSearchModalClose: PropTypes.func,
  searchBarRef: PropTypes.object,
  onSearchClear: PropTypes.func,
};

export default IMFriendsListComponent;
