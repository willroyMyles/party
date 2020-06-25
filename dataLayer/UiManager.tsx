import {observable, action} from "mobx"

export enum ThemeType {
	LIGHT = 0,
	DARK = 1,
}
class Store {
	@observable themeType = ThemeType.LIGHT
	@observable setting: any = {theme: false}
	@action setThemeType = (val: boolean) => {
		if (val) this.themeType = ThemeType.DARK
		else this.themeType = ThemeType.LIGHT
		this.setting.theme = val
	}
}

const uiManager = new Store()
export default uiManager
