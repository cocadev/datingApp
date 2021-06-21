import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { IMConversationIconView } from '../../../../chat';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import { FriendshipConstants } from '../..';

function IMFriendItem(props) {
  const {
    item,
    index,
    onFriendAction,
    onFriendItemPress,
    displayActions,
    appStyles
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const user = item.user;
  let actionTitle = FriendshipConstants.localizedActionTitle(item.type);

  var name = "No name";
  if (user.firstName && user.lastName) {
    name = user.firstName + ' ' + user.lastName;
  } else if (user.fullname) {
    name = user.fullname;
  } else if (user.firstName) {
    name = user.firstName;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onFriendItemPress(item)}
      style={styles.friendItemContainer}>
      <View style={styles.chatIconContainer}>
        <IMConversationIconView
          style={styles.photo}
          imageStyle={styles.photo}
          participants={[user]}
          appStyles={appStyles}
        />
        {name && (<Text style={styles.name}>{name}</Text>)}
      </View>
      {displayActions && actionTitle && (
        <View style={styles.addFlexContainer}>
          <TouchableOpacity
            onPress={() => onFriendAction(item, index)}
            style={[styles.addButton]}>
            <Text style={[styles.name, { padding: 0 }]}>{actionTitle}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.divider} />
    </TouchableOpacity>
  );
}

IMFriendItem.propTypes = {
  onFriendAction: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  item: PropTypes.object,
  index: PropTypes.number,
};

IMFriendItem.defaultProps = {
  displayActions: true,
};

export default IMFriendItem;
