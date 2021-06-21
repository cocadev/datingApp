import firebase from 'react-native-firebase';
import uuidv4 from 'uuidv4';

const usersRef = firebase
  .firestore()
  .collection("users");

const channelsRef = firebase
  .firestore()
  .collection("channels");

const channelPaticipationRef = firebase
  .firestore()
  .collection("channel_participation");

const onCollectionUpdate = (querySnapshot, userId, callback) => {
  const data = [];
  querySnapshot.forEach(doc => {
    const user = doc.data();
    user.id = doc.id;

    if (user.id != userId) {
      data.push(user);
    }
  });
  return callback(data, channelsRef);
};

export const subscribeChannelParticipation = (userId, callback) => {
  return channelPaticipationRef
    .where('user', '==', userId)
    .onSnapshot(querySnapshot =>
      onCollectionUpdate(querySnapshot, userId, callback),
    );
};

export const subscribeChannels = callback => {
  return channelsRef.onSnapshot(callback);
};

export const subscribeParticipationSnapshot = (channel, userId, callback) => {
  return channelPaticipationRef
    .where('channel', '==', channel.id)
    .onSnapshot(participationSnapshot => {
      const userPromiseArray = [];
      participationSnapshot.forEach(participationDoc => {
        const participation = participationDoc.data();
        participation.id = participationDoc.id;
        if (participation.user != userId) {
          userPromiseArray.push(
            new Promise((userResolve, userReject) => {
              usersRef
                .doc(participation.user)
                .get()
                .then(user => {
                  if (user.data()) {
                    const userData = user.data();
                    userData.id = user.id || user.userID;
                    userData.participationId = participation.id;
                    channel.participants = [...channel.participants, userData];
                  }
                  userResolve();
                });
            }),
          );
        }
      });
      if (userPromiseArray.length > 0) {
        callback(channel, userPromiseArray);
      }
    });
};

export const subscribeThreadSnapshot = (channel, callback) => {
  return channelsRef
    .doc(channel.id)
    .collection('thread')
    .orderBy('created', 'desc')
    .onSnapshot(callback);
};

export const sendMessage = (sender, channel, message, downloadURL) => {
  return new Promise(resolve => {
    const { userID, profilePictureURL } = sender;
    const timestamp = currentTimestamp();
    const data = {
      content: message,
      created: timestamp,
      recipientFirstName: '',
      recipientID: '',
      recipientLastName: '',
      recipientProfilePictureURL: '',
      senderFirstName: sender.firstName || sender.fullname,
      senderID: userID,
      senderLastName: '',
      senderProfilePictureURL: profilePictureURL,
      url: downloadURL,
    };
    const channelID = channel.id;
    channelsRef
      .doc(channelID)
      .collection('thread')
      .add({ ...data })
      .then(() => {
        channelsRef
          .doc(channelID)
          .update({
            lastMessage: (message && message.length > 0) ? message : downloadURL,
            lastMessageDate: timestamp,
          })
          .then(response => {
            resolve({ success: true });
          })
          .catch(error => {
            resolve({ success: false, error: error });
          })
      })
      .catch(error => {
        resolve({ success: false, error: error });
      });
  });
}

export const createChannel = (creator, otherParticipants, name) => {
  return new Promise(resolve => {
    var channelID = uuidv4();
    const id1 = creator.id || creator.userID;
    if (otherParticipants.length == 1) {
      const id2 = otherParticipants[0].id || otherParticipants[0].userID;
      if (id1 == id2) {
        // We should never create a self chat
        resolve({ success: false });
        return;
      }
      channelID = (id1 < id2 ? id1 + id2 : id2 + id1);
    }
    const channelData = {
      creator_id: id1,
      id: channelID,
      channelID,
      name,
      lastMessageDate: currentTimestamp()
    };
    channelsRef
      .doc(channelID)
      .set({
        ...channelData,
      })
      .then(channelRef => {
        persistChannelParticipations([...otherParticipants, creator], channelID)
          .then(response => {
            resolve({ success: response.success, channel: channelData });
          })
      })
      .catch(() => {
        resolve({ success: false });
      });
  });
}

export const persistChannelParticipations = (users, channelID) => {
  return new Promise(resolve => {
    const db = firebase.firestore();
    let batch = db.batch();
    users.forEach(user => {
      let ref = channelPaticipationRef.doc();
      batch.set(ref, {
        channel: channelID,
        user: user.id
      });
    });
    // Commit the batch
    batch.commit().then(function () {
      resolve({ success: true });
    });
  });
}

export const onLeaveGroup = (channelId, userId, callback) => {
  channelPaticipationRef
    .where('channel', '==', channelId)
    .where('user', '==', userId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
        callback({ success: true });
      });
    })
    .catch(error => {
      console.log(error);
      callback({ success: false, error: 'An error occured, please try gain.' });
    });
};

export const onRenameGroup = (text, channel, callback) => {
  channelsRef
    .doc(channel.id)
    .set(channel)
    .then(() => {
      const newChannel = channel;
      newChannel.name = text;
      callback({ success: true, newChannel });
    })
    .catch(error => {
      console.log(error);
      callback({ success: false, error: 'An error occured, please try gain.' });
    });
};

export const currentTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export const filterQuerySnapshot = (self, querySnapshot, channelManager) => {
  const data = [];
  const channelPromiseArray = [];

  querySnapshot.forEach(doc => {
    channelPromiseArray.push(
      new Promise((channelResolve, channelReject) => {
        const channel = doc.data();
        channel.id = doc.id;
        channel.participants = [];
        const filters = self.props.channelParticipations.filter(
          item => item.channel == channel.id,
        );

        if (filters.length > 0) {
          channelManager.subscribeParticipationSnapshot(
            channel,
            self.props.user.id,
            (channel, userPromiseArray) => {
              Promise.all(userPromiseArray).then(values => {
                data.push(channel);
                channelResolve();
              });
            },
          );
        } else {
          channelResolve();
        }
      }),
    );
  });

  return { data, channelPromiseArray };
};
