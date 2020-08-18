import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import
{
  SafeAreaView,
  StyleSheet,
  StatusBar,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';

import
{
  View, LoaderScreen,
} from 'react-native-ui-lib'
import
{
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './pages/StackNavigator';
import TToast from './components/TToast';
import { ThemeProvider } from "styled-components"
import tm from './universal/UiManager';
import { observer } from 'mobx-react';
import * as Font from 'expo-font'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { eventEmitter, eventStrings } from './universal/EventEmitter';
import psuedoLocationTracker from './data_layer/PsuedoLocationTracker';


TaskManager.defineTask( "geoLocation", ( { data, error }: { data: any, error: any } ) =>
{
  if ( error )
  {
    console.log( error )
    return
  }
  const { longitude, latitude } = data.locations[0].coords
  // console.log( longitude, latitude );
  psuedoLocationTracker.updateUserLocation( { latitude, longitude } )

} )



if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental )
{
  UIManager.setLayoutAnimationEnabledExperimental( true )
  LayoutAnimation.configureNext( LayoutAnimation.Presets.linear )
}

const App = () =>
{
  const [loading, setLoading] = useState( true )

  useEffect( () =>
  {
    tm.setThemeType( false )
    Font.loadAsync( {
      Nunito_Black: require( "./assets/fonts/Nunito/Nunito-Black.ttf" ),
      RR: require( "./assets/fonts/Red_Rose/RedRose-Regular.ttf" )
    } ).then( () =>
    {
      setLoading( false )
      // SplashScreen.hideAsync()

      if ( Location.PermissionStatus.DENIED )
        Location.requestPermissionsAsync().then( res =>
        {
          if ( res.granted ) eventEmitter.emit( eventStrings.locationGranted )

          if ( !res.granted ) eventEmitter.emit( eventStrings.locationNotGranted )

        } ).catch( err =>
        {
          console.log( err );
        } )
    } )
  }, [] )

  if ( loading )
  {
    return <View flex center>
      <LoaderScreen />
    </View>
  }

  if ( !loading ) return (
    <ThemeProvider theme={tm.theme} >
      <View flex bg-background>
        <StackNavigator />
        <TToast />

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
