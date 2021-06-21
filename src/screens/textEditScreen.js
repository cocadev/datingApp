/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../common/theme';
import Header from '../components/header';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {COLORSYSTEM} from '../common/config';
import {CloseIcon, NextIcon} from '../components/Icons';

export default class TextEditScreen extends Component {
  constructor() {
    super();
    this.state = {
      colorIndex: 8,
      text: '',
    };
  }

  onSelect(index) {
    this.setState({colorIndex: index});
    this.props.onColorChange(index);
  }

  onGoToHashTag() {
    const {navigation} = this.props;
    const {text, colorIndex} = this.state;
    navigation.navigate('HashTags', {text, colorIndex});
  }

  render() {
    const {colorIndex, text} = this.state;
    const {navigation} = this.props;
    return (
      <View style={theme.container}>
        <Header
          title="Share a Thought"
          leftElement={<CloseIcon navigation={navigation} />}
          rightElement={<NextIcon onGoToHashTag={() => this.onGoToHashTag()} />}
          dark
          navigation={navigation}
        />
        <View style={{flexDirection: 'row'}}>
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
          </ScrollView>
        </View>

        <View
          style={[styles.editView, {backgroundColor: COLORSYSTEM[colorIndex]}]}>
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
            placeholder=" Type something..."
            placeholderTextColor={
              colorIndex === 0 ? colors.DARKGREY : colors.WHITE
            }
            multiline
            textAlignVertical="top"
            selectionColor={colorIndex === 0 ? colors.DARK : colors.WHITE}
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
  colorBar: {
    marginTop: Platform.OS === 'ios' ? 90 : 60,
    borderTopColor: '#F4F4F4',
    borderTopWidth: 1,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
    borderRadius: 12,
    marginVertical: 14,
    marginLeft: 9,
    borderWidth: 1,
    borderColor: '#F4F4F4',
  },
  editView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: p(295),
    paddingLeft: 0,
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    fontSize: 20,
    // lineHeight: p(25),
    fontFamily: 'Poppins-Regular',
    color: colors.WHITE,
  },
});
