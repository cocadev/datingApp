/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewShot from 'react-native-view-shot';
import Header from '../components/header';
import {colors} from '../common/colors';
import {p} from '../common/normalize';
import {MESSAGES} from '../common/fakeDB';
import UtilService from '../common/utils';
import {Atom} from '../components/message/atom';
import {COLORSYSTEM, SYMBOLTEXTS, width} from '../common/config';
import {BackIcon} from '../components/Icons';

export default class MessagesScreen extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      colorIndex: 7,
      edit: false,
      img:
        'https://akns-images.eonline.com/eol_images/Entire_Site/2014617/rs_560x336-140717162323-1024.disney-princes.jpg',
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({messages: MESSAGES});
  }

  captureViewShoot = async index => {
    const {messages} = this.state;
    const array = [...messages];

    this.refs[`full${index}`].capture().then(async uri => {
      array.unshift({
        username: 'Natalia',
        createdAt: new Date(),
        image: uri,
      });
      this.setState({img: uri, edit: false, messages: array, message: ''});
    });
  };

  _renderItem = ({item}, index) => <Atom key={index} item={item} />;

  onSelect(index) {
    this.setState({colorIndex: index});
  }

  onSend() {
    const {messages, message} = this.state;
    const array = [...messages];
    array.unshift({
      username: 'Natalia',
      createdAt: new Date(),
      text: message,
    });
    this.setState({messages: array, message: ''});
  }

  _onOpenModal(x) {
    const {messages} = this.state;
    const array = [...messages];
    array.unshift({
      username: 'Natalia',
      createdAt: new Date(),
      image: x,
    });
    this.setState({messages: array, message: ''});
  }

  render() {
    const {message, colorIndex, edit, messages} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="Bernice Lucasy"
          leftElement={<BackIcon navigation={navigation} />}
          dark
        />

        <View style={{flex: 1, marginTop: p(60), justifyContent: 'flex-end'}}>
          <FlatList
            style={{marginTop: p(10)}}
            data={messages}
            keyExtractor={(item, i) => String(i)}
            renderItem={item => this._renderItem(item, this.state)}
            extraData={this.state}
            inverted
            ListHeaderComponent={<View style={{height: p(10)}} />}
          />
          {edit && (
            <View
              style={{
                backgroundColor: colors.OPACITY,
                position: 'absolute',
                bottom: p(52),
              }}>
              <View style={styles.colorView}>
                <ScrollView
                  horizontal
                  style={styles.colorBar}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled="true">
                  {COLORSYSTEM.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.circle, {backgroundColor: item}]}
                      onPress={() => this.onSelect(index)}>
                      {index === colorIndex && (
                        <MaterialIcons
                          name="check"
                          color={colorIndex === 0 ? colors.DARK : colors.WHITE}
                          size={p(18)}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                  <View style={{width: p(100)}} />
                </ScrollView>
              </View>
              <ScrollView horizontal style={styles.noticeView}>
                {SYMBOLTEXTS.map((font, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.noticeItem}
                    onPress={() => this.captureViewShoot(index)}>
                    <ViewShot
                      style={styles.image}
                      ref={`full${index}`}
                      options={{format: 'jpg', quality: 1}}>
                      <Text
                        style={[
                          styles.notice,
                          {fontSize: UtilService.acceptFontSize(message)},
                          {fontFamily: font, color: COLORSYSTEM[colorIndex]},
                        ]}>
                        {message}
                      </Text>
                    </ViewShot>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="ios-images" size={p(24)} color={colors.GREY5} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.setState({edit: true})}>
              <MaterialCommunityIcons
                name="text-shadow"
                size={p(24)}
                color={colors.GREY5}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, {marginLeft: p(1), marginRight: p(-3)}]}
              onPress={() =>
                navigation.navigate('ChooseGif', {
                  onOpenModal: x => this._onOpenModal(x),
                })
              }>
              <MaterialIcons name="gif" size={p(28)} color={colors.GREY5} />
            </TouchableOpacity>
            <TextInput
              style={styles.message}
              uppercase={false}
              onChangeText={x => this.setState({message: x})}
              value={message}
              placeholder="Start Typing"
            />
            <TouchableOpacity
              style={[styles.btn, {marginRight: p(8)}]}
              onPress={() => this.onSend()}>
              <MaterialIcons name="send" size={p(24)} color={colors.PURPLE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  colorBar: {
    marginTop: p(70),
    paddingLeft: p(50),
  },
  message: {
    padding: 0,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    fontSize: p(16),
    paddingLeft: p(10),
    marginLeft: p(12),
    fontFamily: 'Poppins-Light',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: p(12),
    borderRadius: 5,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: p(24),
    height: p(24),
    borderRadius: p(13),
    marginVertical: p(14),
    marginLeft: p(10),
    borderWidth: 1,
    borderColor: colors.LIGHTGREY,
  },
  colorView: {
    flexDirection: 'row',
    width,
    zIndex: 100,
  },
  noticeView: {
    flexDirection: 'row',
    width,
    opacity: 0.7,
  },
  notice: {
    textAlign: 'center',
    color: 'black',
    fontSize: p(24),
  },
  noticeItem: {
    width: p(125),
    height: p(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: p(125),
    height: p(125),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  inputBox: {
    flexDirection: 'row',
    paddingVertical: p(12),
    borderTopColor: colors.LIGHTGREY,
    borderTopWidth: 1,
  },
});
