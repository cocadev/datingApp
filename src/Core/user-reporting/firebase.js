import firebase from 'react-native-firebase';

const abuseDBRef = firebase
    .firestore()
    .collection("reports");

export const markAbuse = (fromUserID, toUserID, abuseType) => {
    return new Promise(resolve => {
        const data = {
            dest: toUserID,
            source: fromUserID,
            type: abuseType,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        abuseDBRef
            .add(data)
            .then(() => {
                resolve({ success: true })
            })
            .catch(error => {
                resolve({ error: error })
            })
    });
};

export const unsubscribeAbuseDB = (userID, callback) => {
    abuseDBRef
        .where('source', '==', userID)
        .onSnapshot(querySnapshot => {
            const abuses = [];
            querySnapshot.forEach(doc => {
                abuses.push(doc.data());
            });
            return callback(abuses);
        });
};
