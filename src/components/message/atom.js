import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {p} from '../../common/normalize';
import {colors} from '../../common/colors';
import UtilService from '../../common/utils';
import {Me} from '../../common/fakeDB';

export function Atom(props) {
  const {item} = props;
  return (
    <View
      style={{
        flexDirection: 'column',
        marginHorizontal: p(12),
        marginTop: p(8),
        alignItems: item.username === Me.username ? 'flex-end' : 'flex-start',
        flex: 1,
      }}>
      <View
        style={{flexDirection: 'row', marginTop: 2, alignItems: 'flex-start'}}>
        {item.username !== Me.username && (
          <Image source={{uri: item.avatar}} style={styles.avatar} />
        )}

        <View style={styles.nameView}>
          {item.username !== Me.username && (
            <Text style={styles.nameText}>{item.username}</Text>
          )}

          <View
            style={[
              {flexDirection: 'row', alignItems: 'flex-end', marginLeft: 5},
              item.username === Me.username && {flexDirection: 'row-reverse'},
            ]}>
            <View
              style={[
                styles.contentbox,
                item.username === Me.username
                  ? {borderTopRightRadius: 0, backgroundColor: colors.PURPLE}
                  : {borderTopLeftRadius: 0},
              ]}>
              {!item.image && (
                <Text
                  uppercase={false}
                  style={[
                    styles.itemText,
                    item.username === Me.username && {color: colors.WHITE},
                  ]}>
                  {item.text}
                </Text>
              )}
              {item.image && (
                <Image source={{uri: item.image}} style={styles.image} />
              )}
            </View>
            <Text style={styles.timeText}>
              {UtilService.getHourMinutes(item.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: p(50),
    height: p(50),
    borderRadius: p(25),
    borderColor: '#fff',
    borderWidth: 2,
    zIndex: 10,
    backgroundColor: colors.LIGHTGREY,
  },
  contentbox: {
    backgroundColor: colors.GREY0,
    borderRadius: 6,
  },
  itemText: {
    maxWidth: p(250),
    padding: p(9),
    fontSize: p(13),
    color: 'black',
    fontFamily: 'Poppins-Light',
  },
  timeText: {
    fontSize: p(11),
    color: colors.LIGHTGREY,
    marginHorizontal: p(3),
    fontFamily: 'Poppins-Light',
  },
  nameText: {
    paddingHorizontal: p(5),
    color: '#7f8083',
    fontSize: p(12),
    fontFamily: 'Poppins-Medium',
  },
  image: {
    width: p(120),
    height: p(120),
    backgroundColor: colors.LIGHTGREY,
  },
});
