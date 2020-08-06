import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FeedItemModel } from '../universal/Models';
import { errorStrings } from '../universal/EventEmitter';

const eventCollection = 'events';
const userCollection = 'users';
let last: FirebaseFirestoreTypes.QueryDocumentSnapshot | null = null;

class Store
{
  
  resetLast = () => last = null
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
        if ( res )
        {
          data.flyer = res
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
        .set({ events: firestore.FieldValue.arrayUnion(eventId) }, { merge: true });
    } else {
      firestore()
        .doc(`${userCollection}/${auth().currentUser?.uid}`)
        .set({ events: firestore.FieldValue.arrayRemove(eventId) });
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

private getURLForEventFlyers = (imagePath: string) => {
		return new Promise<string>((resolve, reject): any => {
			// return reject(false)
			storage()
				.ref(imagePath)
				.getDownloadURL()
				.then((url) => {
					resolve(url)
				})
				.catch((err) => {
					reject(err)
				})
		})
}
  
  private getEventsInCategories = (amount: number) => {
		//will have to get a large collection and filter them down the line
		return new Promise(async (resolve, reject) => {
			const ref = firestore()
				.collection(eventCollection)
				// .where("partyType", "in", [0, 1, 13, 3, 4, 5, 6, 7, 8, 9])
				.limit(amount)
			ref
				.get()
				.then((values) => {
					resolve(values)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
  events = {
    uploadEvent: this.uploadEvent,
    getEventsByMultiple: this.getEventsInMultiplies,
    getUrlForFlyers: this.getURLForEventFlyers,
    getEventsInCategories : this.getEventsInCategories,
  };
}

const FBS = new Store();
export default FBS;
