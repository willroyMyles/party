import React, {useState, useEffect} from "react"
import {observer} from "mobx-react"
import {Colors, Text, Switch} from "react-native-ui-lib"
import {Toggle} from "@ui-kitten/components"
import uiManager from "../dataLayer/UiManager"
import {eventEmitter, eventStrings} from "./EventEmitter"

const ThemeSwitcher = observer(() => {
	const [on, setOn] = useState(false)

	return (
		<Switch
			offColor={Colors.text}
			onColor={Colors.background_secondary}
			value={uiManager.setting.theme}
			thumbColor={Colors.primary}
			thumbStyle={{backgroundColor: Colors.primary}}
			onValueChange={(val: boolean) => {
				setOn(val)
				uiManager.setThemeType(val)
				eventEmitter.emit(eventStrings.themeChanged)
			}}></Switch>
	)
})

export default ThemeSwitcher
