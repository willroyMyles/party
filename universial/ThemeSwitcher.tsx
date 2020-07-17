import React, {useState} from "react"
import {observer} from "mobx-react"
import {Colors, Switch} from "react-native-ui-lib"
import uiManager from "../dataLayer/UiManager"

const ThemeSwitcher = observer(() => {
	const [on, setOn] = useState(false)

	return (
		<Switch
			offColor={Colors.text}
			onColor={Colors.background_secondary}
			value={uiManager.setting.theme}
			thumbColor={Colors.primary}
			thumbStyle={{backgroundColor: Colors.primary}}
			style={{backgroundColor: uiManager.theme.bgHilight, borderWidth: 1, borderColor: Colors.primary}}
			onValueChange={(val: boolean) => {
				setOn(val)
				uiManager.setThemeType(val)
			}}></Switch>
	)
})

export default ThemeSwitcher
