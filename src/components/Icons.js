import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {p} from '../common/normalize';

export function CloseIcon(props) {
  const {navigation, white} = props;
  return (
    <MaterialIcons
      name="close"
      size={26}
      color={white && colors.WHITE}
      onPress={() => navigation.goBack()}
      style={{marginLeft: -8}}
    />
  );
}

export function BackIcon(props) {
  const {navigation} = props;
  return (
    <MaterialIcons
      name="chevron-left"
      size={28}
      onPress={() => navigation.goBack()}
      style={{marginLeft: -10}}
    />
  );
}

export function SettingIcon() {
  return (
    <Ionicons
      name="md-settings"
      size={24}
      color={colors.WHITE}
      style={{marginTop: 3}}
    />
  );
}

export function RightIcon() {
  return (
    <Image
      source={images.messages}
      style={{width: 20, height: 16, marginTop: p(7)}}
    />
  );
}

export function MoreIcon(props) {
  const {color} = props;
  return (
    <Ionicons
      name="md-settings"
      size={22}
      color={color}
      style={{marginRight: p(7)}}
    />
  );
}

export function EditIcon() {
  return <MaterialIcons name="edit" size={p(26)} color={colors.WHITE} />;
}

export function NextIcon(props) {
  const {onGoToHashTag} = props;
  return (
    <TouchableOpacity onPress={onGoToHashTag}>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 21,
          fontFamily: 'Poppins-Regular',
          color: colors.SKY,
        }}>
        Next
      </Text>
    </TouchableOpacity>
  );
}

export function PreViewIcon(props) {
  const {onPrev} = props;
  return (
    <TouchableOpacity onPress={onPrev}>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 18,
          fontFamily: 'Poppins-Regular',
          color: colors.SKY,
        }}>
        View
      </Text>
    </TouchableOpacity>
  );
}

export function MsgIcon(props) {
  const {onMessage} = props;
  return (
    <MaterialCommunityIcons
      name="message-reply"
      size={33}
      color={colors.WHITE}
      style={{marginTop: p(26), marginBottom: p(-5), opacity: 0.85}}
      onPress={onMessage}
    />
  );
}

export function SearchIcon() {
  return (
    <Ionicons
      name="ios-search"
      size={p(20)}
      color={colors.DARKY2}
      style={{position: 'absolute', left: p(25), top: p(20)}}
    />
  );
}
