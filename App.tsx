import React, {useState, useEffect, useRef, lazy, Suspense} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  UIManager,
  Platform,
  LayoutAnimation,
  LogBox,
  YellowBox,
  Linking,
  AppState,
  AppStateEvent,
  AppStateStatus,
} from 'react-native';

import {
  View,
  LoaderScreen,
  Colors,
  Text,
  ProgressBar,
} from 'react-native-ui-lib';
import StackNavigator from './pages/StackNavigator';
import TToast from './components/TToast';
import {ThemeProvider, useTheme} from 'styled-components';
import tm, {ThemeType} from './universal/UiManager';
import {observer} from 'mobx-react';
import * as Font from 'expo-font';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import {eventEmitter, eventStrings} from './universal/EventEmitter';
import psuedoLocationTracker, {
  PsuedoLocationTracker,
} from './data_layer/PsuedoLocationTracker';
import {LocationRegion} from 'expo-location';
import uuidv4 from 'uuid';
import {GetLocationPermission} from './universal/GetLocation';
import RateParty from './components/RateParty';
import {AppEventsLogger} from 'react-native-fbsdk';
import SplashScreen from 'react-native-splash-screen';
import {suppressDeprecationWarnings} from 'moment';
import BusyOverlay from './components/BusyOverlay';
import FireStore from './data_layer/FireStore';

LogBox.ignoreLogs([
  "registerHeadlessTask or registerCancellableHeadlessTask called multiple times for same key 'test worker'",
]);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
}

const StackNav = lazy(() => import('./pages/StackNavigator'));

const App = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const start = async () => setUp();
    start();

    AppState.addEventListener('change', updateStates);

    return () => {
      AppState.removeEventListener('change', updateStates);
    };
  }, []);

  const updateStates = (ap: AppStateStatus) => {
    if (ap == 'active') {
      console.log('updating app');

      FireStore.retrieve.getStreamToParties(10);
      FireStore.retrieve.getPostedEvents();
      FireStore.retrieve.rsvpEvents();
      FireStore.retrieve.getPostedEvents();
    }
  };

  const setUp = async () => {
    console.log('app loading');
    try {
      GetLocationPermission();
      await Font.loadAsync({
        // Nunito_Black: require( "./assets/fonts/Nunito/Nunito-Black.ttf" ),
        // RR: require( "./assets/fonts/Red_Rose/RedRose-Regular.ttf" )
      });
      setProgress(20);
      FireStore.retrieve.getStreamToPastParties(10);
      await FireStore.retrieve.getStreamToParties(10);
      setProgress(80);
      SplashScreen.hide();
      // setLoading(false);
    } catch (err) {
      console.log('loading app went wrongly');
    }
  };

  if (loading) {
    return (
      <View flex center bg-background>
        <Text>hello worls</Text>
        <ProgressBar
          progress={progress}
          height={30}
          backgroundColor={Colors.grey30}
          progressBackgroundColor={Colors.primary}
          containerStyle={{
            width: '80%',
            elevation: 10,
            borderRadius: 90,
            overflow: 'hidden',
          }}
        />
      </View>
    );
  }

  return (
    <ThemeProvider theme={tm.theme}>
      <StatusBar
        animated
        translucent
        backgroundColor={Colors.background}
        barStyle={
          tm.themeType == ThemeType.DARK ? 'light-content' : 'dark-content'
        }
      />
      <View flex bg-background>
        <Suspense fallback={<LoaderScreen />}>
          <StackNav />
        </Suspense>
        <TToast />
      </View>
    </ThemeProvider>
  );
};

export default observer(App);
