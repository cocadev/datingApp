/* eslint-disable dot-notation */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {theme} from '../common/theme';
import Header from '../components/header';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {PreViewIcon, BackIcon} from '../components/Icons';
import {COLORSYSTEM} from '../common/config';
import {Me} from '../common/fakeDB';

export default class HashTags extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  onPrev() {
    const {navigation} = this.props;
    const {text} = this.state;
    const {
      description,
      colorIndex,
      profilePics,
      website,
    } = navigation.state.params;
    const params = {
      username: Me.username,
      avatar: Me.avatar,
      timeago: Me.timeago,
      hashtag: text.split(' '),
    };
    if (colorIndex) {
      params['text'] = {
        content: navigation.state.params.text,
        color: COLORSYSTEM[navigation.state.params.colorIndex],
      };
    }
    if (profilePics) {
      params['image'] = profilePics;
    }
    if (description) {
      params['description'] = description;
    }
    if (website) {
      params['website'] = website;
    }
  }

  render() {
    const {colorIndex, text} = this.state;
    const {navigation} = this.props;
    return (
      <View style={theme.container}>
        <Header
          title="#HashTags"
          dark
          navigation={navigation}
          leftElement={<BackIcon navigation={navigation} />}
          rightElement={
            <PreViewIcon navigation={navigation} onPrev={() => this.onPrev()} />
          }
        />

        <View style={styles.editView}>
          <TextInput
            style={[
              styles.input,
              colorIndex === 0 && {
                color: colors.DARK,
                borderBottomColor: colors.DARK,
              },
            ]}
            onChangeText={x =>
              x.split(' ').length < 6 && this.setState({text: x})
            }
            value={text}
            underlineColorAndroid="transparent"
            placeholder=" Add Tags.."
            placeholderTextColor={colors.DARKGREY}
            multiline
            textAlignVertical="top"
            selectionColor={colors.DARKGREY}
            borderColor="transparent"
            spellCheck={false}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  input: {
    width: p(220),
    borderBottomColor: colors.DARKGREY,
    borderBottomWidth: 1,
    fontSize: p(20),
    lineHeight: p(25),
    fontFamily: 'Poppins-Regular',
    color: colors.GREY9,
  },
});
