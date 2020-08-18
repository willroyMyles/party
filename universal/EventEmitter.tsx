import { EventEmitter } from 'events';
import TToast from '../components/TToast';

export const eventEmitter = new EventEmitter();

export const eventStrings = {
  themeChanged: 'theme changed enuh pawdi',
  eventClicked: 'event clicked',
  locationNotGranted: "when user denies location",
  locationGranted: "when user grants location",
  locationConfirmed:
    'used when confirmed is pressed to relay location to create pot view',
  dataFromProviderFinishedLoad: 'used to signal data finished loading',
  loggingIn: 'used when logging in or signing up ',
  imageGotten:
    'used to signal to past image view that a new images has been recieved',
  locationEntered: 'used when a geo fence is entered',
  locationExited: 'used when a geo fence is exited',
  showToast: {
    working: 'used when sneding data to back end',
    success: 'used when an operation is successful',
    error: 'used when some thing went wrong',
  },
};

export const errorStrings = {
  notLoggedIn: 'you need to be logged in to complete this operation',
};

export const HandleFirebaseErrors = ( code: string ) =>
{
  console.log( code );

  let es = 'Something went wrong';

  switch ( code )
  {
    case 'auth/user-not-found':
      es = 'No user by that name';
      break;
    case 'auth/wrong-password':
      es = 'invalid username or password';
      break;
    case 'auth/invalid-email':
      es = 'invalid username or password';
      break;
  }
  TToast.error( 'Opps', es );
};
