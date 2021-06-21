import { DynamicStyleSheet } from 'react-native-dark-mode';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

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
            padding: 0,
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
        },
        content: {
            flexDirection: 'row',
        },
        message: {
            flex: 2,
            color: appStyles.colorSet.mainSubtextColor,
        },
        emptyViewContainer: {
            marginTop: height / 5
        }
    })
};

export default dynamicStyles;