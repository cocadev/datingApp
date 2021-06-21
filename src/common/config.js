import {Dimensions, Platform, StatusBar} from 'react-native';
import {colors} from './colors';
import {images} from './images';

export const COLORSYSTEM = [
  colors.WHITE,
  colors.DARK,
  colors.GREY1,
  colors.GREY2,
  colors.LIGHTGREY,
  colors.LIGHTDARK,
  colors.PURPLE,
  colors.SKY,
  colors.LIGHTBLUE,
  colors.LIGHTGREEN,
  colors.LIGHTYELLOW,
  colors.LIGHTORANGE,
  colors.RED,
  colors.PINK,
  colors.DARKGREEN,
  colors.LIGHTSKY,
];

export const {width, height} = Dimensions.get('window');
export const SYMBOLTEXTS = [
  'BlackOpsOne-Regular',
  'Poppins-Bold',
  'Rye-Regular',
  'Poppins-Light',
];

export const PICKER_OPTIONS = {
  title: 'Select Image',
  customButtons: [
    {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

let isIPhoneX = false;

if (Platform.OS === 'ios') {
  isIPhoneX =
    (width === X_WIDTH && height === X_HEIGHT) ||
    (width === XSMAX_WIDTH && height === XSMAX_HEIGHT);
}

export function getStatusBarHeight(skipAndroid = false) {
  return Platform.select({
    ios: isIPhoneX ? 44 : 20,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

export const MODALIST = [
  {name: 'Text', img: images.text, goto: 'EditScreen', index: 0},
  {name: 'Link', img: images.www, goto: 'EditScreen', index: 1},
  {name: 'Image', img: images.image, goto: 'EditScreen', index: 2},
  {name: 'Gif', img: images.gif, goto: 'EditScreen', index: 3},
];

export const BUGSEE_IOS_TOKEN = '4a567584-d330-4027-9ce3-0d7cd956a9b4';
export const BUGSEE_ANDROID_TOKEN = '06227189-b7fb-4522-8856-a9163b8abd22';
export const TENOR_API_URL = 'https://api.tenor.com/v1/';
export const TENOR_API_KEY = 'LIVDSRZULELA';
