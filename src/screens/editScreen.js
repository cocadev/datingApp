/* eslint-disable react/sort-comp */
/* eslint-disable lines-between-class-members */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {images} from '../common/images';
import TextEditScreen from './textEditScreen';
import ShareLink from './shareLink';
import UploadPhotoScreen from './uploadPhotoScreen';
import GifScreen from './chooseGif';
import {COLORSYSTEM} from '../common/config';
import {MyStatusBar} from '../components/MyStatusBar';
import {colors} from '../common/colors';

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.navigation.getParam('index'),
      myColor: 8,
      routes: [
        {key: 'homes', title: 'Homes'},
        {key: 'notifications', title: 'Notifications'},
        {key: 'invites', title: 'Invites'},
        {key: 'profile', title: 'Profile'},
      ],
    };
  }

  handleIndexChange = index =>
    this.setState({
      index,
    });

  buttonIcon(props, goto, icon1, k) {
    const {index, myColor} = this.state;
    return (
      <TouchableOpacity style={styles.item} onPress={() => props.jumpTo(goto)}>
        {goto === 'homes' && index === 0 && (
          <View
            style={[styles.triangle, {borderBottomColor: COLORSYSTEM[myColor]}]}
          />
        )}
        <View
          style={{height: 24, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={icon1}
            style={[
              goto === 'profile' ? styles.cateogryImg3 : styles.cateogryImg,
              index !== k && {opacity: 0.5},
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
  renderTabBar = props => {
    return (
      <View style={styles.tabbar}>
        {this.buttonIcon(props, 'homes', images.text_dark, 0)}
        {this.buttonIcon(props, 'notifications', images.www_dark, 1)}
        {this.buttonIcon(props, 'invites', images.image_dark, 2)}
        {this.buttonIcon(props, 'profile', images.gif_dark, 3)}
      </View>
    );
  };
  onColorChange(myColor) {
    this.setState({
      myColor,
    });
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, marginTop: -24}}>
        <MyStatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
        <TabView
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={({route}) => {
            switch (route.key) {
              case 'notifications':
                return <ShareLink navigation={navigation} />;
              case 'invites':
                return <UploadPhotoScreen navigation={navigation} />;
              case 'profile':
                return <GifScreen navigation={navigation} />;
              default:
                return (
                  <TextEditScreen
                    onColorChange={x => this.onColorChange(x)}
                    navigation={navigation}
                  />
                );
            }
          }}
          renderTabBar={this.renderTabBar}
          tabBarPosition="bottom"
          onIndexChange={this.handleIndexChange}
          style={{backgroundColor: '#fff'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  cateogryImg: {
    width: 24,
    height: 24,
  },
  cateogryImg3: {
    width: 31,
    height: 13,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    top: -16,
    transform: [{rotate: '180deg'}],
  },
});
