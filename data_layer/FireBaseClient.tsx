import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {FeedItemModel} from '../universal/Models';
import {errorStrings} from '../universal/EventEmitter';

const eventCollection = 'events';
const userCollection = 'users';
let last: FirebaseFirestoreTypes.QueryDocumentSnapshot | null = null;

class Store {
  isLoggedIn = () => auth().currentUser != undefined || null;

  login = (email: string, password: string) =>
    new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          resolve(res.user.uid);
        })
        .catch((err) => reject(err));
    });

  register = (username: string, email: string, password: string) =>
    new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          auth()
            .currentUser?.updateProfile({
              displayName: username,
            })
            .then((eh) => {
              resolve(res.user.uid);
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });

  logout = () => auth().signOut();

  uploadPhoto = (data: FeedItemModel): string | any =>
    new Promise(async (resolve) => {
      const filename = data.flyer?.substring(data.flyer?.lastIndexOf('/') + 1);
      const response = await fetch(data.flyer || '');
      const blob = await response.blob();
      const operation = storage().ref(`images/flyers/${filename}`);
      operation
        .put(blob)
        .then((res) => {
          // resolve( true )
          resolve(operation.fullPath);
        })
        .catch((err) => {
          resolve(false);
        });
    });

  uploadEvent = (data: FeedItemModel) =>
    new Promise((resolve, reject) => {
      if (!this.isLoggedIn()) {
        //not logged in
        reject(errorStrings.notLoggedIn);
      }
      this.uploadPhoto(data).then((res: string) => {
        if (res) {
          firestore()
            .collection(eventCollection)
            .doc(data.reference)
            .set(data)
            .then((res) => {
              resolve(true);
              this.updateUserEvents(true, data.reference || '');
            })
            .catch((err) => {
              reject(false);
            });
        } else {
          reject(false);
        }
      });
    });

  updateUserEvents = (add: boolean, eventId: string) => {
    if (add) {
      firestore()
        .doc(`${userCollection}/${auth().currentUser?.uid}`)
        .set({events: firestore.FieldValue.arrayUnion(eventId)}, {merge: true});
    } else {
      firestore()
        .doc(`${userCollection}/${auth().currentUser?.uid}`)
        .set({events: firestore.FieldValue.arrayRemove(eventId)});
    }
  };

  getUsername = () => auth().currentUser?.displayName;
  getUserId = () => auth().currentUser?.uid;

  getEventsInMultiplies = (amount: number) => {
    const order = 'date';
    return new Promise(async (resolve, reject) => {
      if (last == null) {
        console.log('new');

        const firstQuery = firestore()
          .collection(eventCollection)
          .orderBy(order)
          .limit(amount);
        const snapshotQuery = await firstQuery.get();

        if (snapshotQuery.empty) return reject('empty');

        //get the last document
        const lastDocInSnapshotQuery =
          snapshotQuery.docs[snapshotQuery.docs.length - 1];
        last = lastDocInSnapshotQuery;
        resolve(snapshotQuery);
      } else {
        console.log('old', last.id);

        const firstQuery = firestore()
          .collection(eventCollection)
          .orderBy(order)
          .limit(amount)
          .startAfter(last);
        const snapshot = await firstQuery.get();
        if (snapshot.empty) return reject('empty');

        const lastDocInSnapshotQuery = snapshot.docs[snapshot.docs.length - 1];
        last = lastDocInSnapshotQuery;
        resolve(snapshot);
      }
    });
  };

  events = {
    uploadEvent: this.uploadEvent,
    getEventsByMultiple: this.getEventsInMultiplies,
  };
}

const FBS = new Store();
export default FBS;
