import React, {Component} from 'react';
import {View} from 'react-native';
import {theme} from '../common/theme';
import Header from '../components/header';
import {CloseIcon} from '../components/Icons';
import PostCard from '../components/postCard';

export default class PreViewScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={[theme.container]}>
        <Header
          title="Preview"
          leftElement={<CloseIcon white navigation={navigation} />}
        />
        <PostCard item={navigation.state.params} />
      </View>
    );
  }
}
