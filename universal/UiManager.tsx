import { observable, action, autorun } from "mobx"
import { lightTheme, darkTheme } from "./Theme"
import { Colors } from "react-native-ui-lib"
import { themehelper } from "./Theme"
import AsyncStorage from '@react-native-community/async-storage';
import * as TaskManager from 'expo-task-manager'
import { GeoLocationUpdates } from "../App";



export enum ThemeType
{
	LIGHT = 0,
	DARK = 1,
}

const granted = "granted"
const notGranted = "not granted"
export class Store
{

	@observable themeType = ThemeType.LIGHT
	@observable theme = lightTheme
	@observable setting: any = { theme: false }

	@observable isLocationGranted: boolean |undefined = undefined;

	@action setLocationGranted = ( val: boolean ) =>
	{
		this.isLocationGranted = val
		AsyncStorage.setItem( "locationGranted", val ? granted : notGranted )
		const defined = TaskManager.isTaskDefined( "geoLocation" )
		
		if ( val && !defined)
		{
			TaskManager.defineTask( "geoLocation", GeoLocationUpdates)
		} 

		if ( !val && defined )
		{
			TaskManager.unregisterTaskAsync("geoLocation")
		}
	}

	l = autorun( () =>
	{
		if(this.isLocationGranted == undefined)
		AsyncStorage.getItem( "locationGranted" ).then( res =>
		{
			if ( res == granted )
			{
				this.isLocationGranted = true
			} else
			{
				this.isLocationGranted = false
			}			
		})
		
	})

	t = autorun( ( runner ) =>
	{
		if ( this.theme )
		{
			AsyncStorage.getItem( "theme" ).then( ( res ) =>
			{
				this.setThemeType( ThemeType.DARK.toString() == res )
			} )
		}
		runner.dispose()
	} )


	@action setThemeType = ( val: boolean ) =>
	{
		new Promise( resolve =>
		{
			if ( val ) this.themeType = ThemeType.DARK
			else this.themeType = ThemeType.LIGHT
			this.setting.theme = val
			this.theme = this.themeType == ThemeType.DARK ? darkTheme : lightTheme
			AsyncStorage.setItem( "theme", this.themeType.toString() )
			// Colors.loadColors({
			// 	background: this.theme.background,
			// 	primary: this.theme.primary,
			// } )
			themehelper.reviseLoading( this.theme )
			resolve( true )
		} )
	}
}

const tm = new Store()
export default tm
