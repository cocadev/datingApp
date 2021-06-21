import { DynamicStyleSheet } from 'react-native-dark-mode';
import { ifIphoneX } from "react-native-iphone-x-helper";

const dynamicStyles = (appStyles) => {
  return new DynamicStyleSheet({
    tabBarContainer: {
      ...ifIphoneX(
        {
          height: 80
        },
        {
          height: 45
        }
      ),
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
      flexDirection: 'row',
      borderTopWidth: 0.5,
      borderTopColor: appStyles.colorSet.hairlineColor,
    },
    tabContainer: {
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabIcon: {
      ...ifIphoneX(
        {
          width: 25,
          height: 25
        },
        {
          width: 22,
          height: 22
        }
      )
    },
    focusTintColor: {
      tintColor: appStyles.colorSet.mainThemeForegroundColor,
    },
    unFocusTintColor: {
      tintColor: appStyles.colorSet.bottomTintColor,
    },
  })
};

export default dynamicStyles;
