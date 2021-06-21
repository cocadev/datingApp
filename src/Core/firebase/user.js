import firebase from 'react-native-firebase';

export const usersRef = firebase
  .firestore()
  .collection("users");

export const getUserData = async userId => {
  try {
    const user = await usersRef.doc(userId).get();

    return { data: { ...user.data(), id: user.id }, success: true };
  } catch (error) {
    console.log(error);
    return { error: 'Oops! an error occured. Please try again', success: false };
  }
};

export const updateUserData = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId);

    await userRef.update({
      ...userData,
    });

    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const subscribeUsers = (userId, callback) => {
  return usersRef.onSnapshot(querySnapshot => {
    const data = [];
    const completeData = [];
    querySnapshot.forEach(doc => {
      const user = doc.data();
      if (doc.id != userId) {
        data.push({ ...user, id: doc.id });
      }
      completeData.push({ ...user, id: doc.id });
    });
    return callback(data, completeData);
  });
};
