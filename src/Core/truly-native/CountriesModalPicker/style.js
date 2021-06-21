import { Dimensions } from 'react-native';
import { DynamicStyleSheet } from 'react-native-dark-mode';

const { height, width } = Dimensions.get('window');

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const OPTION_CONTAINER_HEIGHT = 400;

const dynamicStyles = (appStyles) => { 
  return new DynamicStyleSheet({
    overlayStyle: {
      width,
      height,
      backgroundColor: '#000000bb',
    },

    optionContainer: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.8,
      height: OPTION_CONTAINER_HEIGHT,
      backgroundColor: appStyles.colorSet.grey0,
      left: width * 0.1,
      top: (height - OPTION_CONTAINER_HEIGHT) / 2,
    },

    cancelContainer: {
      left: width * 0.1,
      top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10,
    },

    cancelStyle: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.8,
      backgroundColor: appStyles.colorSet.grey0,
      padding: PADDING,
    },

    cancelTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
      color: appStyles.colorSet.grey9,
    },

    optionStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: PADDING,
      borderBottomWidth: 1,
      borderBottomColor: appStyles.colorSet.grey3,
    },

    optionTextStyle: {
      color: appStyles.colorSet.mainTextColor,
      fontSize: 14,
    },

    sectionStyle: {
      padding: PADDING * 2,
      borderBottomWidth: 1,
      borderBottomColor: appStyles.colorSet.grey9,
    },

    sectionTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
    },
  });
};

export default dynamicStyles;
