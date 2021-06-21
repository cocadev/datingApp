/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../common/theme';
import Header from '../components/header';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {CloseIcon, NextIcon} from '../components/Icons';
import {PICKER_OPTIONS} from '../common/config';

export default class UploadPhotoScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      profilePics: [],
    };
  }

  chooseFile = () => {
    ImagePicker.showImagePicker(PICKER_OPTIONS, response => {
      const {profilePics} = this.state;
      if (!response.didCancel || !response.error || !response.customButton) {
        const joined = profilePics.concat(response.uri);
        this.setState({profilePics: joined});
      }
    });
  };

  onGoToHashTag() {
    const {navigation} = this.props;
    const {profilePics, text} = this.state;
    navigation.navigate('HashTags', {profilePics, description: text});
  }

  render() {
    const {colorIndex, text, profilePics} = this.state;
    const {navigation} = this.props;
    return (
      <View style={theme.container}>
        <Header
          title="Upload Photos"
          leftElement={<CloseIcon navigation={navigation} />}
          rightElement={
            <NextIcon
              navigation={navigation}
              onGoToHashTag={() => this.onGoToHashTag()}
            />
          }
          dark
          navigation={navigation}
        />

        <View style={styles.editView}>
          <View style={{flexDirection: 'row'}}>
            {profilePics !== [] &&
              profilePics.map((item, index) => (
                <View style={{marginHorizontal: p(5)}} key={index}>
                  <Image source={{uri: item}} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={() => {
                      const array = profilePics;
                      array.splice(index, 1);
                      this.setState({profilePics: array});
                    }}>
                    <MaterialCommunityIcons
                      name="window-close"
                      size={p(17)}
                      color={colors.DARK}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            {profilePics.length < 4 && (
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.photo}
                  onPress={() => this.chooseFile()}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={p(26)}
                    color={colors.GREY6}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
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
            placeholder=" Title for this upload?"
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
  photoView: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.GREY3,
    marginBottom: 30,
  },
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
    fontFamily: 'Poppins-Light',
    color: colors.GREY9,
  },
  closeIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});
