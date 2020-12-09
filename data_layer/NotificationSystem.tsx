import {action, observable} from 'mobx';
import moment from 'moment';
import * as Notifications from 'expo-notifications';
import FireStore from './FireStore';
import workManager from 'react-native-background-worker';

// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Colors} from 'react-native-ui-lib';
import {Linking} from 'react-native';
import {eventEmitter} from '../universal/EventEmitter';
import {useNavigation} from '@react-navigation/native';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log('NOTIFICATION:', notification);
    let {ref} = notification.data;
    FireStore.lastKnownUrl = ref;

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish('ref');
    eventEmitter.emit('noti', notification.message);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.subText);
    // console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'rsvp-noti', // (required)
    channelName: 'rsvp', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

class NotificationSystem {
  @observable data: Map<string, number> = new Map();
  @observable observed: Set<string> = new Set();
  @observable id: string = '';

  constructor() {
    workManager
      .setWorker({
        type: 'periodic',
        name: 'notofication worker',
        notification: {
          title: 'Checking rsvp events',
          text: 'just a test notification ',
        },
        foregroundBehaviour: 'blocking',
        workflow: async () => this.downloadRsvpEvents(),
        repeatInterval: 1 * 60 * 12, //every 12 hours
        timeout: 1,
        constraints: {
          network: 'connected',
        },
      })
      .then((res) => {
        this.id = res;
      })
      .catch((err) => {
        console.log(`some notification error ${err}`);
      });
  }

  @action addToWatch = (refs: string, date: number) => {
    // if not observed, add to app
    if (!this.observed.has(refs)) this.data.set(refs, date);
  };
  @action removeFromWatch = (refs: string) => {
    // if not observed, add to app
    if (!this.observed.has(refs)) this.data.delete(refs);
  };

  @action downloadRsvpEvents = () =>
    new Promise<void>((resolve, reject) => {
      FireStore.retrieve
        .rsvpEvents()
        .then((_) => {
          [...FireStore.rsvpData.entries()].map(([key, vals], index) => {
            this.addToWatch(key.toString(), vals.dateNum);
          });

          this.checkTime();
          resolve();
        })
        .catch((err) => {
          reject('no rsvp data');
        });
    });

  @action checkTime = () => {
    [...this.data.entries()].map(([key, value], index) => {
      //check if time is the same
      const today = moment().dayOfYear();
      let partyDay = moment(value).dayOfYear();
      const isSameDay = today == partyDay;

      const year = moment().year();
      const partyYear = moment(value).year();
      const isSameYear = year == partyYear;

      if (isSameDay && isSameYear) {
        //add to observed
        this.observed.add(key);
        this.data.delete(key);
        this.process(key);
      }

      if (today > partyDay && isSameYear) {
        this.removeFromWatch(key);
        //should remove from rsvp???
      }
    });
  };

  private process = (ref: string) => {
    //should send notification for it

    const partyData = FireStore.rsvpData.get(ref);

    console.log('should send notification');

    PushNotification.localNotification({
      channelId: 'rsvp-noti',
      message: `your rsvp'd ${partyData?.title}, the event is today ${moment(
        partyData?.start,
      ).format('ddd MMM d, hh:mm a')}`,
      title: 'Party Today',
      actions: ['View', 'Dismiss'], // (Android only) See the doc for notification actions to know more      color: Colors.primary,
      subText: 'This is a subText',
      ticker: 'My Notification Ticker',
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: true,
      userInfo: {ref: partyData?.reference},
    });

    // Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: false,
    //     shouldSetBadge: false,
    //   }),
    // });

    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Party Today',
    //     body: `your rsvp'd ${partyData?.title}, the event is today ${moment(
    //       partyData?.start,
    //     ).format('ddd MMM d, hh:mm a')}`,
    //   },
    //   trigger: {
    //     seconds: 1,
    //   },
    // });
  };
}

const notificationSystem = new NotificationSystem();
export default notificationSystem;
