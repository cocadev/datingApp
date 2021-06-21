import firebase from 'react-native-firebase';

const usersRef = firebase
  .firestore()
  .collection("users");

const swipesRef = firebase
  .firestore()
  .collection("swipes");

const onCollectionUpdate = (querySnapshot, callback) => {
  const data = [];
  querySnapshot.forEach(doc => {
    const temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });
  return callback(data, usersRef);
};

export const subscribeToInboundSwipes = (userId, callback) => {
  return swipesRef
    .where('swipedProfile', '==', userId)
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback));
};

export const subscribeToOutboundSwipes = (userId, callback) => {
  return swipesRef
    .where('author', '==', userId)
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback));
};

export const addSwipe = (fromUserID, toUserID, type, callback) => {
  swipesRef
    .add({
      author: fromUserID,
      swipedProfile: toUserID,
      type: type,
      hasBeenSeen: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      callback({ success: true });
    })
    .catch(error => {
      callback({ error: error });
    });
};

export const markSwipeAsSeen = (fromUserID, toUserID) => {
  swipesRef
    .where("author", "==", fromUserID)
    .where("swipedProfile", "==", toUserID)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({
          hasBeenSeen: true
        })
      });
    });
};
