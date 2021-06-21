import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {p} from '../../common/normalize';
import {colors} from '../../common/colors';
import UtilService from '../../common/utils';

export function TextCard(props) {
  const {item, profile} = props;
  if (item.text) {
    return (
      <View
        style={[
          styles.notice,
          {backgroundColor: UtilService.acceptColor(item)},
          profile && {width: p(282)},
        ]}>
        <Text
          style={[
            styles.noticeText,
            profile && {fontSize: 24, lineHeight: 28},
          ]}>
          {item.text.content}
        </Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  noticeText: {
    color: colors.WHITE,
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 3,
  },
  notice: {
    width: p(310),
    marginTop: 15,
    paddingVertical: p(30),
    paddingHorizontal: 18,
    marginLeft: 14,
    borderRadius: p(20),
  },
});
