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
} from 'react-native';

import
{
  View, LoaderScreen, Colors
} from 'react-native-ui-lib'
import StackNavigator from './pages/StackNavigator';
import TToast from './components/TToast';
import { ThemeProvider } from "styled-components"
import tm, { ThemeType } from './universal/UiManager';
import { observer } from 'mobx-react';
import * as Font from 'expo-font'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { eventEmitter, eventStrings } from './universal/EventEmitter';
import psuedoLocationTracker, { PsuedoLocationTracker } from './data_layer/PsuedoLocationTracker';
import { LocationRegion } from 'expo-location';
import uuidv4 from 'uuid';

let values = []

const ps = new PsuedoLocationTracker()
// runs with new values everytime
const GeoLocationUpdates = ( { data, error }: { data: any, error: any }) =>
{
	
			const updateRecieved = (d: LocationRegion[]) =>
			{
				console.log( `this is the amount on location region update ${ d.length }` );
				values = d
				ps.watchTheseLocations(d)
				
			}
			
	if(!eventEmitter.eventNames().includes(eventStrings.locationWatchStart))
			eventEmitter.addListener(eventStrings.locationWatchStart, updateRecieved)

	if ( error )
	{
		console.log( error )
		return
	}

	if ( data )
	{
		const { longitude, latitude } = data.locations[0].coords

		console.trace(  `${ps.id}` );
		ps.updateUserLocation( { latitude, longitude } )
	}
	
}

TaskManager.defineTask( "geoLocation", GeoLocationUpdates)

const GetRegions = ({data, error}:any) =>
{
	if ( data )
	{
		console.log(data);
		
	}

	if ( error )
	{
		console.log(`this is an error ${error}`);
		
	}
}

// TaskManager.defineTask("geoLocation", GetRegions)


if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental )
{
  UIManager.setLayoutAnimationEnabledExperimental( true )
  // LayoutAnimation.configureNext( LayoutAnimation.Presets.linear )
}

const App = () =>
{
  const [loading, setLoading] = useState( true )
  let webview = useRef<WebView | null>( null )
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

  const code = `
        console.log("timing");
      `
  useEffect( () =>
  {
    console.log( webview.current?.state );

  }, [webview] )

  if ( loading )
  {
    return <View flex center>
      <LoaderScreen />
    </View>
  }

  return (
    <ThemeProvider theme={tm.theme} >
      <StatusBar animated translucent backgroundColor={Colors.background} barStyle={tm.themeType == ThemeType.DARK ? "light-content" : "dark-content"} />
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
