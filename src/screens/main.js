import * as React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import {p} from '../common/normalize';
import {images} from '../common/images';
import {colors} from '../common/colors';
import Homes from './homes';
import Invites from './invites';
import Profile from './profile';
import Notifications from './notifications';
import {width, MODALIST} from '../common/config';

export default class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      showModal: false,
      routes: [
        {key: 'homes', title: 'Homes'},
        {key: 'notifications', title: 'Notifications'},
        {key: 'invites', title: 'Invites'},
        {key: 'profile', title: 'Profile'},
      ],
      spinAnim: new Animated.Value(0),
    };
  }

  animationRotate() {
    const {spinAnim, routes} = this.state;
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    this.setState({routes});
  }

  goto(x) {
    const {navigation} = this.props;
    this.setState({showModal: false});
    navigation.navigate(x.goto, {index: x.index});
  }

  _renderImg = ({item}) => (
    <TouchableOpacity
      style={{marginBottom: p(43)}}
      onPress={() => this.goto(item)}>
      <Image source={item.img} style={styles.modalIcon} />
      <Text style={styles.text1}>{item.name}</Text>
    </TouchableOpacity>
  );

  onModal() {
    const {showModal} = this.state;
    this.setState({showModal: !showModal});
    this.animationRotate();
  }

  handleIndexChange = index =>
    this.setState({
      index,
    });

  buttonIcon(props, goto, icon1, k) {
    const {index} = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => props.jumpTo(goto)}>
        <View style={styles.item}>
          <Image
            source={icon1}
            style={[
              goto === 'notifications'
                ? styles.cateogryImg2
                : goto === 'profile'
                ? styles.cateogryImg3
                : styles.cateogryImg,
              index !== k && {opacity: 0.5},
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderModal() {
    const {spinAnim, showModal} = this.state;
    const spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });
    return (
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => this.closeModal()}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={{paddingBottom: 80, position: 'absolute'}}>
              <FlatList
                data={MODALIST}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderImg}
                numColumns={2}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => this.onModal()}>
              <Animated.View style={styles.item}>
                <Animated.Image
                  source={images.group}
                  style={[styles.groupImg, {transform: [{rotate: spin}]}]}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    );
  }

  renderTabBar = props => {
    return (
      <LinearGradient
        colors={['transparent', colors.PURPLE]}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        pointerEvents="box-none"
        style={styles.gradientView}>
        <View style={styles.tabbar}>
          {this.buttonIcon(props, 'homes', images.home, 0)}
          {this.buttonIcon(props, 'notifications', images.notifications, 1)}

          <TouchableWithoutFeedback onPress={() => this.onModal()}>
            <View style={styles.item}>
              <Animated.Image
                source={images.group}
                style={[
                  styles.groupImg,
                  {
                    transform: [{rotate: '0 deg'}],
                  },
                ]}
              />
            </View>
          </TouchableWithoutFeedback>

          {this.buttonIcon(props, 'invites', images.invite, 2)}
          {this.buttonIcon(props, 'profile', images.profile, 3)}
        </View>
      </LinearGradient>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <TabView
          swipeEnabled={false}
          animationType={null}
          navigationState={this.state}
          renderScene={({route}) => {
            switch (route.key) {
              case 'notifications':
                return <Notifications navigation={navigation} />;
              case 'invites':
                return <Invites navigation={navigation} />;
              case 'profile':
                return <Profile navigation={navigation} />;
              default:
                return <Homes navigation={navigation} />;
            }
          }}
          renderTabBar={this.renderTabBar}
          tabBarPosition="bottom"
          onIndexChange={this.handleIndexChange}
          style={{backgroundColor: '#fff'}}
        />
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradientView: {
    width,
    height: p(155),
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    paddingBottom: p(15),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tabbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  cateogryImg: {
    width: p(24),
    height: p(24),
  },
  cateogryImg2: {
    width: p(24),
    height: p(26),
  },
  cateogryImg3: {
    width: p(26),
    height: p(26),
  },
  groupImg: {
    width: p(60),
    height: p(60),
    marginBottom: p(6),
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.LIGHTPURPLE,
    position: 'absolute',
    bottom: 0,
    paddingBottom: p(15),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text1: {
    color: colors.WHITE,
    fontFamily: 'Poppins-Bold',
    fontSize: p(16),
    lineHeight: p(20),
    textAlign: 'center',
    marginTop: 5,
  },
  modalIcon: {
    width: p(48),
    height: p(48),
    marginHorizontal: p(25),
  },
});
