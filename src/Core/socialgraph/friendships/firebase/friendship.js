import firebase from 'react-native-firebase';

const usersRef = firebase
  .firestore()
  .collection("users");

const friendshipsRef = firebase
  .firestore()
  .collection("friendships");

const onCollectionUpdate = (querySnapshot, callback) => {
  const data = [];
  querySnapshot.forEach(doc => {
    const temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });
  return callback(data, usersRef);
};

export const subscribeToInboundFriendships = (userId, callback) => {
  return friendshipsRef
    .where('user2', '==', userId)
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback));
};

export const subscribeToOutboundFriendships = (userId, callback) => {
  return friendshipsRef
    .where('user1', '==', userId)
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback));
};

export const addFriendRequest = (fromUserID, toUserID, callback) => {
  friendshipsRef
    .add({
      user1: fromUserID,
      user2: toUserID,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      callback({ success: true });
    })
    .catch(error => {
      callback({ error: error });
    });
};

export const cancelFriendRequest = (currentUserID, toUserID, callback) => {
  const query = friendshipsRef
    .where('user1', "==", currentUserID)
    .where('user2', '==', toUserID)
  const db = firebase.firestore();
  let batch = db.batch();
  const unsubscribe = query.onSnapshot(querySnapshot => {
    if (querySnapshot) {
      querySnapshot.forEach(doc => {
        let ref = friendshipsRef.doc(doc.id);
        batch.delete(ref);
      });
      // Commit the batch
      batch.commit().then(function () {
        unsubscribe();
        callback({ success: true });
      });
    }
  });
};

export const unfriend = async (currentUserID, toUserID, callback) => {
  cancelFriendRequest(currentUserID, toUserID, _response => {
    cancelFriendRequest(toUserID, currentUserID, response => {
      callback(response)
    })
  })
};
