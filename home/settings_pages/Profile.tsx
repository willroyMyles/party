import React, {useState, useEffect} from "react"
import {View, Text} from "react-native-ui-lib"
import ThemeSwitcher from "../../universial/ThemeSwitcher"
import uiManager from "../../dataLayer/UiManager"
import {observer} from "mobx-react"
import {eventEmitter, eventStrings} from "../../universial/EventEmitter"
import {useTheme} from "styled-components"

const Profile = observer(() => {
	const [ntn, setNtn] = useState(true)
	const theme = useTheme()

	return (
		<View bg-background flex-1>
			<Text imp> Profile</Text>
			<View padding-15 marginV-10 style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Text reg>change theme</Text>
				{ntn && <Text reg>dark</Text>}
				{ntn == false && <Text reg>light</Text>}
				<ThemeSwitcher />
			</View>
		</View>
	)
})

export default Profile
