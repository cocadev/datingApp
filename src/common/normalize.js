import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // based on iphone 5s's scale

export const ratio = height / SCREEN_WIDTH;

export function p(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
