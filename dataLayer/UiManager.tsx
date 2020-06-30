import {observable, action} from "mobx"
import {lightTheme, darkTheme} from "../universial/Theme"

export enum ThemeType {
	LIGHT = 0,
	DARK = 1,
}
class Store {
	@observable themeType = ThemeType.LIGHT
	@observable theme = lightTheme
	@observable setting: any = {theme: false}
	@action setThemeType = (val: boolean) => {
		if (val) this.themeType = ThemeType.DARK
		else this.themeType = ThemeType.LIGHT
		this.setting.theme = val
		this.theme = ThemeType.DARK ? darkTheme : lightTheme
	}
}

const uiManager = new Store()
export default uiManager
