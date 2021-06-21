import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {p, ratio} from '../common/normalize';
import {colors} from '../common/colors';

export default class Header extends Component {
  render() {
    const {title, leftElement, rightElement, dark, profile} = this.props;
    return (
      <View
        style={[styles.container, profile && {backgroundColor: colors.PURPLE}]}>
        <View style={styles.icon}>{leftElement}</View>
        <Text style={[styles.text, dark && {color: colors.DARK}]}>{title}</Text>
        <View style={[styles.icon, {alignItems: 'flex-end'}]}>
          {rightElement}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 82,
    width: '100%',
    zIndex: 100,
    alignItems: 'center',
    paddingTop: ratio > 2 ? 50 : 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Poppins-Medium',
    color: colors.WHITE,
    marginTop: 5,
  },
  icon: {
    width: p(36),
  },
});
