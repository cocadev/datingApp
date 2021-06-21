import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform,
  AppState,
  PermissionsAndroid // eslint-disable-line react-native/split-platform-components
} from "react-native";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import firebase from "react-native-firebase";
import ActivityModal from "../../components/ActivityModal";
import Deck from "../../components/swipe/deck";
import TinderCard from "../../components/swipe/tinder_card";
import NoMoreCard from "../../components/swipe/no_more_card";
import CardDetailsView from "../../components/swipe/CardDetailsView/CardDetailsView";
import NewMatch from "../../components/swipe/newMatch";
import DynamicAppStyles from "../../DynamicAppStyles";
import DatingConfig from "../../DatingConfig";
import { setUserData } from '../../Core/onboarding/redux/auth';
import { isDatingProfileCompleteForUser } from '../../utils';
import { TNTouchableIcon } from '../../Core/truly-native';
import SwipeTracker from '../../firebase/tracker';
import { IMLocalized } from "../../Core/localization/IMLocalization";
import dynamicStyles from './styles';
import { useDynamicStyleSheet } from 'react-native-dark-mode';

const SwipeScreen = props => {
  const user = useSelector(state => state.auth.user);
  const swipes = useSelector(state => state.dating.swipes);
  const bannedUserIDs = useSelector(state => state.userReports.bannedUserIDs);
  const matches = useSelector(state => state.dating.matches);
  const styles = useDynamicStyleSheet(dynamicStyles);

  // const incomingSwipes = useSelector(state => state.dating.incomingSwipes);
  const dispatch = useDispatch();
  const [recommendations, setRecommendations] = useState([]);
  const [showMode, setShowMode] = useState(0);
  const [currentMatchData, setCurrentMatchData] = useState(null);
  const [loadedDeck, setLoadedDeck] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [positionWatchID, setPositionWatchID] = useState(null);
  const [userSettingsDidChange, setUserSettingsDidChange] = useState(false);
  const [actionsFromCardDetail, setActionsFromCardDetail] = useState([]);

  const bottomTabPressCount = useRef(0);
  const lastVisibleRecommendation = useRef(null);
  const recommendationBatchLimit = useRef(75);
  const swipeThreshold = useRef(4);
  const userID = user.id || user.userID;
  const { store } = useContext(ReactReduxContext)

  const swipeTracker = new SwipeTracker(store, user.id || user.userID);
  var isLoadingRecommendations = false;

  const usersRef = firebase.firestore().collection("users");
  const userRef = usersRef.doc(userID);
  const recommendationRef = useRef(
    usersRef
      .orderBy("id", "desc")
      .limit(recommendationBatchLimit.current)
  );
  const didFocusSubscription = useRef(null);

  useEffect(() => {
    StatusBar.setHidden(false);
    swipeTracker.subscribeIfNeeded();

    didFocusSubscription.current = props.navigation.addListener(
      "didFocus",
      payload => handleComponentDidFocus()
    );

    setUserSettingsDidChange(false);

    if (!isDatingProfileCompleteForUser(user)) {
      handleIncompleteUserData();
    }

    AppState.addEventListener("change", handleAppStateChange);

    watchPositionChange();

    return () => {
      didFocusSubscription.current && didFocusSubscription.current.remove();
      AppState.removeEventListener("change", handleAppStateChange);
      positionWatchID != null && Geolocation.clearWatch(positionWatchID);
      swipeTracker.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setUserSettingsDidChange(true);
    StatusBar.setHidden(false);
  }, [user]);

  useEffect(() => {
    if (swipes != null) {
      getMoreRecommendations();
    }
  }, [swipes]);

  useEffect(() => {
    if (matches != null) {
      // We retrieve all new matches and notify the user
      const unseenMatches = matches.filter(match => !match.matchHasBeenSeen);
      if (unseenMatches.length > 0) {
        setCurrentMatchData(unseenMatches[0]);
      }
    }
  }, [matches]);

  useEffect(() => {
    if (currentMatchData) {
      swipeTracker.markSwipeAsSeen(currentMatchData, user);
      setShowMode(2);
    }
  }, [currentMatchData]);

  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      userRef
        .update({
          isOnline: true
        })
        .then(() => {
          dispatch(setUserData({ user: { ...user, isOnline: true } }))
        })
        .then(() => {
          setAppState(nextAppState);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      userRef
        .update({
          isOnline: false
        })
        .then(() => {
          dispatch(setUserData({ user: { ...user, isOnline: false } }))
        })
        .then(() => {
          setAppState(nextAppState);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const watchPositionChange = async () => {
    if (Platform.OS === "ios") {
      setPositionWatchID(watchPosition());
    } else {
      handleAndroidLocationPermission();
    }
  };

  const handleAndroidLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: IMLocalized("Instadating App"),
          message: IMLocalized("Instadating App wants to access your location ")
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPositionWatchID(watchPosition());
      } else {
        alert(IMLocalized("Location permission denied. Turn on location to use the app."));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const watchPosition = () => {
    return Geolocation.watchPosition(position => {
      const locationDict = {
        position: { // for legacy reasons
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };
      userRef
        .update(locationDict)
        .then(() => {
          dispatch(setUserData({ user: { ...user, ...locationDict } }));
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  const handleComponentDidFocus = () => {
    if (userSettingsDidChange) {
      setUserSettingsDidChange(false);
      setRecommendations([]);
      recommendationRef.current = usersRef
        .orderBy("id", "desc")
        .limit(recommendationBatchLimit.current);
      lastVisibleRecommendation.current = null;
      getMoreRecommendations();
    }
  };

  const handleIncompleteUserData = () => {
    Alert.alert(
      IMLocalized("Let's complete your dating profile"),
      IMLocalized("Welcome to Instadating. Let's complete your dating profile to let other people find you."),
      [
        {
          text: IMLocalized("Let's go"),
          onPress: () => {
            user.profilePictureURL
              ? props.navigation.replace("AccountDetails", {
                lastScreen: "Swipe",
                appStyles: DynamicAppStyles,
                form: DatingConfig.editProfileFields,
              })
              : props.navigation.replace("AddProfilePicture");
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleNewMatchButtonTap = nextScreen => {
    setShowMode(0);
    if (nextScreen) {
      props.navigation.navigate(nextScreen);
    }
  };

  const filterUsersForRecommendation = async (otherUser, myPosition) => {
    const genderPre = ((user.settings && user.settings.gender_preference) || "all");
    const appDistance = (user.settings && user.settings.maximum_distance && user.settings.maximum_distance.split(" ")) || ["10000"];
    const distanceValue = Number(appDistance[0]);
    const {
      firstName,
      email,
      phone,
      profilePictureURL,
      userID,
      id
    } = otherUser;
    const gender = (otherUser.settings) ? otherUser.settings.gender : "none";
    const location = (otherUser.location ? otherUser.location : otherUser.position);
    const isNotCurrentUser = (userID ? userID : id) != (user.id ? user.id : user.userID);
    const hasNotBeenBlockedByCurrentUser = !bannedUserIDs.includes(id || userID);
    const hasPreviouslyNotBeenSwiped = !swipes.find(user => user.id == userID);
    const isGenderCompatible = (genderPre == "all" || genderPre == "Both)" ? true : gender == genderPre);
    const otherUserProfileIsPublic = (otherUser.settings && otherUser.settings.show_me != null) ? otherUser.settings.show_me : true;
    if (
      firstName &&
      (email || phone) &&
      profilePictureURL &&
      (location || appDistance == "unlimited") &&
      isNotCurrentUser &&
      hasPreviouslyNotBeenSwiped &&
      isGenderCompatible &&
      otherUserProfileIsPublic &&
      hasNotBeenBlockedByCurrentUser
    ) {
      if (!location) {
        otherUser.distance = IMLocalized("Unknown distance");
        return otherUser;
      }

      otherUser.distance = distance(
        location.latitude,
        location.longitude,
        myPosition.latitude,
        myPosition.longitude
      );

      if (appDistance == "unlimited" || otherUser.distance <= distanceValue) {
        return otherUser;
      }
    }
    return null;
  };

  const distance = (lat1, lon1, lat2, lon2, unit = "M") => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      if (dist > 1) {
        dist = 1;
      }

      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      if (unit == "K") {
        dist = dist * 1.609344;
      }

      if (unit == "N") {
        dist = dist * 0.8684;
      }

      return dist;
    }
  };

  const getMoreRecommendations = async () => {
    if (isLoadingRecommendations) {
      return;
    }
    isLoadingRecommendations = true;

    const shouldFetchRecommendations = (recommendations.length < swipeThreshold.current);
    if (!shouldFetchRecommendations) {
      return;
    }

    setLoadedDeck(false);

    try {
      const documentSnapshots = await recommendationRef.current.get();

      if (documentSnapshots.docs.length > 0) {
        // Get the last visible recommendation document
        lastVisibleRecommendation.current =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        updateRecommendations(documentSnapshots);

        // Construct a new query starting at this document,
        recommendationRef.current = usersRef
          .orderBy("id", "desc")
          .startAfter(lastVisibleRecommendation.current)
          .limit(recommendationBatchLimit.current);
      } else {
        setLoadedDeck(true);
        setRecommendations([...recommendations, ...[]]);
      }
      isLoadingRecommendations = false;
    } catch (error) {
      console.log(error);
      isLoadingRecommendations = false;
    }
  };

  const updateRecommendations = async documentSnapshots => {
    const myLocation = user.position || user.location;

    if (!myLocation) {
      return;
    }
    if (documentSnapshots.length == 0) {
      setLoadedDeck(true);
      return;
    }

    try {
      const recommendationPromises = documentSnapshots._docs.map(async doc => {
        const recommendation = await filterUsersForRecommendation(doc.data(), myLocation);
        if (recommendation) {
          return recommendation;
        }
      });

      const promisedRecommendations = await Promise.all(recommendationPromises);
      const cleanedRecommendations = promisedRecommendations.filter(recommendation => recommendation != null);
      if (cleanedRecommendations.length > 0) {
        setRecommendations([...recommendations, ...cleanedRecommendations]);
        setLoadedDeck(true);
      } else {
        getMoreRecommendations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSwipe = (type, item, index, isSwipeGesture) => {
    if (!item) {
      return;
    }
    swipeTracker.addSwipe(user, item, type, response => {
    });

    if (recommendations.length === 0) {
      getMoreRecommendations();
      return;
    }

    if (isSwipeGesture) {
      if (bottomTabPressCount.current > 0) {
        recommendations.splice(0, bottomTabPressCount.current + 1);
      } else {
        recommendations.splice(index, 1);
      }

      bottomTabPressCount.current = 0;
    } else {
      recommendations.splice(index, 1);
      bottomTabPressCount.current += 1;
    }
    setRecommendations([...recommendations]);
  };

  const renderCard = item => {
    return (
      <TinderCard
        key={"TinderCard" + item.userID}
        url={item.profilePictureURL}
        name={item.firstName}
        age={item.age}
        school={item.school}
        distance={item.distance}
        setShowMode={setShowMode}
      />
    );
  };

  const renderCardDetail = (item, isDone) => {
    return (
      <CardDetailsView
        key={"CardDetail" + item.userID}
        profilePictureURL={item.profilePictureURL}
        firstName={item.firstName}
        lastName={item.lastName}
        age={item.age}
        school={item.school}
        distance={item.distance}
        bio={item.bio}
        instagramPhotos={item.photos ? item.photos : []}
        setShowMode={setShowMode}
        onSwipe={direction => {
          setActionsFromCardDetail([...actionsFromCardDetail, direction]);
        }}
        isDone={isDone}
        bottomTabBar={true}
      />
    );
  };

  const renderEmptyState = () => {
    return (
      <NoMoreCard
        profilePictureURL={user.profilePictureURL}
      />
    );
  };

  const renderNewMatch = () => {
    return (
      <NewMatch
        url={currentMatchData.profilePictureURL}
        onSendMessage={() => handleNewMatchButtonTap("Conversations")}
        onKeepSwiping={handleNewMatchButtonTap}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          {(loadedDeck || recommendations.length > 0) && (
            <Deck
              actionsFromCardDetail={actionsFromCardDetail}
              data={recommendations}
              renderCard={renderCard}
              renderCardDetail={renderCardDetail}
              renderNoMoreCards={renderEmptyState}
              renderNewMatch={renderNewMatch}
              onSwipeLeft={(item, index, isSwipeGesture) =>
                onSwipe("dislike", item, index, isSwipeGesture)
              }
              onSwipeRight={(item, index, isSwipeGesture) =>
                onSwipe("like", item, index, isSwipeGesture)
              }
              showMode={showMode}
            />
          )}
          <ActivityModal
            loading={loadedDeck === false && recommendations.length === 0}
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

SwipeScreen.navigationOptions = ({ screenProps, navigation }) => {
  let currentTheme = DynamicAppStyles.navThemeConstants[screenProps.theme];
  return {
    headerTitle: (
      <TNTouchableIcon
        imageStyle={{ tintColor: DynamicAppStyles.colorSet.mainThemeForegroundColor }}
        iconSource={DynamicAppStyles.iconSet.fireIcon}
        onPress={() => navigation.navigate('MainStack', { appStyles: DynamicAppStyles })}
        appStyles={DynamicAppStyles}
      />
    ),
    headerRight: (
      <TNTouchableIcon
        imageStyle={{ tintColor: '#d1d7df' }}
        iconSource={DynamicAppStyles.iconSet.conversations}
        onPress={() => navigation.navigate('Conversations', { appStyles: DynamicAppStyles })}
        appStyles={DynamicAppStyles}
      />
    ),
    headerLeft: (
      <TNTouchableIcon
        imageStyle={{ tintColor: '#d1d7df' }}
        iconSource={DynamicAppStyles.iconSet.userProfile}
        onPress={() => navigation.navigate('MyProfileStack', { appStyles: DynamicAppStyles })}
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

const styles = StyleSheet.create({

});

//'https://pbs.twimg.com/profile_images/681369932207013888/CHESpTzF.jpg'

export default SwipeScreen;
