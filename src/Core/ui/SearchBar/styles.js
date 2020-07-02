import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      // width: Platform.OS === 'ios' ? '120%' : '100%',
      width: '95%',
      alignSelf: 'center',
      marginBottom: 4,
    },
    cancelButtonText: {
      color: appStyles.colorSet.mainThemeForegroundColor,
      fontSize: 16,
      marginBottom: 5,
    },
    searchInput: {
      fontSize: 16,
      color: appStyles.colorSet.mainTextColor,
      backgroundColor: appStyles.colorSet.whiteSmoke,
    },
  })
};

export default dynamicStyles;
