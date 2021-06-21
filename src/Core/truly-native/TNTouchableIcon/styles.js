import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    headerButtonContainer: {
      padding: 10,
    },
    Image: {
      width: 25,
      height: 25,
      margin: 6,
    },
    title: {
      color: appStyles.colorSet.mainTextColor,
      fontSize: 12,
    },
  })
};

export default dynamicStyles;
