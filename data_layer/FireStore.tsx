import {observable, action} from 'mobx';
import FBS from './FireBaseClient';
import uuidv4 from 'uuid';
import {FeedItemModel} from '../universal/Models';
class Store {
  @observable data = [];
  @observable userName: string | null = null;

  @action isLoggedIn = () => FBS.isLoggedIn();
  @action login = (email: string, password: string) =>
    FBS.login(email, password);
  @action register = (username: string, email: string, password: string) =>
    new Promise((resolve, reject) => {
      FBS.register(username, email, password)
        .then((res) => {
          this.userName = username;
          resolve(true);
        })
        .catch((err) => reject(err));
    });

  @action private sendEvent = (data: FeedItemModel) => {
    data.person = FBS.getUsername() || '';
    data.personId = FBS.getUserId();
    data.priority = data.priority || 0;
    data.reference = uuidv4.v4();
    data.timeStamp = new Date();

    return new Promise((resolve, reject) => {
      FBS.events
        .uploadEvent(data)
        .then((res) => {
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  };

  retrieve = {
    isLoggedIn: this.isLoggedIn,
  };

  send = {
    sendEvent: this.sendEvent,
  };

  auth = {
    login: this.login,
    register: this.register,
  };
}

const FireStore = new Store();
export default FireStore;
