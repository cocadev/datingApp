/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/header';
import {colors} from '../common/colors';
import {p} from '../common/normalize';
import NotificationItem from '../components/notificationItem';
import {NOTIFICATIONS} from '../common/fakeDB';
import {MoreIcon} from '../components/Icons';
import {width} from '../common/config';

export default class Notifications extends Component {
  render() {
    return (
      <View style={{position: 'relative', flex: 1, width}}>
        <Header
          title="Notifications"
          dark
          rightElement={<MoreIcon color={colors.LIGHTRED} />}
        />
        <ScrollView style={{flex: 1, marginTop: 70}}>
          <Text style={styles.title}>NEW</Text>
          {NOTIFICATIONS.map((item, index) => (
            <NotificationItem item={item} key={index} notify />
          ))}

          <Text style={styles.title}>VIEWED UPDATES</Text>
          {NOTIFICATIONS.map((item, index) => (
            <NotificationItem item={item} key={index} notify />
          ))}

          <View style={{height: 160}} />
        </ScrollView>
        <LinearGradient
          style={styles.row}
          colors={['transparent', colors.DARKY]}
          start={{x: 1, y: 0.7}}
          end={{x: 1, y: 0}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.PURPLE,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
    marginLeft: p(27),
    marginVertical: p(12),
  },
  row: {
    position: 'absolute',
    top: 0,
    width,
    height: p(100),
  },
});
