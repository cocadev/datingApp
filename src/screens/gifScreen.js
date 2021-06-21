/* eslint-disable dot-notation */
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {theme} from '../common/theme';
import Header from '../components/header';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {PreViewIcon, BackIcon} from '../components/Icons';

export default class GifScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={theme.container}>
        <Header
          title="Choose a Gif"
          dark
          navigation={navigation}
          leftElement={<BackIcon navigation={navigation} />}
          rightElement={
            <PreViewIcon navigation={navigation} onPrev={() => this.onPrev()} />
          }
        />

        <View style={styles.editView}>
          <Text>Comming Soon from Native!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  input: {
    width: p(220),
    borderBottomColor: colors.DARKGREY,
    borderBottomWidth: 1,
    fontSize: p(20),
    lineHeight: p(25),
    fontFamily: 'Poppins-Regular',
    color: colors.GREY9,
  },
});
