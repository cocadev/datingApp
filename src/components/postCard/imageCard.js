import React from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {p, ratio} from '../../common/normalize';
import {colors} from '../../common/colors';

export function ImageCard(props) {
  const {item, profile} = props;
  if (item.image && item.image.length > 1) {
    return (
      <View style={{marginTop: 22, marginLeft: profile ? 15 : 30}}>
        <Image
          source={{uri: item.image[0]}}
          style={[styles.photo, {height: ratio > 2 ? p(197) : p(130)}]}
        />
        <View style={{flexDirection: 'row', marginTop: 7}}>
          <View style={{marginRight: 0}}>
            <Image
              source={{uri: item.image[1]}}
              style={[styles.photo, {width: p(167)}]}
            />
          </View>
          {item.image[2] && (
            <View style={{marginLeft: 7}}>
              <Image source={{uri: item.image[2]}} style={styles.photo2} />
              {item.image[3] && (
                <Image source={{uri: item.image[3]}} style={styles.photo2} />
              )}
            </View>
          )}
        </View>
      </View>
    );
  } else if (item.image && item.image.length === 1) {
    return (
      <Image
        source={{uri: item.image[0]}}
        style={[
          styles.bigPhoto,
          profile && {
            marginLeft: profile ? 15 : 30,
            width: p(280),
            borderRadius: 20,
            height: 240,
            overlayColor: colors.WHITE,
          },
        ]}
      />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  photo: {
    width: p(249),
    height: ratio > 2 ? p(132) : p(100),
    borderRadius: 20,
    backgroundColor: colors.GREY7,
    resizeMode: 'cover',
  },
  photo2: {
    width: p(79),
    height: ratio > 2 ? p(63) : p(49),
    borderRadius: 20,
    marginBottom: 6,
    backgroundColor: colors.GREY7,
    resizeMode: 'cover',
  },
  bigPhoto: {
    width: p(376),
    height: Platform.OS === 'ios' ? (ratio > 2 ? p(375) : p(280)) : p(230),
    marginTop: 18,
    backgroundColor: colors.GREY7,
    resizeMode: 'cover',
  },
});
