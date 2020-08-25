import { observable, action, autorun } from "mobx"
import { lightTheme, darkTheme } from "./Theme"
import { Colors } from "react-native-ui-lib"
import { themehelper } from "./Theme"
import AsyncStorage from '@react-native-community/async-storage';



export enum ThemeType
{
	LIGHT = 0,
	DARK = 1,
}
export class Store
{
	@observable themeType = ThemeType.LIGHT
	@observable theme = lightTheme
	@observable setting: any = { theme: false }

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
