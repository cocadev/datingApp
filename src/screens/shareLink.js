import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {theme} from '../common/theme';
import Header from '../components/header';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {CloseIcon, NextIcon} from '../components/Icons';

export default class ShareLink extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  onGoToHashTag() {
    const {navigation} = this.props;
    const {text} = this.state;
    navigation.navigate('HashTags', {
      website: {
        image:
          'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
        title: 'Pending to integrate api ...',
        content: 'Comming Soon...',
        url: text,
      },
    });
  }

  render() {
    const {colorIndex, text} = this.state;
    const {navigation} = this.props;
    return (
      <View style={theme.container}>
        <Header
          title="Share a Link"
          leftElement={<CloseIcon navigation={navigation} />}
          rightElement={<NextIcon onGoToHashTag={() => this.onGoToHashTag()} />}
          dark
          navigation={navigation}
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
            onChangeText={x => this.setState({text: x})}
            value={text}
            underlineColorAndroid="transparent"
            placeholder=" Type or paste URL"
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
    width: p(295),
    borderBottomColor: colors.DARKGREY,
    borderBottomWidth: 1,
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'Poppins-Regular',
    color: colors.GREY9,
  },
});
