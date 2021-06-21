import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {theme} from '../common/theme';
import Header from '../components/header';
import {colors} from '../common/colors';
import NotificationItem from '../components/notificationItem';
import {FOLLOWING, FOLLOWER} from '../common/fakeDB';
import {MoreIcon, CloseIcon} from '../components/Icons';
import {MyStatusBar} from '../components/MyStatusBar';

export default class FollowScreen extends Component {
  render() {
    const {navigation} = this.props;
    const {follow} = navigation.state.params;

    return (
      <View style={theme.container}>
        <MyStatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
        <Header
          title={follow ? "I'm Respected by" : "I've Saluted"}
          dark
          navigation={navigation}
          leftElement={<CloseIcon navigation={navigation} />}
          rightElement={<MoreIcon color={colors.LIGHTRED} />}
        />
        <ScrollView style={{marginTop: 80}}>
          {!follow &&
            FOLLOWER.map((item, index) => (
              <NotificationItem item={item} key={index} follow />
            ))}
          {follow &&
            FOLLOWING.map((item, index) => (
              <NotificationItem item={item} key={index} follow />
            ))}
        </ScrollView>
      </View>
    );
  }
}
