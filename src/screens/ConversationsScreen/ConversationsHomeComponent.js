import React from 'react';
import { ScrollView, View } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { TNStoriesTray } from '../../Core/truly-native';
import { IMConversationListView } from '../../Core/chat';
import dynamicStyles from './styles';

function ConversationsHomeComponent(props) {
  const {
    matches,
    onMatchUserItemPress,
    navigation,
    appStyles,
    emptyStateConfig
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <TNStoriesTray
          onStoryItemPress={onMatchUserItemPress}
          storyItemContainerStyle={styles.userImageContainer}
          data={matches}
          displayLastName={false}
          appStyles={appStyles}
          showOnlineIndicator={true}
        />
        <View style={styles.chatsChannelContainer}>
          <IMConversationListView
            navigation={navigation}
            appStyles={appStyles}
            emptyStateConfig={emptyStateConfig}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ConversationsHomeComponent;
