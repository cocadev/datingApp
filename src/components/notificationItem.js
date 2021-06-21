/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {p} from '../common/normalize';
import {colors} from '../common/colors';

export default class NotificationItem extends Component {
  render() {
    const {item, onRespect, notify, follow} = this.props;
    return (
      <View style={styles.card}>
        <View>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          {item.online && <View style={styles.green} />}
        </View>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.cardContent}>
              <Text style={styles.text1}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: colors.DARK,
                    fontSize: 16,
                    lineHeight: 18,
                  }}>
                  {item.name}{' '}
                </Text>
                {notify && 'liked your post'}
              </Text>
              <Text style={[styles.text1, !follow && {fontSize: 12}]}>
                {item.time}
              </Text>
            </View>
            {follow && (
              <TouchableOpacity
                style={[
                  styles.round,
                  !item.resepect && {
                    backgroundColor: colors.WHITE,
                    borderWidth: 1,
                  },
                ]}
                onPress={onRespect}>
                <Text
                  style={[
                    styles.respectText,
                    !item.resepect && {color: colors.GREY9},
                  ]}>
                  {item.resepect ? 'Salute' : 'Unsalute'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {item.images && item.images.length > 0 && (
            <View style={{flexDirection: 'row', marginTop: p(10)}}>
              {item.images &&
                item.images.map((x, index) => (
                  <Image key={index} source={{uri: x}} style={styles.photo2} />
                ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: p(27),
    marginBottom: p(4),
    paddingBottom: p(10),
  },
  content: {
    justifyContent: 'space-between',
    flex: 1,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginLeft: p(15),
    paddingBottom: p(15),
    paddingTop: p(10),
  },
  cardContent: {
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.GREY5,
  },
  text1: {
    color: colors.GREY5,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  green: {
    position: 'absolute',
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 7,
    backgroundColor: colors.GREEN,
    borderWidth: 2,
    borderColor: colors.WHITE,
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 79,
    height: 27,
    borderRadius: 20,
    backgroundColor: colors.SKY,
    borderColor: colors.GREY8,
    borderWidth: 0,
  },
  respectText: {
    color: colors.WHITE,
    fontSize: 13,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  photo: {
    width: 40,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.GREY5,
  },
  photo2: {
    width: 36,
    height: 30,
    marginRight: p(10),
    borderRadius: 10,
    backgroundColor: colors.GREY5,
  },
});
