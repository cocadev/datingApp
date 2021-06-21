import React, {Component} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/header';
import {p} from '../common/normalize';
import {POSTS} from '../common/fakeDB';
import {colors} from '../common/colors';
import PostCard from '../components/postCard';
import {RightIcon, SettingIcon} from '../components/Icons';

const {height, width} = Dimensions.get('window');

export default class Homes extends Component {
  handlePress(item) {
    const {navigation} = this.props;
    navigation.navigate('Profile', {item});
  }

  onMessage(item) {
    const {navigation} = this.props;
    navigation.navigate('Messages', {item});
  }

  _renderItem = ({item, index}) => (
    <PostCard
      item={item}
      index={index}
      onGoToProfile={() => this.handlePress(item)}
      onMessage={() => this.onMessage(item)}
    />
  );

  render() {
    return (
      <View style={{position: 'absolute', flex: 1, width}}>
        <Header
          title="Home"
          leftElement={<SettingIcon />}
          rightElement={<RightIcon />}
        />
        <Carousel
          data={POSTS}
          renderItem={this._renderItem}
          sliderHeight={height}
          itemHeight={height}
          vertical
          sliderWidth={width}
          itemWidth={width}
          slideStyle={{width}}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
        <LinearGradient
          style={styles.row}
          colors={['transparent', colors.DARKY]}
          start={{x: 1, y: 0.7}}
          end={{x: 1, y: 0}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    top: 0,
    width,
    height: p(100),
  },
});
