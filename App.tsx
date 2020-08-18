import "mobx-react-lite/batchingForReactNative"
import React, { useEffect, useState, ReactNode } from "react"
import { View, Toast } from "react-native-ui-lib"
import { StyleSheet, ActivityIndicator, Platform, UIManager, LayoutAnimation } from "react-native"
import { Colors } from "react-native-ui-lib"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createStackNavigator } from "@react-navigation/stack"
import { observer } from "mobx-react"
import uiManager from "./dataLayer/UiManager"
import { generate } from "@ant-design/colors"
import { ThemeProvider, useTheme } from "styled-components"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import Navigator from "./components/Navigator"
import { eventEmitter, eventStrings } from "./universial/EventEmitter"
import { decode, encode } from "base-64"
import fireSotreMob from "./dataLayer/FireStore"
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
console.ignoredYellowBox = ["Setting a timer"]

import _ from "lodash"
import TToast from "./components/TToast"
import dataProvider from "./dataLayer/DataStore"

TaskManager.isTaskRegisteredAsync( "geoLocation" ).then( res =>
{
	const t = TaskManager.isTaskDefined( "geoLocation" )

	if ( !t )
	{
		console.log( "defining tasks" );

		TaskManager.defineTask( "geoLocation", ( { data, error }: { data: any, error: any } ) =>
		{
			if ( error )
			{
				console.log( error )
				return
			}
			// console.log(data.eventType == Location.GeofencingEventType.Enter,  "taskkkkkssksks");

			if ( data.eventType == Location.GeofencingEventType.Enter )
			{
				eventEmitter.emit( eventStrings.locationEntered, data.region.identifier )
				console.log( "emitting data" );


			}
		} )
	}
} )

//ignores a warning
const _console = _.clone( console )
console.warn = ( message: any ) =>
{
	if ( message.indexOf( "Setting a timer" ) <= -1 )
	{
		_console.warn( message )
	}
}

if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental )
{
	UIManager.setLayoutAnimationEnabledExperimental( true )
	LayoutAnimation.configureNext( LayoutAnimation.Presets.linear )
}
export default observer( function App()
{
	const [loading, setLoading] = useState( true )
	const [activityLoading, setactivityLoading] = useState( false )
	const [showToast, setshowToast] = useState( false )
	const theme = useTheme()

	useEffect( () =>
	{
		if ( !global.btoa )
		{
			global.btoa = encode
		}

		if ( !global.atob )
		{
			global.atob = decode
		}

		SplashScreen.preventAutoHideAsync()

		eventEmitter.addListener( eventStrings.loggingIn, setactivityLoading )
		// eventEmitter.addListener(eventStrings.showToast, setshowToast)
		Font.loadAsync( {
			Nunito_Black: require( "./assets/fonts/Nunito/Nunito-Black.ttf" ),
			Nunito_Regular: require( "./assets/fonts/Nunito/Nunito-Regular.ttf" ),
			Nunito_Semi_Bold: require( "./assets/fonts/Nunito/Nunito-SemiBold.ttf" ),
		} ).then( () =>
		{
			setLoading( false )
			SplashScreen.hideAsync()
		} )

		return () =>
		{
			eventEmitter.removeListener( eventStrings.loggingIn, () => null )
			// eventEmitter.removeListener(eventStrings.showToast, () => null)
		}
	}, [] )

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={uiManager.theme}>
				{!loading && (
					<View style={[styles.container, { backgroundColor: uiManager.theme.background }]}>
						{activityLoading && (
							<View
								center
								style={{
									position: "absolute",
									height: "100%",
									width: "100%",
									backgroundColor: "rgba(0,0,0,.3)",
									zIndex: 1,
								}}>
								<ActivityIndicator size="large" color={Colors.primary} animating={activityLoading} />
							</View>
						)}
						<Navigator />
						<TToast />
					</View>
				)}
			</ThemeProvider>
		</SafeAreaProvider>
	)
} )

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		flexDirection: "column",
		// backgroundColor: uiManager.theme.background,
	},
	text: {
		color: "#fff",
	},
} )
