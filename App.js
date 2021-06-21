import React, { useEffect, useState } from 'react';

import { AppRegistry } from 'react-native';
import SplashScreen from "react-native-splash-screen";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import * as RNLocalize from 'react-native-localize';
import { initialMode, eventEmitter } from 'react-native-dark-mode';
import { setI18nConfig } from './src/Core/localization/IMLocalization';
import { AppNavigator, middleware } from "./src/navigations/AppNavigation";
import AppReducer from "./src/redux";

const store = createStore(AppReducer, applyMiddleware(thunk, middleware));

const useForceUpdate = () => useState()[1];

const App = props => {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    SplashScreen.hide();
    console.disableYellowBox = true;
    setI18nConfig();
    RNLocalize.addEventListener('change', handleLocalizationChange);
    eventEmitter.on('currentModeChanged', mode => {
      setMode(mode);
    });
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig();
    useForceUpdate();
  };

  return (
    <Provider store={store}>
      <AppNavigator screenProps={{ theme: mode }} />
    </Provider>
  );
};

App.propTypes = {};

App.defaultProps = {};

AppRegistry.registerComponent('App', () => App);

export default App;
