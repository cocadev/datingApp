import React from 'react';
import { FlatList, ScrollView, I18nManager } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import StoryItem from './StoryItem/StoryItem';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

function TNStoriesTray(props) {
  const {
    data,
    onStoryItemPress,
    onUserItemPress,
    user,
    displayUserItem,
    userItemShouldOpenCamera,
    storyItemContainerStyle,
    userStoryTitle,
    displayLastName,
    showOnlineIndicator,
    appStyles
  } = props;

  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const renderItem = ({ item, index }) => {
    const isSeen =
      item.items && item.idx + 1 === item.items.length && styles.seenStyle;

    return (
      <StoryItem
        onPress={onStoryItemPress}
        item={{ ...item, lastName: displayLastName ? item.lastName : ' ' }}
        index={index}
        title={true}
        appStyles={appStyles}
        showOnlineIndicator={showOnlineIndicator && item.isOnline}
        imageContainerStyle={
          storyItemContainerStyle ? storyItemContainerStyle : isSeen
        }
      />
    );
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}>
      {displayUserItem && (
        <StoryItem
          onPress={(item, index, refIndex) =>
            onUserItemPress(userItemShouldOpenCamera, refIndex, index)
          }
          appStyles={appStyles}
          title={true}
          index={0}
          item={{ ...user, firstName: userStoryTitle, lastName: '' }}
        />
      )}

      <FlatList
        data={data}
        inverted={I18nManager.isRTL}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + ''}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}

TNStoriesTray.propTypes = {
  data: PropTypes.array,
  onStoryItemPress: PropTypes.func,
  onUserItemPress: PropTypes.func,
  displayUserItem: PropTypes.bool,
  userItemShouldOpenCamera: PropTypes.bool,
  storyItemContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

TNStoriesTray.defaultProps = {
  displayLastName: true,
};

export default TNStoriesTray;
