import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet.whiteSmoke,
      margin: 8,
      paddingLeft: 8,
      borderRadius: 12,
      height: 37,
    },
    searchIcon: {
      height: 15,
      width: 15,
      tintColor: appStyles.colorSet.grey,
      marginRight: 1,
    },
    searchInput: {
      padding: 4,
      paddingLeft: 4,
      fontSize: 15,
      color: appStyles.colorSet.grey,
      backgroundColor: appStyles.colorSet.whiteSmoke,
    },
  })
};

export default dynamicStyles;
