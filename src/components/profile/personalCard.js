import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {p} from '../../common/normalize';
import {colors} from '../../common/colors';

export function PersonalCard(props) {
  const {item} = props;
  return (
    <View style={styles.card}>
      <Image
        source={{uri: item.user.cateogry.image}}
        style={styles.cateogryImg}
      />
      <View style={{marginLeft: p(12), flex: 1}}>
        <Text style={styles.theText}>The</Text>
        <Text style={styles.cateogryTitle}>{item.user.cateogry.slug}</Text>
        <Text style={styles.webContent}>{item.user.cateogry.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: p(7),
    padding: 15,
    paddingTop: p(25),
    backgroundColor: colors.WHITE,
    marginHorizontal: 23,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowOpacity: 1,
    elevation: 3,
  },
  cateogryImg: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: colors.GREYA,
  },
  theText: {
    color: colors.GREYA,
    fontSize: 14,
    lineHeight: 15,
    fontFamily: 'Poppins-Regular',
  },
  cateogryTitle: {
    fontSize: 24,
    lineHeight: 27,
    fontFamily: 'Poppins-Bold',
  },
  webContent: {
    color: colors.GREY9,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Poppins-Light',
  },
});
