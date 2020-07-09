import {observable, action, autorun} from "mobx"
import {lightTheme, darkTheme} from "../universial/Theme"
import {Colors} from "react-native-ui-lib"
import {AsyncStorage} from "react-native"
import themeHelper from "../universial/ThemeHelper"

export enum ThemeType {
	LIGHT = 0,
	DARK = 1,
}
export class Store {
	@observable themeType = ThemeType.LIGHT
	@observable theme = lightTheme
	@observable setting: any = {theme: false}
	@observable userImageUri = ""

	v = autorun(() => {
		AsyncStorage.setItem("userImage", this.userImageUri)
	})

	t = autorun((runner) => {
		if (this.theme) {
			AsyncStorage.getItem("theme").then((res) => {
				if (res) {
					this.setThemeType(ThemeType.DARK.toString() == res)
				} else {
					this.setThemeType(ThemeType.DARK.toString() == res)
				}
			})
		}
		runner.dispose()
	})

	@action clearTheme = () => {
		AsyncStorage.removeItem("theme")
		this.theme = lightTheme
		themeHelper.reviseLoading(this)
		this.setting.theme = false
	}
	@action setThemeType = (val: boolean) => {
		if (val) this.themeType = ThemeType.DARK
		else this.themeType = ThemeType.LIGHT
		this.setting.theme = val
		this.theme = this.themeType == ThemeType.DARK ? darkTheme : lightTheme
		AsyncStorage.setItem("theme", this.themeType.toString())
		// Colors.loadColors({
		// 	background: this.theme.background,
		// 	primary: this.theme.primary,
		// } )
		themeHelper.reviseLoading(this)
	}
}

const uiManager = new Store()
export default uiManager
