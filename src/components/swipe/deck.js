import React, { useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Modal
} from "react-native";
import PropTypes from "prop-types";
import BottomTabBar from "./bottom_tab_bar";
import * as Statics from "../../helpers/statics";
import { IMLocalized } from "../../Core/localization/IMLocalization";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Deck = props => {
  const position = useRef(new Animated.ValueXY());
  const currentIndex = useRef(0);

  useEffect(() => {
    const { actionsFromCardDetail } = props;

    if (actionsFromCardDetail.length > 0) {
      onSwipeFromCardDetail(
        actionsFromCardDetail[actionsFromCardDetail.length - 1]
      );
    }
  }, [props.actionsFromCardDetail]);

  const rotate = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-30deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });
  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate
      },
      ...position.current.getTranslateTransform()
    ]
  };
  const likeOpacity = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });
  const dislikeOpacity = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp"
  });
  const nextCardOpacity = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp"
  });
  const nextCardScale = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp"
  });

  const onDislikePressed = (isSwipeGesture = false) => {
    const { onSwipeLeft, data } = props;
    const item = data[currentIndex.current];

    Animated.spring(position.current, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 }
    }).start(() => {
      onSwipeLeft(item, currentIndex.current, isSwipeGesture);
      position.current.setValue({ x: 0, y: 0 });
    });
  };

  const onLikePressed = (isSwipeGesture = false) => {
    const { onSwipeRight, data } = props;
    const item = data[currentIndex.current];

    Animated.spring(position.current, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 }
    }).start(() => {
      onSwipeRight(item, currentIndex.current, isSwipeGesture);
      position.current.setValue({ x: 0, y: 0 });
    });
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
          return false;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
          return false;
        },
        onPanResponderMove: (evt, gestureState) => {
          position.current.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderEnd: (evt, gestureState) => {
          if (gestureState.dx > 120) {
            onLikePressed(true);
          } else if (gestureState.dx < -120) {
            onDislikePressed(true);
          } else {
            Animated.spring(position.current, {
              toValue: { x: 0, y: 0 },
              friction: 4,
              useNativeDriver: true
            }).start();
          }
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          const { dx, dy } = gestureState;

          return dx > 2 || dx < -2 || dy > 2 || dy < -2;

          // return !(gestureState.dx === 0 && gestureState.dy === 0);
        }
      }),
    []
  );

  const onSwipeFromCardDetail = direction => {
    if (direction === "left") {
      onDislikePressed();
    } else {
      onLikePressed();
    }
  };

  const renderBottomTabBar = (containerStyle, buttonContainerStyle) => {
    return (
      <View style={{ marginBottom: -8 }}>
        <BottomTabBar
          onDislikePressed={onDislikePressed}
          onSuperLikePressed={onLikePressed}
          onLikePressed={onLikePressed}
          containerStyle={containerStyle}
          buttonContainerStyle={buttonContainerStyle}
        />
      </View>
    );
  };

  const renderCards = () => {
    const { renderCard, renderNoMoreCards, data } = props;

    if (currentIndex.current >= data.length) {
      return <View style={styles.noMoreCards}>{renderNoMoreCards()}</View>;
    }

    return data
      .map((item, i) => {
        const nextItem = data[currentIndex.current + 1]
          ? data[currentIndex.current + 1]
          : item;

        if (i < currentIndex.current) {
          return null;
        } else if (i === currentIndex.current) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              key={i + ""}
              style={[rotateAndTranslate, styles.topCardContainer]}
            >
              <Animated.View
                style={[
                  {
                    opacity: likeOpacity,
                    transform: [{ rotate: "-30deg" }]
                  },
                  styles.likeTextContainer
                ]}
              >
                <Text style={styles.likeText}>{IMLocalized("LIKE")}</Text>
              </Animated.View>

              <Animated.View
                style={[
                  {
                    opacity: dislikeOpacity,
                    transform: [{ rotate: "30deg" }]
                  },
                  styles.nopeTextContainer
                ]}
              >
                <Text style={styles.nopeText}>{IMLocalized("NOPE")}</Text>
              </Animated.View>
              {renderCard(item)}
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  opacity: nextCardOpacity,
                  transform: [{ scale: nextCardScale }]
                },
                styles.topCardContainer
              ]}
            >
              <Animated.View
                style={[
                  {
                    opacity: 0,
                    transform: [{ rotate: "-30deg" }]
                  },
                  styles.likeTextContainer
                ]}
              >
                <Text style={styles.likeText}>{IMLocalized("LIKE")}</Text>
              </Animated.View>

              <Animated.View
                style={[
                  {
                    opacity: 0,
                    transform: [{ rotate: "30deg" }]
                  },
                  styles.nopeTextContainer
                ]}
              >
                <Text style={styles.nopeText}>{IMLocalized("NOPE")}</Text>
              </Animated.View>
              {renderCard(nextItem)}
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  const { showMode, renderCardDetail, data, renderNewMatch } = props;

  return (
    <View style={styles.container}>
      {renderCards()}
      {showMode == 1 && data[currentIndex.current] && (
        <Modal animationType={"slide"}>
          <View style={styles.cardDetailContainer}>
            <View style={styles.cardDetailL}>
              {renderCardDetail(data[currentIndex.current])}
            </View>
          </View>
        </Modal>
      )}
      {renderBottomTabBar()}
      {showMode == 2 && (
        <Modal
          transparent={false}
          visible={showMode == 2 ? true : false}
          animationType={"slide"}
        >
          <View style={styles.newMatch}>{renderNewMatch()}</View>
        </Modal>
      )}
    </View>
  );
};

Deck.propTypes = {
  renderNewMatch: PropTypes.func,
  showMode: PropTypes.number,
  onSwipe: PropTypes.func,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  data: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  renderCardDetail: PropTypes.func.isRequired,
  renderNoMoreCards: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  cardDetailContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  cardDetailL: {
    // position: 'absolute',
    // bottom: 0,
    width: Statics.DEVICE_WIDTH,
    height: Statics.DEVICE_HEIGHT * 0.95,
    // paddingBottom: size(100),
    backgroundColor: "white"
  },
  newMatch: {
    // position: 'absolute',
    // bottom: 0,
    width: Statics.DEVICE_WIDTH,
    height: Statics.DEVICE_HEIGHT,
    backgroundColor: "white"
  },
  noMoreCards: {
    position: "absolute",
    top: 0,
    bottom: 50,
    left: 0,
    right: 0,
    width: Statics.DEVICE_WIDTH
  },
  topCardContainer: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: "absolute"
  },
  nopeText: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  },
  likeText: {
    borderWidth: 1,
    borderColor: "green",
    color: "green",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  },
  likeTextContainer: {
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 1000
  },
  nopeTextContainer: {
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 1000
  }
});

export default Deck;
