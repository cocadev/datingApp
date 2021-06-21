import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, FlatList, ActivityIndicator } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import IMConversationView from '../IMConversationView';
import dynamicStyles from './styles';
import { IMLocalized } from '../../localization/IMLocalization';
import { TNEmptyStateView } from '../../truly-native';

function IMConversationList(props) {
  const {
    onConversationPress,
    emptyStateConfig,
    conversations,
    loading,
    appStyles
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const formatMessage = item => {
    if (item.lastMessage && item.lastMessage.mime && item.lastMessage.mime.startsWith('video')) {
      return IMLocalized('Someone sent a video.');
    } else if (
      item.lastMessage &&
      item.lastMessage.mime &&
      item.lastMessage.mime.startsWith('image')
    ) {
      return IMLocalized('Someone sent a photo.');
    } else if (item.lastMessage) {
      return item.lastMessage;
    }
    return '';
  };

  const renderConversationView = ({ item }) => (
    <IMConversationView
      formatMessage={formatMessage}
      onChatItemPress={onConversationPress}
      item={item}
      appStyles={appStyles}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.chatsChannelContainer}>
          {conversations && conversations.length > 0 && (
            <FlatList
              vertical={true}
              showsVerticalScrollIndicator={false}
              data={conversations}
              renderItem={renderConversationView}
              keyExtractor={item => `${item.id}`}
            />
          )}
          {conversations && conversations.length <= 0 && (
            <View style={styles.emptyViewContainer}>
              <TNEmptyStateView
                emptyStateConfig={emptyStateConfig}
                appStyles={appStyles}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

IMConversationList.propTypes = {
  onConversationPress: PropTypes.func,
  conversations: PropTypes.array,
};

export default IMConversationList;
