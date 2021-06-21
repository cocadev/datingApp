const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();

exports.sendChatPushNotification = functions.firestore
  .document("channels/{some_channel_document}/threads/{some_thread_document}")
  .onWrite((change, context) => {
    const data = change.after.data();
    const senderFirstName = data.senderFirstName;
    const content = data.content;
    const recipientID = data.recipientID;
    const url = data.url;

    let payload = {};

    if (url) {
      payload = {
        notification: {
          title: "New message",
          body: `text: ${senderFirstName} sent a photo`
        }
      };
    } else {
      payload = {
        notification: {
          title: "New message",
          body: `${senderFirstName}: ${content}`
        }
      };
    }

    let pushToken = "";
    return firestore
      .collection("users")
      .doc(recipientID)
      .get()
      .then(doc => {
        pushToken = doc.data().pushToken;
        return admin.messaging().sendToDevice(pushToken, payload);
      });
  });

exports.sendNewMatchPushNotification = functions.firestore
  .document("friendships/{some_friendships_document}")
  .onWrite((change, context) => {
    const data = change.after.data();
    const recipientID = data.user1;
    const payload = {
      notification: {
        title: "New Match",
        body: "You just got a new match!"
      }
    };
    let pushToken = "";

    return firestore
      .collection("users")
      .doc(recipientID)
      .get()
      .then(doc => {
        pushToken = doc.data().pushToken;
        return admin.messaging().sendToDevice(pushToken, payload);
      });
  });
