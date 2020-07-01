import React from "react"
import {View, Text, TouchableOpacity} from "react-native-ui-lib"
import Icon from "react-native-vector-icons/Feather"
import {useTheme} from "styled-components"
import uiManager from "../dataLayer/UiManager"
import {useNavigation} from "@react-navigation/native"

const Leftheader = (props: {tintColor?: string | undefined}) => {
	const theme = useTheme()
	const navigation = useNavigation()

	const settingsPressed = (event: any) => {
		navigation.navigate("settings")
	}
	return (
		<View marginH-10>
			<TouchableOpacity marginR-10 onPress={settingsPressed}>
				<Icon color={uiManager.theme.primary_text} name="settings" size={25} />
			</TouchableOpacity>
		</View>
	)
}

export default Leftheader
