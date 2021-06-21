/* eslint-disable react/no-array-index-key */
import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/header';
import {p} from '../common/normalize';
import {colors} from '../common/colors';
import {CloseIcon, SearchIcon} from '../components/Icons';
import {TENOR_API_URL, TENOR_API_KEY} from '../common/config';

export default class ChooseGifScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      tags: [],
      results: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.onCallGif('thank');
  }

  onCallTags(x) {
    this.setState({isLoading: true});
    axios
      .get(`${TENOR_API_URL}search_suggestions?q=${x}&key=${TENOR_API_KEY}`)
      .then(res => {
        const tags = res.data.results;
        this.setState({tags, isLoading: false});
      });
  }

  onCallGif(tag) {
    this.setState({isLoading: true});
    axios
      .get(`${TENOR_API_URL}search?q=${tag}&key=${TENOR_API_KEY}&limit=48`)
      .then(res => {
        const {results} = res.data;
        this.setState({results, isLoading: false});
      });
  }

  onParseGif(x) {
    const {navigation} = this.props;
    const {params} = navigation.state;
    if (params) {
      params.onOpenModal(x.media[0].tinygif.url);
      navigation.goBack();
    } else {
      navigation.navigate('HashTags', {profilePics: [x.media[0].tinygif.url]});
    }
  }

  _renderItem = ({item}, index) => (
    <TouchableOpacity
      key={index}
      style={{borderRadius: p(10)}}
      onPress={() => this.onParseGif(item)}>
      <Image source={{uri: item.media[0].tinygif.url}} style={styles.gif} />
    </TouchableOpacity>
  );

  render() {
    const {text, results, tags, isLoading} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="Choose a GIF"
          leftElement={<CloseIcon navigation={navigation} white />}
          navigation={navigation}
        />
        {isLoading && (
          <ActivityIndicator size="large" style={styles.indicator} />
        )}
        <View style={styles.editView}>
          <SearchIcon />
          <TextInput
            style={styles.input}
            onChangeText={x => {
              this.setState({text: x});
              this.onCallTags(x);
            }}
            value={text}
            underlineColorAndroid="transparent"
            placeholder=" Search"
            placeholderTextColor={colors.DARKGREY}
            selectionColor={colors.DARKGREY}
          />
          <View style={styles.tagView}>
            {tags.map((item, index) => (
              <TouchableOpacity
                style={styles.tag}
                key={index}
                onPress={() => this.onCallGif(item)}>
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            extraData={this.state}
            style={{marginVertical: p(12)}}
            data={results}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            numColumns={3}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GREY9,
  },
  editView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: p(120),
    paddingTop: p(12),
  },
  input: {
    width: p(330),
    paddingLeft: p(20),
    borderBottomColor: colors.DARKGREY,
    borderBottomWidth: 0.5,
    fontSize: p(16),
    lineHeight: p(25),
    fontFamily: 'Poppins-Regular',
    color: colors.GREY9,
    height: p(34),
  },
  gif: {
    width: p(108),
    height: p(86),
    borderRadius: 10,
    margin: p(7),
    backgroundColor: colors.GREY7,
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SKY,
    borderRadius: 20,
    paddingHorizontal: p(7),
    marginHorizontal: p(3),
    marginTop: p(3),
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: p(7),
  },
  tagText: {
    color: colors.WHITE,
    fontSize: p(13),
    fontFamily: 'Poppins-Light',
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: p(90),
  },
});
