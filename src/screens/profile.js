/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {AvatarAtom} from '../components/postCard/avatarAtom';
import {OverviewCard} from '../components/profile/overviewCard';
import {PersonalCard} from '../components/profile/personalCard';
import {POSTS} from '../common/fakeDB';
import {TextCard} from '../components/postCard/textCard';
import {WebsiteCard} from '../components/postCard/websiteCard';
import {ImageCard} from '../components/postCard/imageCard';
import {CloseIcon, EditIcon, RightIcon} from '../components/Icons';
import {width, getStatusBarHeight} from '../common/config';
import {MyStatusBar} from '../components/MyStatusBar';

const marginTop = getStatusBarHeight();
const headerHeight = 80;
const parallaxHeight = 150;

export default class UserProfile extends Component {
  isFromMainScreen = () => {
    const {navigation} = this.props;
    return !navigation.getParam('item');
  };

  createAnimatedObject = (animatedValue, input, output) => {
    return animatedValue.interpolate({
      inputRange: [
        Number.MIN_SAFE_INTEGER,
        input[0],
        input[1],
        Number.MAX_SAFE_INTEGER,
      ],
      outputRange: [output[0], output[0], output[1], output[1]],
    });
  };

  _renderHeader = (navigation, Me) => {
    return ({animatedValue}) => {
      const animatedTop = this.createAnimatedObject(
        animatedValue,
        [0, parallaxHeight],
        [parallaxHeight - 70, marginTop],
      );
      const animatedBottom = this.createAnimatedObject(
        animatedValue,
        [0, parallaxHeight],
        [20, 0],
      );
      const animatedLeft = this.createAnimatedObject(
        animatedValue,
        [0, parallaxHeight],
        [23, this.isFromMainScreen() ? 23 : 44],
      );
      return (
        <>
          <Animated.View
            leftElement={
              navigation.getParam('item') && (
                <CloseIcon white navigation={navigation} />
              )
            }
            rightElement={
              navigation.getParam('item') ? <RightIcon /> : <EditIcon />
            }
            profile
            style={[
              styles.bar2,
              {
                marginTop: animatedTop,
                backgroundColor: colors.PURPLE,
                paddingBottom: animatedBottom,
              },
            ]}>
            <MyStatusBar
              backgroundColor={colors.PURPLE}
              barStyle="light-content"
            />
            {!this.isFromMainScreen() && (
              <TouchableOpacity style={styles.salute}>
                <Text style={styles.saluteText}>Salute</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
          {!this.isFromMainScreen() && (
            <TouchableOpacity style={styles.headerLeftIcon}>
              <CloseIcon white navigation={navigation} />
            </TouchableOpacity>
          )}
        </>
      );
    };
  };

  _renderParallaxBackground = ({animatedValue}) => {
    const animatedHeight = this.createAnimatedObject(
      animatedValue,
      [0, parallaxHeight],
      [parallaxHeight * 2, 0],
    );
    return (
      <Animated.View
        style={{
          height: animatedHeight,
          width: '100%',
          backgroundColor: colors.PURPLE,
        }}
      />
    );
  };

  _renderPersonality = Me => {
    return (
      <View style={{marginTop}}>
        <Text style={styles.title}>My Personality</Text>
        <PersonalCard item={Me} />
      </View>
    );
  };

  _renderPosts = Me => {
    const filterMe = POSTS.filter(x => x.username === Me.username);
    return (
      <>
        <Text style={styles.title}>My Posts</Text>
        {filterMe.map(item => (
          <View key={item.timeago}>
            <AvatarAtom item={item} smallProfile style={{marginLeft: 24}} />
            <View style={{marginLeft: p(46), marginBottom: 24}}>
              <TextCard item={item} profile />
              <WebsiteCard item={item} profile />
              <ImageCard item={item} profile />
            </View>
          </View>
        ))}
      </>
    );
  };

  render() {
    const {navigation} = this.props;
    const Me = navigation.getParam('item')
      ? navigation.getParam('item')
      : POSTS[0];

    return (
      <>
        <ParallaxScroll
          style={{
            backgroundColor: colors.WHITE,
          }}
          parallaxHeight={headerHeight + parallaxHeight + marginTop}
          headerFixedBackgroundColor={colors.PURPLE}
          headerBackgroundColor={colors.PURPLE}
          isHeaderFixed
          isBackgroundScalable={false}
          parallaxBackgroundScrollSpeed={5}
          showsVerticalScrollIndicator={false}
          renderParallaxBackground={this._renderParallaxBackground}
          renderHeader={this._renderHeader(navigation, Me)}
          headerHeight={headerHeight + marginTop - 20}>
          <View
            style={{
              marginTop: -130,
              marginBottom: 120, // Margin for bottom bar
            }}>
            <OverviewCard item={Me} navigation={navigation} />
            {this._renderPersonality(Me)}
            {this._renderPosts(Me)}
          </View>
        </ParallaxScroll>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 10,
    color: colors.PURPLE,
    opacity: 0.5,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'Poppins-Light',
  },
  square: {
    backgroundColor: colors.WHITE,
  },
  salute: {
    width: 83,
    height: 31,
    marginRight: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#4A4BA9',
  },
  headerLeftIcon: {
    position: 'absolute',
    top: 20,
    left: 23,
    marginTop,
  },
  saluteText: {
    color: colors.WHITE,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  bar: {
    flexDirection: 'row',
    marginTop,
    justifyContent: 'space-between',
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: colors.PURPLE,
    paddingRight: 20,
    paddingVertical: 5,
    width,
  },
  bar2: {
    height: 60,
    width,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
