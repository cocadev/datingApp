import { combineReducers } from "redux";
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { RootNavigator } from "../navigations/AppNavigation";
import { auth } from '../Core/onboarding/redux/auth';
import { chat } from '../Core/chat/redux';
import { userReports } from '../Core/user-reporting/redux';
import { dating } from './reducers';

const navReducer = createNavigationReducer(RootNavigator);

const AppReducer = combineReducers({
  nav: navReducer,
  auth,
  userReports,
  chat,
  dating
});

export default AppReducer;
