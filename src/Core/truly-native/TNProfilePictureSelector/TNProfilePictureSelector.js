import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Alert, TouchableHighlight } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImageView from 'react-native-image-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import FastImage from 'react-native-fast-image';

import dynamicStyles from './styles';
import { IMLocalized } from '../../localization/IMLocalization';

const TNProfilePictureSelector = props => {
  const [profilePictureURL, setProfilePictureURL] = useState(props.profilePictureURL || '');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImage, setTappedImage] = useState([]);
  const actionSheet = useRef(null);
  const { appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const handleProfilePictureClick = url => {
    if (url) {
      const isAvatar = url.search('avatar');
      const image = [
        {
          source: {
            uri: url,
          },
        },
      ];
      if (isAvatar === -1) {
        setTappedImage(image);
        setIsImageViewerVisible(true);
      } else {
        showActionSheet();
      }
    } else {
      showActionSheet();
    }
  };

  const onImageError = () => {
    Alert.alert(
      '',
      IMLocalized('An error occurred while trying to load Profile Picture!'),
      [{ text: IMLocalized('OK') }],
      {
        cancelable: false,
      }
    );
    setProfilePictureURL('');
  };

  const onPressAddPhotoBtn = () => {
    const options = {
      title: IMLocalized('Select photo'),
      cancelButtonTitle: IMLocalized('Cancel'),
      takePhotoButtonTitle: IMLocalized('Take Photo'),
      chooseFromLibraryButtonTitle: IMLocalized('Choose from Library'),
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setProfilePictureURL(response.uri);
        props.setProfilePictureURL(response.uri);
      }
    });
  };

  const closeButton = () => (
    <TouchableOpacity style={styles.closeButton} onPress={() => setIsImageViewerVisible(false)}>
      <Image style={styles.closeIcon} source={appStyles.iconSet.close} />
    </TouchableOpacity>
  );

  const showActionSheet = index => {
    setSelectedPhotoIndex(index);
    actionSheet.current.show();
  };

  const onActionDone = index => {
    if (index == 0) {
      onPressAddPhotoBtn();
    }
    if (index == 2) {
      // Remove button
      if (profilePictureURL) {
        setProfilePictureURL(null);
        props.setProfilePictureURL(null);
      }
    }
  };

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}
        >
          <FastImage
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={profilePictureURL ? { uri: profilePictureURL } : appStyles.iconSet.userAvatar}
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Icon name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionSheet
          ref={actionSheet}
          title={IMLocalized('Confirm action')}
          options={[
            IMLocalized('Change Profile Photo'),
            IMLocalized('Cancel'),
            IMLocalized('Remove Profile Photo'),
          ]}
          cancelButtonIndex={1}
          destructiveButtonIndex={2}
          onPress={index => {
            onActionDone(index);
          }}
        />
        <ImageView
          images={tappedImage}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          controls={{ close: closeButton }}
        />
      </ScrollView>
    </>
  );
};

export default TNProfilePictureSelector;
