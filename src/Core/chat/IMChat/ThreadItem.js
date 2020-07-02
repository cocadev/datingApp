import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  NativeModules,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import ThreadMediaItem from './ThreadMediaItem';
import dynamicStyles from './styles';

const { VideoPlayerManager } = NativeModules;
const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

const assets = {
  boederImgSend: require('../assets/borderImg1.png'),
  boederImgReceive: require('../assets/borderImg2.png'),
  textBoederImgSend: require('../assets/textBorderImg1.png'),
  textBoederImgReceive: require('../assets/textBorderImg2.png'),
}

function ThreadItem(props) {
  const { item, user, onChatMediaPress, onSenderProfilePicturePress, appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const [imgErr, setImgErr] = useState(false);
  const videoRef = useRef(null);

  const onImageError = () => {
    setImgErr(true);
  };

  const didPressMediaChat = () => {
    if (item.url && item.url.mime && item.url.mime.startsWith('video')) {
      if (Platform.OS === 'android') {
        VideoPlayerManager.showVideoPlayer(item.url.url);
      } else {
        if (videoRef.current) {
          videoRef.current.presentFullscreenPlayer();
        }
      }
    } else {
      onChatMediaPress(item);
    }
  };

  return (
    <View>
      {/* user thread item */}
      {item.senderID === user.userID && (
        <View style={styles.sendItemContainer}>
          {(item.url != null && item.url != '') && (
            <TouchableOpacity
              onPress={didPressMediaChat}
              activeOpacity={0.9}
              style={[
                styles.itemContent,
                styles.sendItemContent,
                { padding: 0, marginRight: -1 },
              ]}>
              <ThreadMediaItem
                videoRef={videoRef}
                dynamicStyles={styles}
                item={item}
              />
              <Image
                source={assets.boederImgSend}
                style={styles.boederImgSend}
              />
            </TouchableOpacity>
          )}
          {!item.url && (
            <View
              style={[
                styles.itemContent,
                styles.sendItemContent,
                { maxWidth: '65%' },
              ]}>
              <Text style={styles.sendTextMessage}>{item.content}</Text>
              <Image
                source={assets.textBoederImgSend}
                style={styles.textBoederImgSend}
              />
            </View>
          )}
          <TouchableOpacity onPress={() => onSenderProfilePicturePress && onSenderProfilePicturePress(item)}>
            <FastImage
              style={styles.userIcon}
              source={
                imgErr || !item.senderProfilePictureURL
                  ? { uri: defaultAvatar }
                  : { uri: item.senderProfilePictureURL }
              }
              onError={onImageError}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* receiver thread item */}
      {item.senderID !== user.userID && (
        <View style={styles.receiveItemContainer}>
          <TouchableOpacity onPress={() => onSenderProfilePicturePress && onSenderProfilePicturePress(item)}>
            <FastImage
              style={styles.userIcon}
              source={
                imgErr
                  ? { uri: defaultAvatar }
                  : { uri: item.senderProfilePictureURL }
              }
              onError={onImageError}
            />
          </TouchableOpacity>
          {item.url != null && item.url != '' && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.itemContent,
                styles.receiveItemContent,
                { padding: 0, marginLeft: -1 },
              ]}
              onPress={() => onChatMediaPress(item)}>
              <ThreadMediaItem
                videoRef={videoRef}
                dynamicStyles={styles}
                item={item}
              />
              <Image
                source={assets.boederImgReceive}
                style={styles.boederImgReceive}
              />
            </TouchableOpacity>
          )}
          {!item.url && (
            <View
              style={[
                styles.itemContent,
                styles.receiveItemContent,
                { maxWidth: '65%' },
              ]}>
              <Text style={styles.receiveTextMessage}>{item.content}</Text>
              <Image
                source={assets.textBoederImgReceive}
                style={styles.textBoederImgReceive}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

ThreadItem.propTypes = {};

export default ThreadItem;
