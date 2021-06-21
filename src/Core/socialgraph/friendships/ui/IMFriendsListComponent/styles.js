import {DynamicStyleSheet} from 'react-native-dark-mode';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    emptyViewContainer: {
      marginTop: height / 5
    }
  })
};

export default dynamicStyles;
