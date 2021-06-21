import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from './screens/profile';
import MainScreen from './screens/main';
import TextEditScreen from './screens/textEditScreen';
import UploadPhotoScreen from './screens/uploadPhotoScreen';
import ShareLink from './screens/shareLink';
import HashTags from './screens/hashTags';
import MessagesScreen from './screens/messages';
import ChooseGifScreen from './screens/chooseGif';
import FollowScreen from './screens/followScreen';
import PreViewScreen from './screens/preViewScreen';
import EditScreen from './screens/editScreen';
import GifScreen from './screens/gifScreen';

const navigationOptions = () => ({header: null});

const HomeNavigator = createStackNavigator({
  Main: {screen: MainScreen, navigationOptions},
  Follow: {screen: FollowScreen, navigationOptions},
  Profile: {screen: ProfileScreen, navigationOptions},
  PreView: {screen: PreViewScreen, navigationOptions},
  TextEdit: {screen: TextEditScreen, navigationOptions},
  HashTags: {screen: HashTags, navigationOptions},
  Messages: {screen: MessagesScreen, navigationOptions},
  ChooseGif: {screen: ChooseGifScreen, navigationOptions},
  ShareLink: {screen: ShareLink, navigationOptions},
  UploadPhoto: {screen: UploadPhotoScreen, navigationOptions},
  EditScreen: {screen: EditScreen, navigationOptions},
  GifScreen: {screen: GifScreen, navigationOptions},
});

export const Routers = createAppContainer(
  createSwitchNavigator({
    Home: HomeNavigator,
  }),
);
