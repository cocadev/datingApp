import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Platform,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import FastImage from "react-native-fast-image";
import ActivityModal from "../../components/ActivityModal";
import DynamicAppStyles from "../../DynamicAppStyles";
import DatingConfig from "../../DatingConfig";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import { TNTouchableIcon } from '../../Core/truly-native';
import authManager from '../../Core/onboarding/utils/authManager';
import { logout } from "../../Core/onboarding/redux/auth";
import { setUserData } from '../../Core/onboarding/redux/auth';
import dynamicStyles from './styles';
import { useDynamicStyleSheet } from 'react-native-dark-mode';

const MyProfileScreen = props => {
  const [loading, setLoading] = useState(false);
  const [myphotos, setMyphotos] = useState([]);
  const photoDialogActionSheetRef = useRef(null);
  const photoUploadDialogActionSheetRef = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const styles = useDynamicStyleSheet(dynamicStyles);
  var selectedItemIndex = -1;

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(props.user.id);

  const updatePhotos = photos => {
    let myUpdatePhotos = [];
    let pphotos = photos ? [...photos] : [];
    let temp = [];

    pphotos.push({ add: true });
    pphotos.map((item, index) => {
      temp.push(item);

      if (index % 6 == 5) {
        myUpdatePhotos.push(temp);
        temp = [];
      } else if (item.add) {
        myUpdatePhotos.push(temp);
        temp = [];
      }
    });

    setMyphotos(myUpdatePhotos);
    selectedItemIndex = -1;
  };

  useEffect(() => {
    if (props.user) {
      updatePhotos(props.user.photos);
    }

    StatusBar.setHidden(false);
  }, []);

  const detail = () => {
    props.navigation.navigate("AccountDetails", {
      appStyles: DynamicAppStyles,
      form: DatingConfig.editProfileFields,
      screenTitle: IMLocalized("Edit Profile")
    });
  };

  const setting = () => {
    props.navigation.navigate("Settings", {
      userId: props.user.id,
      appStyles: DynamicAppStyles,
      form: DatingConfig.userSettingsFields,
      screenTitle: IMLocalized("Settings")
    });
  };

  const contact = () => {
    props.navigation.navigate("ContactUs", {
      appStyles: DynamicAppStyles,
      form: DatingConfig.contactUsFields,
      screenTitle: IMLocalized("Contact us")
    });
  };

  const onLogout = () => {
    authManager.logout(props.user);
    dispatch(logout());
    props.navigation.navigate('LoadScreen', { appStyles: DynamicAppStyles, appConfig: DatingConfig });
  };

  const onSelectAddPhoto = () => {
    photoUploadDialogActionSheetRef.current.show();
  };

  const onPhotoUploadDialogDone = index => {
    if (index == 0) {
      onLaunchCamera();
    }

    if (index == 1) {
      onOpenPhotos();
    }
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false
    }).then(image => {
      startUpload(image.path);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      startUpload(image.path);
    });
  };

  const startUpload = source => {
    setLoading(true);
    uploadPromise(source)
      .then(url => {
        const { photos } = props.user;
        let pphotos = photos ? photos : [];
        pphotos.push(url);
        const data = {
          photos: pphotos
        };

        updateUserInfo(data);
        updatePhotos(pphotos);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const updateUserInfo = data => {
    const tempUser = currentUser;
    // optimistically update the UI
    dispatch(setUserData({ user: { ...currentUser, ...data } }))
    userRef
      .update(data)
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        const { message } = error;
        setLoading(false);
        dispatch(setUserData({ user: { ...tempUser } }));
      });
  };

  const onSelectDelPhoto = index => {
    selectedItemIndex = index;
    photoDialogActionSheetRef.current.show();
  };

  const onPhotoDialogDone = actionSheetActionIndex => {
    const { photos } = props.user;

    if (selectedItemIndex == -1 || selectedItemIndex >= photos.length) {
      return;
    }

    if (actionSheetActionIndex == 0) {
      if (photos) {
        photos.splice(selectedItemIndex, 1);
      }
      updateUserInfo({ photos });
      updatePhotos(photos);
    }

    if (actionSheetActionIndex == 2) {
      const photoToUpdate = photos[selectedItemIndex];
      updateUserInfo({ profilePictureURL: photoToUpdate });
    }
  };

  const uploadPromise = url => {
    const uri = url;

    return new Promise(resolve => {
      let filename = uri.substring(uri.lastIndexOf("/") + 1);

      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;

      firebase
        .storage()
        .ref(filename)
        .putFile(uploadUri)
        .then(snapshot => {
          resolve(snapshot.downloadURL);
        });
    });
  };

  const { firstName, lastName, profilePictureURL } = props.user;
  const userLastName = props.user && lastName ? lastName : " ";
  const userfirstName = props.user && firstName ? firstName : " ";

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.MainContainer}>
          <ScrollView style={styles.body}>
            <View style={styles.photoView}>
              <FastImage
                style={{ width: "100%", height: "100%" }}
                source={{ uri: profilePictureURL }}
              />
            </View>
            <View style={styles.nameView}>
              <Text style={styles.name}>
                {userfirstName + " " + userLastName}
              </Text>
            </View>
            <View
              style={[
                styles.myphotosView,
                myphotos[0] && myphotos[0].length <= 3
                  ? { height: 158 }
                  : { height: 268 }
              ]}
            >
              <View style={styles.itemView}>
                <Text style={styles.photoTitleLabel}>{IMLocalized("My Photos")}</Text>
              </View>
              <Swiper
                removeClippedSubviews={false}
                showsButtons={false}
                loop={false}
                paginationStyle={{ top: -230, left: null, right: 0 }}
                dot={
                  <View
                    style={styles.inactiveDot}
                  />
                }
                activeDot={
                  <View
                    style={{
                      backgroundColor: "#db6470",
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3
                    }}
                  />
                }
              >
                {myphotos.map((photos, i) => (
                  <View key={"photos" + i} style={styles.slide}>
                    <FlatList
                      horizontal={false}
                      numColumns={3}
                      data={photos}
                      scrollEnabled={false}
                      renderItem={({ item, index }) =>
                        item.add ? (
                          <TouchableOpacity
                            key={"item" + index}
                            style={[
                              styles.myphotosItemView,
                              {
                                backgroundColor:
                                  DynamicAppStyles.colorSet.mainThemeForegroundColor
                              }
                            ]}
                            onPress={onSelectAddPhoto}
                          >
                            <Icon
                              style={styles.icon}
                              name="ios-camera"
                              size={40}
                              color={
                                DynamicAppStyles.colorSet.mainThemeBackgroundColor
                              }
                            />
                          </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                              key={"item" + index}
                              style={styles.myphotosItemView}
                              onPress={() => onSelectDelPhoto(i * 6 + index)}
                            >
                              <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={{ uri: item }}
                              />
                            </TouchableOpacity>
                          )
                      }
                    />
                  </View>
                ))}
              </Swiper>
            </View>
            <TouchableOpacity style={styles.optionView} onPress={detail}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "#687cf0",
                    resizeMode: "cover"
                  }}
                  source={DynamicAppStyles.iconSet.account}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>{IMLocalized("Account Details")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionView} onPress={setting}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "#9a91c4",
                    resizeMode: "cover"
                  }}
                  source={DynamicAppStyles.iconSet.setting}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>{IMLocalized("Settings")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionView} onPress={contact}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "#88e398",
                    resizeMode: "cover"
                  }}
                  source={DynamicAppStyles.iconSet.callIcon}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>{IMLocalized("Contact Us")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutView} onPress={onLogout}>
              <Text style={styles.textLabel}>{IMLocalized("Logout")}</Text>
            </TouchableOpacity>
          </ScrollView>
          <ActionSheet
            ref={photoDialogActionSheetRef}
            title={IMLocalized("Photo Dialog")}
            options={[IMLocalized("Remove Photo"), IMLocalized("Cancel"), IMLocalized("Make Profile Picture")]}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={onPhotoDialogDone}
          />
          <ActionSheet
            ref={photoUploadDialogActionSheetRef}
            title={IMLocalized("Photo Upload")}
            options={[IMLocalized("Launch Camera"), IMLocalized("Open Photo Gallery"), IMLocalized("Cancel")]}
            cancelButtonIndex={2}
            onPress={onPhotoUploadDialogDone}
          />
          <ActivityModal
            loading={loading}
            title={IMLocalized("Please wait")}
            size={"large"}
            activityColor={"white"}
            titleColor={"white"}
            activityWrapperStyle={{
              backgroundColor: "#404040"
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

MyProfileScreen.navigationOptions = ({ screenProps, navigation }) => {
  let currentTheme = DynamicAppStyles.navThemeConstants[screenProps.theme];
  return {
    headerTitle: (
      <TNTouchableIcon
        imageStyle={{ tintColor: '#d1d7df' }}
        iconSource={DynamicAppStyles.iconSet.fireIcon}
        appStyles={DynamicAppStyles}
        onPress={() => navigation.pop()}
      />
    ),
    headerRight: (
      <TNTouchableIcon
        imageStyle={{ tintColor: '#d1d7df' }}
        iconSource={DynamicAppStyles.iconSet.conversations}
        onPress={() => {
          navigation.pop();
          navigation.navigate('Conversations', { appStyles: DynamicAppStyles });
        }}
        appStyles={DynamicAppStyles}
      />
    ),
    headerLeft: (
      <TNTouchableIcon
        imageStyle={{ tintColor: DynamicAppStyles.colorSet.mainThemeForegroundColor }}
        iconSource={DynamicAppStyles.iconSet.userProfile}
        appStyles={DynamicAppStyles}
      />
    ),
    headerStyle: {
      backgroundColor: currentTheme.backgroundColor,
      borderBottomWidth: 0,
    },
    headerTintColor: currentTheme.fontColor,
  };
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(MyProfileScreen);
