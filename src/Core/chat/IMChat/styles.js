import { DynamicStyleSheet } from 'react-native-dark-mode';
import { size } from '../../helpers/devices';

const dynamicStyles = (appStyles) => {
  const chatBackgroundColor = appStyles.colorSet.mainThemeBackgroundColor;

  return new DynamicStyleSheet({
    personalChatContainer: {
      backgroundColor: chatBackgroundColor,
      flex: 1,
    },
    //Bottom Input
    inputBar: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: appStyles.colorSet.hairlineColor,
      flexDirection: 'row',
    },
    progressBar: {
      backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
      height: 3,
      shadowColor: '#000',
      width: 0,
    },
    inputIconContainer: {
      margin: 10,
    },
    inputIcon: {
      tintColor: appStyles.colorSet.mainThemeForegroundColor,
      width: 25,
      height: 25,
    },
    input: {
      margin: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      backgroundColor: appStyles.colorSet.whiteSmoke,
      fontSize: 16,
      borderRadius: 20,
      color: appStyles.colorSet.mainTextColor,
    },
    // Message Thread
    messageThreadContainer: {
      margin: 6,
    },
    // Thread Item
    sendItemContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 10,
    },
    itemContent: {
      padding: 10,
      backgroundColor: appStyles.colorSet.hairlineColor,
      borderRadius: 10,
      maxWidth: '80%',
    },
    sendItemContent: {
      marginRight: 9,
      backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
    },
    mediaMessage: {
      width: size(300),
      height: size(250),
      borderRadius: 10,
    },
    boederImgSend: {
      position: 'absolute',
      width: size(300),
      height: size(250),
      resizeMode: 'stretch',
      tintColor: chatBackgroundColor,
    },
    textBoederImgSend: {
      position: 'absolute',
      right: -5,
      bottom: 0,
      width: 20,
      height: 8,
      resizeMode: 'stretch',
      tintColor: appStyles.colorSet.mainThemeForegroundColor,
    },
    sendTextMessage: {
      fontSize: 16,
      color: appStyles.colorSet.mainThemeBackgroundColor,
    },
    userIcon: {
      width: 34,
      height: 34,
      borderRadius: 17,
    },
    receiveItemContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 10,
    },
    receiveItemContent: {
      marginLeft: 9,
    },
    boederImgReceive: {
      position: 'absolute',
      width: size(300),
      height: size(250),
      resizeMode: 'stretch',
      tintColor: chatBackgroundColor,
    },
    receiveTextMessage: {
      color: appStyles.colorSet.mainTextColor,
      fontSize: 16,
    },
    textBoederImgReceive: {
      position: 'absolute',
      left: -5,
      bottom: 0,
      width: 20,
      height: 8,
      resizeMode: 'stretch',
      tintColor: appStyles.colorSet.hairlineColor,
    },
    mediaVideoLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButton: {
      position: 'absolute',
      top: '40%',
      alignSelf: 'center',
      width: 38,
      height: 38,
      backgroundColor: 'transparent',
    }
  })
};

export default dynamicStyles;
