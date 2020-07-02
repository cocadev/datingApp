import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10,
    },
    chatItemContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    chatItemContent: {
      flex: 1,
      alignSelf: 'center',
      marginLeft: 10,
    },
    chatFriendName: {
      color: appStyles.colorSet.mainTextColor,
      fontSize: 17,
      fontWeight: '500'
    },
    content: {
      flexDirection: 'row',
      marginTop: 5
    },
    message: {
      flex: 2,
      color: appStyles.colorSet.mainSubtextColor,
    },
  })
};

export default dynamicStyles;
