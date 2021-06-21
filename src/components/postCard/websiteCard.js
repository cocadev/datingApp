import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {p, ratio} from '../../common/normalize';
import {colors} from '../../common/colors';

export function WebsiteCard(props) {
  const {item, profile} = props;
  if (item.website && item.website.title) {
    return (
      <View style={[styles.website, profile && {marginLeft: 15}]}>
        <View style={styles.imageContainerIOS}>
          <Image source={{uri: item.website.image}} style={styles.webImg} />
        </View>
        <View style={{padding: p(11)}}>
          <Text style={styles.webTitle}>{item.website.title}</Text>
          <Text style={styles.webContent}>{item.website.content}</Text>
          <Text style={styles.webUrl}>{item.website.url}</Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  website: {
    width: p(274),
    marginTop: p(18),
    marginLeft: 30,
    padding: p(6),
    borderWidth: 1,
    borderColor: colors.GREY0,
    borderRadius: 10,
    borderTopRightRadius: 0,
    backgroundColor: colors.WHITE,
  },
  webImg: {
    width: '100%',
    height: ratio > 2 ? p(175) : p(140),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
  webTitle: {
    color: colors.DARKBLUE,
    fontSize: p(18),
    lineHeight: p(27),
    fontFamily: 'Poppins-Bold',
    marginTop: p(3),
  },
  webContent: {
    color: colors.LIGHTDARK,
    fontSize: p(14),
    lineHeight: p(20),
    fontFamily: 'Poppins-Light',
    marginVertical: 2,
  },
  webUrl: {
    color: colors.PURPLE,
    fontSize: p(14),
    lineHeight: p(21),
    fontFamily: 'Poppins-Light',
    marginLeft: 6,
    marginTop: p(5),
  },
  imageContainerIOS: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
});
