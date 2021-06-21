import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {p, ratio} from '../../common/normalize';
import UtilService from '../../common/utils';
import {AvatarAtom} from './avatarAtom';
import {TextCard} from './textCard';
import {WebsiteCard} from './websiteCard';
import {ImageCard} from './imageCard';
import {ResponsesAtom} from './responsesAtom';
import {HashTagAtom} from './hashTagAtom';
import {MsgIcon} from '../Icons';

export default class PostCard extends Component {
  render() {
    const {item, onGoToProfile, onMessage} = this.props;
    return (
      <View
        style={[styles.row, {backgroundColor: UtilService.acceptColor(item)}]}>
        <View
          style={{
            height:
              Platform.OS === 'ios' ? (ratio > 2 ? p(100) : p(60)) : p(60),
          }}
        />
        <AvatarAtom item={item} onGoToProfile={onGoToProfile} />
        <View style={{flexDirection: 'row'}}>
          <View>
            <TextCard item={item} />
            <WebsiteCard item={item} />
            <ImageCard item={item} />
            <ResponsesAtom item={item} />
          </View>
          <View style={styles.countView}>
            <Image source={images.crown} style={styles.crownImg} />
            <Text style={styles.countText}>32</Text>
            <MsgIcon onMessage={onMessage} />
            <Text style={styles.countText}>89</Text>
            <Image
              source={images.share}
              style={[styles.crownImg, {height: 29, marginTop: 26}]}
            />
          </View>
        </View>
        {item.description && (
          <Text style={styles.normalText}>{item.description}</Text>
        )}
        <HashTagAtom item={item} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingTop: p(16),
  },
  normalText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    lineHeight: 30,
    marginTop: 16,
    marginLeft: 24,
    color: colors.WHITE,
  },
  crownImg: {
    width: 29,
    height: 21,
    opacity: 0.85,
  },
  countView: {
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    marginTop: 35,
    top: Platform.OS === 'android' ? 10 : 70,
  },
  countText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.WHITE,
    marginTop: 3,
  },
});
