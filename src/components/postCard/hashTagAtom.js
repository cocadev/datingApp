/* eslint-disable react/no-array-index-key */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {p} from '../../common/normalize';
import {colors} from '../../common/colors';

export function HashTagAtom(props) {
  const {item} = props;
  return (
    <View style={styles.tagBar}>
      <View style={styles.total}>
        {item.hashtag &&
          item.hashtag.map((hash, index) => (
            <View key={index} style={styles.tagView}>
              <Text style={styles.tagText}>{hash}</Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagBar: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 130,
  },
  tagText: {
    color: colors.WHITE,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  tagView: {
    backgroundColor: 'rgba(0,0,0,0.17)',
    borderRadius: 100,
    padding: 3,
    paddingHorizontal: 12,
    marginHorizontal: 2.2,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  total: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginTop: 12,
    flexWrap: 'wrap',
    width: p(277),
  },
});
