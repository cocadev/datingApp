import { createStackNavigator } from "react-navigation-stack";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { createSwitchNavigator } from 'react-navigation';
import { connect } from "react-redux";
import { IMEditProfileScreen, IMUserSettingsScreen, IMContactUsScreen } from '../Core/profile';
import { IMChatScreen } from '../Core/chat';
import ConversationsScreen from "../screens/ConversationsScreen/ConversationsScreen";
import LoadScreen from "../Core/onboarding/LoadScreen/LoadScreen";
import SwipeScreen from "../screens/SwipeScreen/SwipeScreen";
import MyProfileScreen from "../screens/MyProfileScreen/MyProfileScreen";
import AddProfilePictureScreen from "../screens/AddProfilePictureScreen";
import LoginScreen from "../Core/onboarding/LoginScreen/LoginScreen";
import SignupScreen from "../Core/onboarding/SignupScreen/SignupScreen";
import WelcomeScreen from "../Core/onboarding/WelcomeScreen/WelcomeScreen";
import WalkthroughScreen from "../Core/onboarding/WalkthroughScreen/WalkthroughScreen";
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen';
import DynamicAppStyles from "../DynamicAppStyles"
import DatingConfig from "../DatingConfig"

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const LoginStack = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Sms: { screen: SmsAuthenticationScreen }
  },
  {
    initialRouteName: "Welcome",
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: DatingConfig
    },
    headerMode: 'none',
  }
);

const MyProfileStack = createStackNavigator(
  {
    MyProfile: { screen: MyProfileScreen },
    AccountDetails: { screen: IMEditProfileScreen },
    Settings: { screen: IMUserSettingsScreen },
    Settings: { screen: IMUserSettingsScreen },
    ContactUs: { screen: IMContactUsScreen },
  },
  {
    initialRouteName: 'MyProfile',
    initialRouteParams: {
      appStyles: DynamicAppStyles
    },
    headerLayoutPreset: 'center'
  }
);

const ConversationsStack = createStackNavigator(
  {
    Conversations: { screen: ConversationsScreen },
    PersonalChat: { screen: IMChatScreen },
  },
  {
    initialRouteName: 'Conversations',
    initialRouteParams: {
      appStyles: DynamicAppStyles
    },
    headerLayoutPreset: 'center'
  }
);

const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};

const DrawerStack = createStackNavigator(
  {
    Swipe: { screen: SwipeScreen },
    Conversations: { screen: ConversationsStack, ...doNotShowHeaderOption },
    MyProfileStack: { screen: MyProfileStack, ...doNotShowHeaderOption },
    AddProfilePicture: { screen: AddProfilePictureScreen },
  },
  {
    initialRouteName: "Swipe",
    initialRouteParams: {
      appStyles: DynamicAppStyles,
    },
    mode: 'modal',
    headerMode: 'screen',
    headerLayoutPreset: 'center'
  }
);

// Manifest of possible screens
const RootNavigator = createSwitchNavigator(
  {
    LoadScreen: { screen: LoadScreen },
    Walkthrough: { screen: WalkthroughScreen },
    LoginStack: { screen: LoginStack },
    MainStack: { screen: DrawerStack }
  },
  {
    initialRouteName: "LoadScreen",
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: DatingConfig
    },
    cardStyle: {
      backgroundColor: DynamicAppStyles.colorSet.mainThemeBackgroundColor,
    }
  }
);

const AppContainer = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppContainer);

export { RootNavigator, AppNavigator, middleware };
