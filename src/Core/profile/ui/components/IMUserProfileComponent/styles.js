import { Dimensions } from 'react-native';
import { DynamicStyleSheet } from 'react-native-dark-mode';

const { height } = Dimensions.get('window');
const imageSize = height * 0.14;

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    buttonContainer: {
      height: 53,
      width: '98%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      marginTop: 50,
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 15,
      backgroundColor: appStyles.colorSet.grey0,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeIcon: {
      width: 27,
      height: 27,
    },
    userName: {
      marginTop: 5,
      color: appStyles.colorSet.mainTextColor,
      fontSize: 17,
      marginBottom: 40,
    },
    logout: {
      width: '90%',
      borderWidth: 1,
      color: appStyles.colorSet.mainTextColor,
      fontSize: 15,
      paddingVertical: 10,
      borderColor: appStyles.colorSet.grey3,
      borderRadius: 5,
      textAlign: 'center',
    }
  })
};

export default dynamicStyles;
