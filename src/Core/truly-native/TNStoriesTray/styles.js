import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    storiesContainer: {
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
      marginBottom: 5,
      flexDirection: 'row',
    },
    seenStyle: {
      borderColor: appStyles.colorSet.grey,
      borderWidth: 1,
    },
  })
};

export default dynamicStyles;
