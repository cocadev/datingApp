/* eslint-disable react/jsx-props-no-spreading */
import React, {Component} from 'react';
import Bugsee from 'react-native-bugsee';
import {Platform, YellowBox, View, StyleSheet} from 'react-native';
import {Routers} from './src/routers';
import {BUGSEE_IOS_TOKEN, BUGSEE_ANDROID_TOKEN} from './src/common/config';
import {MyStatusBar} from './src/components/MyStatusBar';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
]);

export default class App extends Component {
  static async launchBugsee() {
    let appToken;
    let bugseeOptions;
    if (Platform.OS === 'ios') {
      appToken = BUGSEE_IOS_TOKEN;
      bugseeOptions = new Bugsee.IOSLaunchOptions();
      bugseeOptions.shakeToReport = true;
      bugseeOptions.reportPrioritySelector = true;
    } else {
      appToken = BUGSEE_ANDROID_TOKEN;
      bugseeOptions = new Bugsee.AndroidLaunchOptions();
      bugseeOptions.shakeToTrigger = true;
      bugseeOptions.notificationBarTrigger = true;
    }
    await Bugsee.launch(appToken, bugseeOptions);
  }

  constructor(props) {
    super(props);

    App.launchBugsee();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {Platform.OS === 'android' && (
          <MyStatusBar backgroundColor="black" barStyle="light-content" />
        )} */}
        <Routers />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
