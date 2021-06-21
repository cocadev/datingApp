import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../common/colors';

export function OverviewCard(props) {
  const {item, navigation} = props;
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={[styles.cardItem, {borderLeftWidth: 0}]}>
          <Text style={styles.title}>{item.user.posts}</Text>
          <Text style={styles.lightText}>Posts</Text>
        </View>
        <TouchableOpacity
          style={styles.cardItem}
          onPress={() => navigation.navigate('Follow', {follow: true})}>
          <Text style={styles.title}>{item.user.followers}</Text>
          <Text style={styles.lightText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardItem}
          onPress={() => navigation.navigate('Follow', {follow: false})}>
          <Text style={styles.title}>{item.user.following}</Text>
          <Text style={styles.lightText}>Following</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sloganText}>{item.user.slogan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 25,
    paddingTop: 26,
    backgroundColor: colors.WHITE,
    marginHorizontal: 23,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowOpacity: 1,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: colors.DARKY15,
    borderLeftWidth: 1,
  },
  sloganText: {
    marginTop: 22,
    lineHeight: 24,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: colors.DARKGREY,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 23,
  },
  lightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: colors.GREY5,
  },
});
