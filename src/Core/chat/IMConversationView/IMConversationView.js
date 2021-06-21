import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import IMConversationIconView from './IMConversationIconView/IMConversationIconView';
import { timeFormat } from '../..';
import dynamicStyles from './styles';

function IMConversationView(props) {
  const { onChatItemPress, formatMessage, item, appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  let title = item.name;
  if (!title) {
    if (item.participants.length > 0) {
      let friend = item.participants[0];
      title = friend.firstName + ' ' + friend.lastName;
    }
  }
  return (
    <TouchableOpacity
      onPress={() => onChatItemPress(item)}
      style={styles.chatItemContainer}>
      <IMConversationIconView
        participants={item.participants}
        appStyles={appStyles} />
      <View style={styles.chatItemContent}>
        <Text style={styles.chatFriendName}>{title}</Text>
        <View style={styles.content}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={styles.message}>
            {formatMessage(item)} {' · '}
            {timeFormat(item.lastMessageDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

IMConversationView.propTypes = {
  formatMessage: PropTypes.func,
  item: PropTypes.object,
  onChatItemPress: PropTypes.func,
};

export default IMConversationView;
