import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../common/theme';
import Header from '../components/header';
import {colors} from '../common/colors';
import {p} from '../common/normalize';
import {MoreIcon} from '../components/Icons';
import {width} from '../common/config';

export default class Invites extends Component {
  render() {
    return (
      <View style={theme.container}>
        <Header
          title="Invite"
          rightElement={<MoreIcon color={colors.PURPLE} />}
          dark
        />
        <ScrollView style={{flex: 1, paddingTop: 70}}>
          <View style={styles.card}>
            <Text style={styles.text1}>
              You’re a Prowdly Native, help us build a solid foundation
            </Text>
            <Text style={styles.text2}>
              QUALITY <Text style={{color: colors.GREY8}}>over</Text> QUANTITY
            </Text>
            <Text style={styles.text3}>
              Our focus is healthy organic growth…
            </Text>
            <Text style={styles.text2}>Join the Tribe!</Text>
          </View>

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
  card: {
    marginTop: p(20),
    padding: p(18),
    paddingTop: p(25),
    backgroundColor: colors.WHITE,
    marginHorizontal: p(19),
    borderRadius: p(10),
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#bbb',
    shadowOpacity: 1,
    elevation: 3,
  },
  text1: {
    color: colors.DARK,
    fontSize: p(18),
    lineHeight: p(23),
    fontFamily: 'Poppins-Bold',
  },
  text2: {
    color: colors.GREY9,
    fontSize: p(16),
    lineHeight: p(24),
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    marginVertical: p(23),
  },
  text3: {
    color: colors.DARK,
    fontSize: p(15),
    lineHeight: p(23),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  row: {
    position: 'absolute',
    top: 0,
    width,
    height: p(100),
  },
});
