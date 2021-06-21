import { DynamicValue } from 'react-native-dark-mode';
import invert from 'invert-color';

const TNColor = hexStringColor => {
  return new DynamicValue(hexStringColor, invert(hexStringColor));
};
export default TNColor;
