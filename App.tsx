import React, { useState, useEffect, useRef } from 'react';
import 'react-native-gesture-handler';
import
{
  SafeAreaView,
  StyleSheet,
  StatusBar,
  UIManager,
  Platform,
  LayoutAnimation,
  LogBox,
  YellowBox,
} from 'react-native';

import
{
  View, LoaderScreen, Colors
} from 'react-native-ui-lib'
import StackNavigator from './pages/StackNavigator';
import TToast from './components/TToast';
import { ThemeProvider, useTheme } from "styled-components"
import tm, { ThemeType } from './universal/UiManager';
import { observer } from 'mobx-react';
import * as Font from 'expo-font'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { eventEmitter, eventStrings } from './universal/EventEmitter';
import psuedoLocationTracker, { PsuedoLocationTracker } from './data_layer/PsuedoLocationTracker';
import { LocationRegion } from 'expo-location';
import uuidv4 from 'uuid';
import { GetLocationPermission } from './universal/GetLocation';
import RateParty from './components/RateParty';
import { AppEventsLogger } from 'react-native-fbsdk';
import SplashScreen from 'react-native-splash-screen'


YellowBox.ignoreWarnings( [
  "registerHeadlessTask or registerCancellableHeadlessTask called multiple times for same key 'test worker'"

])


if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental )
{
  UIManager.setLayoutAnimationEnabledExperimental( true )
  // LayoutAnimation.configureNext( LayoutAnimation.Presets.linear )
}


const App = () =>
{
  SplashScreen.hide()
  const theme = useTheme()
  const [loading, setLoading] = useState( true )
  useEffect( () =>
  {

    console.log("app loading");
    
    Font.loadAsync( {
      // Nunito_Black: require( "./assets/fonts/Nunito/Nunito-Black.ttf" ),
      // RR: require( "./assets/fonts/Red_Rose/RedRose-Regular.ttf" )
    } ).then( () =>
    {
      setLoading( false )


     GetLocationPermission()
    } )
  }, [] )


  if ( loading )
  {
    return <View flex center bg-background>
      <LoaderScreen />
    </View>
  }

  return (
    <ThemeProvider theme={tm.theme} >
      <StatusBar animated translucent backgroundColor={Colors.background} barStyle={tm.themeType == ThemeType.DARK ? "light-content" : "dark-content"} />
      <View flex bg-background>
        <StackNavigator />
        <TToast />
        <RateParty />
      
      </View>
    </ThemeProvider>
  )




  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>

      </SafeAreaView>
    </>
  );
};


export default observer( App );
