import {DynamicStyleSheet} from 'react-native-dark-mode';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    itemContainer: {
      // padding: 10,
      // alignItems: 'center',
      // flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    chatIconContainer: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addFlexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      bottom: 0,
      left: 70,
      right: 0,
      position: 'absolute',
      height: 0.5,
      backgroundColor: appStyles.colorSet.hairlineColor,
    },
    photo: {
      height: 40,
      borderRadius: 20,
      width: 40,
    },
    name: {
      marginLeft: 20,
      alignSelf: 'center',
      flex: 1,
      color: appStyles.colorSet.mainTextColor,
    },
    chatItemIcon: {
      height: 70,
      // borderRadius: 45,
      width: 70,
    },
    checkContainer: {},
    checked: {
      width: 18,
      height: 18,
    },
    emptyViewContainer: {
      marginTop: height / 6
    }
  })
};

export default dynamicStyles;
