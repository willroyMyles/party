import React from "react"
import {View, Text, Button, ListItem, TouchableOpacity} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation} from "@react-navigation/native"
import {useTheme} from "styled-components"
import ThemeSwitcher from "../universial/ThemeSwitcher"
import Row from "../components/Row"
import * as faker from "faker"
import uiManager from "../dataLayer/UiManager"

const Settings_Page = () => {
	const navigation = useNavigation()
	const theme = useTheme()

	return (
		<View flex-1 bg-background padding-20 style={{minHeight: "100%"}}>
			<View>
				<Text imp1 marginV-35 marginB-20>
					Profile
				</Text>
				<Row>
					<Text reg>dark theme</Text>
					<ThemeSwitcher />
				</Row>
				<Row>
					<Text reg>clear theme (development)</Text>
					<Button
						onPress={() => {
							uiManager.clearTheme()
						}}
						size="small"
						round={false}
						borderRadius={2}>
						<Text>clear</Text>
					</Button>
				</Row>
			</View>

			<View>
				<Text imp1 marginV-45 marginB-20>
					About
				</Text>
				<Row>
					<TouchableOpacity style={{width: "100%"}} activeOpacity={0.7}>
						<Text reg>privacy policy</Text>
					</TouchableOpacity>
				</Row>
				<Row>
					<TouchableOpacity style={{width: "100%"}} activeOpacity={0.7}>
						<Text reg>About</Text>
					</TouchableOpacity>
				</Row>
			</View>
		</View>
	)
}

export default Settings_Page
