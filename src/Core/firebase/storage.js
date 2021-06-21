import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import { ErrorCode } from '../onboarding/utils/ErrorCode';

export const uploadFileWithProgressTracking = async (
  filename,
  uploadUri,
  callbackSuccess,
  callbackError,
) => {
  firebase
    .storage()
    .ref(filename)
    .putFile(uploadUri)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => callbackSuccess(snapshot, firebase.storage.TaskState.SUCCESS),
      callbackError,
    );
};

const uploadImage = (uri) => {
  return new Promise((resolve, _reject) => {
    console.log('uri ==', uri);
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log('filename ==', filename);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    firebase
      .storage()
      .ref(filename)
      .putFile(uploadUri)
      .then(function (snapshot) {
        resolve({ downloadURL: snapshot.downloadURL });
      })
      .catch(_error => {
        resolve({ error: ErrorCode.photoUploadFailed });
      });
  });
}

const firebaseStorage = {
  uploadImage,
  uploadFileWithProgressTracking
}

export {
  firebaseStorage
};
