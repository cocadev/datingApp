import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Alert, BackHandler } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { IMIconButton } from '../../truly-native';
import IMChat from '../IMChat/IMChat';
import { channelManager } from '../firebase';
import { firebaseStorage } from '../../firebase/storage';
import { reportingManager } from '../../user-reporting';
import { addToChatThread, createThread, setChannel } from '../redux';
import { IMLocalized } from '../../localization/IMLocalization';

class IMChatScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    const options = {};
    let appStyles = navigation.state.params.appStyles;
    let channel = navigation.state.params.channel;
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
    let title = channel.name;
    if (!title) {
      title = channel.participants[0].firstName
        ? channel.participants[0].firstName
        : channel.participants[0].fullname;
    }

    options.headerTitle = title;
    options.headerStyle = {
      backgroundColor: currentTheme.backgroundColor,
    };
    options.headerTintColor = currentTheme.fontColor;
    options.headerRight = (
      <IMIconButton
        source={require('../../../CoreAssets/settings-icon.png')}
        tintColor={appStyles.colorSet.mainThemeForegroundColor}
        onPress={() => navigation.state.params.onSettingsPress()}
        marginRight={10}
        width={24}
        height={24}
      />
    );
    return options;
  };

  constructor(props) {
    super(props);
    this.channel = this.props.navigation.getParam('channel');
    this.appStyles = this.props.navigation.getParam('appStyles');
    this.state = {
      thread: [],
      inputValue: '',
      channel: this.channel,
      downloadUrl: '',
      uploadProgress: 0,
      isMediaViewerOpen: false,
      isRenameDialogVisible: false,
      selectedMediaIndex: null,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );

    this.groupSettingsActionSheetRef = React.createRef();
    this.privateSettingsActionSheetRef = React.createRef();
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
    this.props.navigation.setParams({
      onSettingsPress: this.onSettingsPress,
    });
    this.threadUnsubscribe = channelManager.subscribeThreadSnapshot(
      this.channel,
      this.onThreadCollectionUpdate,
    );
  }

  componentWillUnmount() {
    this.threadUnsubscribe();
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onSettingsPress = () => {
    if (this.state.channel.participants.length > 1) {
      this.groupSettingsActionSheetRef.current.show();
    } else {
      this.privateSettingsActionSheetRef.current.show();
    }
  };

  onChangeName = text => {
    this.showRenameDialog(false);

    const channel = { ...this.state.channel };
    delete channel.participants;
    channel.name = text;

    channelManager.onRenameGroup(
      text,
      channel,
      ({ success, error, newChannel }) => {
        if (success) {
          this.setState({ channel: newChannel });
          this.props.navigation.setParams({
            channel: newChannel,
          });
        }

        if (error) {
          alert(error);
        }
      },
    );
  };

  onLeave = () => {
    Alert.alert(
      IMLocalized(`Leave ${this.state.channel.name || 'group'}`),
      IMLocalized('Are you sure you want to leave this group?'),
      [
        {
          text: 'Yes',
          onPress: this.onLeaveDecided,
          style: 'destructive',
        },
        { text: 'No' },
      ],
      { cancelable: false },
    );
  };

  onLeaveDecided = () => {
    channelManager.onLeaveGroup(
      this.state.channel.id,
      this.props.user.id,
      ({ success, error }) => {
        if (success) {
          this.props.navigation.goBack(null);
        }

        if (error) {
          alert(error);
        }
      },
    );
  };

  showRenameDialog = show => {
    this.setState({ isRenameDialogVisible: show });
  };

  onThreadCollectionUpdate = querySnapshot => {
    const data = [];
    querySnapshot.forEach(doc => {
      const message = doc.data();
      data.push({ ...message, id: doc.id });
    });

    this.setState({ thread: data });
  };

  onChangeTextInput = text => {
    this.setState({
      inputValue: text,
    });
  };

  createOne2OneChannel = () => {
    const self = this;
    return new Promise(resolve => {
      channelManager
        .createChannel(self.props.user, self.state.channel.participants)
        .then(response => {
          self.setState({ channel: response.channel });
          self.threadUnsubscribe = channelManager.subscribeThreadSnapshot(
            response.channel,
            self.onThreadCollectionUpdate,
          );
          resolve(response.channel);
        })
    });
  };

  onSendInput = async () => {
    const self = this;
    if (this.state.thread.length > 0 || this.state.channel.participants.length > 1) {
      self.sendMessage();
      return;
    }
    // If we don't have a chat id, we need to create it first together with the participations
    this
      .createOne2OneChannel()
      .then(_response => {
        self.sendMessage();
      })
  };

  sendMessage = () => {
    const self = this;
    const inputValue = this.state.inputValue;
    const downloadURL = this.state.downloadUrl;
    self.setState({
      inputValue: '',
      downloadUrl: ''
    });
    channelManager
      .sendMessage(this.props.user, this.state.channel, inputValue, downloadURL)
      .then(response => {
        if (response.error) {
          alert(error);
          self.setState({
            inputValue: inputValue,
            downloadUrl: downloadURL
          });
        }
      });
  }

  onAddMediaPress = photoUploadDialogRef => {
    photoUploadDialogRef.current.show();
  };

  onLaunchCamera = () => {
    const self = this;
    const { id, firstName, profilePictureURL } = this.props.user;

    ImagePicker.openCamera({
      cropping: false,
    })
      .then(image => {
        const source = image.path;
        const mime = image.mime;

        const data = {
          content: '',
          created: channelManager.currentTimestamp(),
          senderFirstName: firstName,
          senderID: id,
          senderLastName: '',
          senderProfilePictureURL: profilePictureURL,
          url: 'http://fake',
        };

        self.startUpload({ source, mime }, data);
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ loading: false });
      });
  };

  onOpenPhotos = () => {
    const { id, firstName, profilePictureURL } = this.props.user;
    const self = this;

    ImagePicker.openPicker({
      cropping: false,
      multiple: false,
    })
      .then(image => {
        const source = image.path;
        const mime = image.mime;

        const data = {
          content: '',
          created: channelManager.currentTimestamp(),
          senderFirstName: firstName,
          senderID: id,
          senderLastName: '',
          senderProfilePictureURL: profilePictureURL,
          url: 'http://fake',
        };

        self.startUpload({ source, mime }, data);
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ loading: false });
      });
  };

  startUpload = ({ source, mime }, data) => {
    const self = this;

    const filename =
      new Date() + '-' + source.substring(source.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? source.replace('file://', '') : source;

    firebaseStorage.uploadFileWithProgressTracking(
      filename,
      uploadUri,
      async (snapshot, taskSuccess) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({ uploadProgress });

        if (snapshot.state === taskSuccess) {
          const url = await snapshot.ref.getDownloadURL();
          self.setState({ downloadUrl: { url, mime }, uploadProgress: 0 });
          self.onSendInput();
        }
      },
      error => {
        self.setState({ uploadProgress: 0 });
        alert(IMLocalized('Oops! An error has occured. Please try again.'));
        console.log(error);
      },
    );
  };

  sortMediafromThread = () => {
    this.imagesUrl = [];
    this.images = [];

    this.state.thread.forEach(item => {
      if (item.url && item.url != '') {
        if (item.url.mime && item.url.mime.startsWith('image')) {
          this.imagesUrl.push(item.url.url);
          this.images.push({
            id: item.id,
            url: item.url,
          });
        } else if (!item.url.mime && item.url.startsWith('https://')) {
          // To handle old format before video feature
          this.imagesUrl.push(item.url);
          this.images.push({
            id: item.id,
            url: item.url,
          });
        }
      }
    });

    return this.imagesUrl;
  };

  onChatMediaPress = item => {
    const index = this.images.findIndex(image => {
      return image.id === item.id;
    });

    this.setState({
      selectedMediaIndex: index,
      isMediaViewerOpen: true,
    });
  };

  onMediaClose = () => {
    this.setState({ isMediaViewerOpen: false });
  };

  onUserBlockPress = () => {
    this.reportAbuse('block');
  }

  onUserReportPress = () => {
    this.reportAbuse('report');
  }

  reportAbuse = (type) => {
    const participants = this.state.channel.participants;
    if (!participants || participants.length != 1) {
      return;
    }
    const myID = this.props.user.id || this.props.user.userID;
    const otherUserID = participants[0].id || participants[0].userID;
    reportingManager
      .markAbuse(myID, otherUserID, type)
      .then(response => {
        if (!response.error) {
          this.props.navigation.goBack(null);
        }
      })
  }

  render() {
    return (
      <IMChat
        appStyles={this.appStyles}
        user={this.props.user}
        thread={this.state.thread}
        inputValue={this.state.inputValue}
        onAddMediaPress={this.onAddMediaPress}
        onSendInput={this.onSendInput}
        onChangeTextInput={this.onChangeTextInput}
        onLaunchCamera={this.onLaunchCamera}
        onOpenPhotos={this.onOpenPhotos}
        uploadProgress={this.state.uploadProgress}
        sortMediafromThread={this.sortMediafromThread()}
        isMediaViewerOpen={this.state.isMediaViewerOpen}
        selectedMediaIndex={this.state.selectedMediaIndex}
        onChatMediaPress={this.onChatMediaPress}
        onMediaClose={this.onMediaClose}
        isRenameDialogVisible={this.state.isRenameDialogVisible}
        groupSettingsActionSheetRef={this.groupSettingsActionSheetRef}
        privateSettingsActionSheetRef={this.privateSettingsActionSheetRef}
        showRenameDialog={this.showRenameDialog}
        onChangeName={this.onChangeName}
        onLeave={this.onLeave}
        onUserBlockPress={this.onUserBlockPress}
        onUserReportPress={this.onUserReportPress}
      />
    );
  }
}

IMChatScreen.propTypes = {
  thread: PropTypes.array,
  setChatThread: PropTypes.func,
  createThread: PropTypes.func,
  createChannel: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = ({ app, chat, auth }) => {
  return {
    user: auth.user,
    thread: chat.thread,
  };
};

export default connect(mapStateToProps, {
  addToChatThread,
  createThread,
  setChannel,
})(IMChatScreen);
