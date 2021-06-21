import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    friendItemContainer: {
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    chatIconContainer: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    photo: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    name: {
      padding: 10,
      alignSelf: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: appStyles.colorSet.mainTextColor,
    },
    addFlexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      width: 82,
      height: 26,
      justifyContent: 'center',
      borderRadius: 12,
      backgroundColor: appStyles.colorSet.whiteSmoke,
      marginRight: 25,
    },
    divider: {
      bottom: 0,
      left: 80,
      right: 10,
      position: 'absolute',
      height: 0.5,
      backgroundColor: appStyles.colorSet.hairlineColor,
    },
  })
};

export default dynamicStyles;
