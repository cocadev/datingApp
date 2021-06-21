import firebase from 'react-native-firebase';
import { ErrorCode } from '../onboarding/utils/ErrorCode';

const usersRef = firebase
  .firestore()
  .collection("users");

export const retrievePersistedAuthUser = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            resolve(document.data());
          })
          .catch(errror => {
            resolve(null);
          })
      } else {
        resolve(null);
      }
    });
  });
};

const signInWithCredential = (credential, appIdentifier) => {
  return new Promise((resolve, _reject) => {
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(response => {
        const isNewUser = response.additionalUserInfo.isNewUser;
        const { first_name, last_name } = response.additionalUserInfo.profile;
        const { uid, email, phoneNumber, photoURL } = response.user._user;
        if (isNewUser) {
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const userData = {
            id: uid,
            email: email,
            firstName: first_name,
            lastName: last_name,
            phone: phoneNumber,
            profilePictureURL: photoURL,
            userID: uid,
            appIdentifier,
            created_at: timestamp,
            createdAt: timestamp
          };
          usersRef
            .doc(uid)
            .set(userData)
            .then(() => {
              resolve({ user: userData, accountCreated: true });
            })
        }
        usersRef
          .doc(uid)
          .get()
          .then(document => {
            resolve({ user: document.data(), accountCreated: false });
          })
      })
      .catch(_error => {
        resolve({ error: ErrorCode.serverError });
      })
  });
};

export const register = (userDetails, appIdentifier) => {
  const { email, firstName, lastName, password, phone, profilePictureURL, location, signUpLocation } = userDetails;
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const uid = response.user.uid;
        const data = {
          id: uid,
          userID: uid, // legacy reasons
          email,
          firstName,
          lastName,
          phone,
          profilePictureURL,
          location,
          signUpLocation,
          appIdentifier,
          createdAt: timestamp,
          created_at: timestamp
        };
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            resolve({ user: data });
          })
          .catch(error => {
            alert(error);
            resolve({ error: ErrorCode.serverError });
          })
      })
      .catch(error => {
        var errorCode = ErrorCode.serverError;
        if (error.code === 'auth/email-already-in-use') {
          errorCode = ErrorCode.emailInUse;
        }
        resolve({ error: errorCode });
      });
  });
};

export const loginWithEmailAndPassword = async (email, password) => {
  return new Promise(function (resolve, reject) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user._user.uid;
        const userData = {
          email,
          password,
          id: uid
        };
        usersRef
          .doc(uid)
          .get()
          .then(function (firestoreDocument) {
            if (!firestoreDocument.exists) {
              resolve({ errorCode: ErrorCode.noUser });
              return;
            }
            const user = firestoreDocument.data();
            const newUserData = {
              ...userData,
              ...user
            };
            resolve({ user: newUserData });
          })
          .catch(function (_error) {
            resolve({ error: ErrorCode.serverError });
          });
      })
      .catch(error => {
        var errorCode = ErrorCode.serverError;
        switch (error.code) {
          case 'auth/wrong-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/network-request-failed':
            errorCode = ErrorCode.serverError;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }
        resolve({ error: errorCode });
      });
  });
};

export const loginWithFacebook = (accessToken, appIdentifier) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
  return new Promise((resolve, _reject) => {
    signInWithCredential(credential, appIdentifier)
      .then(response => {
        resolve(response)
      })
  });
};

export const logout = () => {
  firebase.auth().signOut();
};

export const retrieveUserByPhone = (phone) => {
  return new Promise(resolve => {
    usersRef
      .where("phone", "==", phone)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.docs.length <= 0) {
          resolve({ error: true });
        } else {
          resolve({ success: true });
        }
      });
  });
};

export const sendSMSToPhoneNumber = phoneNumber => {
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        resolve({ confirmationResult });
      })
      .catch(function (_error) {
        resolve({ error: ErrorCode.smsNotSent })
      });
  });
}

export const loginWithSMSCode = (smsCode, verificationID) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationID, smsCode);
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(result => {
        const { user } = result;
        usersRef
          .doc(user.uid)
          .get()
          .then(function (firestoreDocument) {
            if (!firestoreDocument.exists) {
              resolve({ errorCode: ErrorCode.noUser });
              return;
            }
            const userData = firestoreDocument.data();
            resolve({ user: userData });
          })
          .catch(function (_error) {
            resolve({ error: ErrorCode.serverError });
          });
      })
      .catch(_error => {
        resolve({ error: ErrorCode.invalidSMSCode })
      });
  });
}

export const registerWithPhoneNumber = (userDetails, smsCode, verificationID, appIdentifier) => {
  const { firstName, lastName, phone, profilePictureURL, location, signUpLocation } = userDetails;
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationID, smsCode);
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(response => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const uid = response.user.uid;
        const data = {
          id: uid,
          userID: uid, // legacy reasons
          firstName,
          lastName,
          phone,
          profilePictureURL,
          location,
          signUpLocation,
          appIdentifier,
          created_at: timestamp,
          createdAt: timestamp
        };
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            resolve({ user: data });
          })
      })
      .catch(error => {
        var errorCode = ErrorCode.serverError;
        if (error.code === 'auth/email-already-in-use') {
          errorCode = ErrorCode.emailInUse;
        }
        resolve({ error: errorCode });
      });
  });
};

export const updateProfilePhoto = (userID, profilePictureURL) => {
  return new Promise((resolve, _reject) => {
    usersRef
      .doc(userID)
      .update({ profilePictureURL: profilePictureURL })
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        resolve({ error: error });
      })
  });
}

export const fetchPushTokenIfPossible = async () => {
  const messaging = firebase.messaging();
  const hasPushPermissions = await messaging.hasPermission();
  if (hasPushPermissions) {
    return await messaging.getToken();
  }
  await messaging.requestPermission();
  return await messaging.getToken();
}

export const updateUser = async (userID, newData) => {
  const dataWithOnlineStatus = {
    ...newData,
    lastOnlineTimestamp: firebase.firestore.FieldValue.serverTimestamp()
  }
  return await usersRef.doc(userID).update({ ...dataWithOnlineStatus });
}
