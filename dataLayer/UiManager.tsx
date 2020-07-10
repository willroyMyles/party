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

	@observable userName = ""

	v = autorun(async () => {
		if (this.userImageUri == "") {
			const img = await AsyncStorage.getItem("userImage")
			this.userImageUri = img || ""
			return
		} else {
			AsyncStorage.setItem("userImage", this.userImageUri)
			return
		}
	})

	un = autorun(async () => {
		if (this.userName == "") {
			const name = await AsyncStorage.getItem("userName")
			this.userName = name || ""
		} else {
			AsyncStorage.setItem("userName", this.userName)
		}
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
