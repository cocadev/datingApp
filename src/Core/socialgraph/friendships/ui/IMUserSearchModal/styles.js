import { DynamicStyleSheet } from 'react-native-dark-mode';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    searchBarContainer: {
      width: '100%',
      paddingVertical: 5,
      ...ifIphoneX(
        {
          marginTop: 45,
        },
        {
          marginTop: 12,
        },
      ),
      borderBottomWidth: 0.5,
      borderBottomColor: appStyles.colorSet.hairlineColor,
    },
  })
};

export default dynamicStyles;
