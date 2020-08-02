import auth from '@react-native-firebase/auth';
class Store {
  isLoggedIn = () => auth().currentUser == undefined;

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
}

const FBS = new Store();
export default FBS;
