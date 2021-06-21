import React, {Component} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {p} from '../../common/normalize';
import {colors} from '../../common/colors';

export class AvatarAtom extends Component {
  render() {
    const {item, onGoToProfile, profile, smallProfile, style} = this.props;
    return (
      <View
        style={[
          styles.proView,
          profile && {marginLeft: 20},
          smallProfile && {marginLeft: 15},
          style,
        ]}>
        <TouchableOpacity onPress={onGoToProfile}>
          <Image
            source={{uri: item.avatar}}
            style={[
              styles.avatar,
              profile && styles.avatarIOS,
              smallProfile && styles.avatarSmall,
            ]}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: p(9), justifyContent: 'center'}}>
          <Text
            style={[
              styles.titleText,
              profile && {
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
                lineHeight: 24,
              },
              smallProfile && {
                color: colors.DARK,
                fontSize: 17,
                lineHeight: 22,
              },
            ]}>
            {item.username}
          </Text>
          <Text
            style={[
              styles.timeText,
              profile && {
                fontSize: 15,
                lineHeight: 18,
                color: 'rgba(255,255,255,0.75)',
              },
              smallProfile && {
                color: colors.DARKGREY,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            {item.timeago}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proView: {
    width: p(250),
    flexDirection: 'row',
    marginLeft: 26,
    marginTop: p(5),
  },
  avatar: {
    width: 41,
    height: 41,
    borderRadius: 21,
    backgroundColor: colors.WHITE,
  },
  avatarIOS: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
    color: colors.WHITE,
  },
  timeText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: colors.WHITE,
    lineHeight: 16,
  },
});
