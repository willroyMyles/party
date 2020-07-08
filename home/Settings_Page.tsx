import React from "react"
import {View, Text, Button, ListItem, TouchableOpacity, Colors} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation} from "@react-navigation/native"
import {useTheme} from "styled-components"
import ThemeSwitcher from "../universial/ThemeSwitcher"
import Row from "../components/Row"
import * as faker from "faker"
import uiManager from "../dataLayer/UiManager"
import {ScrollView} from "react-native"

const Settings_Page = () => {
	const navigation = useNavigation()
	const theme = useTheme()

	const onLoginPressed = () => {
		navigation.navigate("login")
	}

	const onSignUpPressed = () => {
		navigation.navigate("signup")
	}

	return (
		<ScrollView style={{flex: 1, backgroundColor: Colors.background}}>
			<View bg-background padding-20 style={{minHeight: "100%"}}>
				<View>
					<Text imp1 marginV-35 marginB-10>
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
					<Text imp1 marginV-45 marginB-10>
						About
					</Text>
					<Row>
						<TouchableOpacity style={{width: "100%"}} activeOpacity={0.7}>
							<Text reg>privacy policy</Text>
						</TouchableOpacity>
					</Row>

					<Row>
						<TouchableOpacity style={{width: "100%"}} activeOpacity={0.7}>
							<Text reg>Support</Text>
						</TouchableOpacity>
					</Row>
					<Row>
						<TouchableOpacity style={{width: "100%"}} activeOpacity={0.7}>
							<Text reg>About</Text>
						</TouchableOpacity>
					</Row>
					<Row>
						<TouchableOpacity style={{width: "100%"}} activeOpacity={0.7}>
							<Text reg>Terms of Service</Text>
						</TouchableOpacity>
					</Row>
				</View>

				<View>
					<Text imp1 marginV-45 marginB-10>
						Account
					</Text>

					<Row>
						<TouchableOpacity
							onPress={() => {
								onLoginPressed()
							}}
							style={{width: "100%"}}
							activeOpacity={0.7}>
							<Text reg>Login</Text>
						</TouchableOpacity>
					</Row>
					<Row>
						<TouchableOpacity
							onPress={() => {
								onSignUpPressed()
							}}
							style={{width: "100%"}}
							activeOpacity={0.7}>
							<Text reg>Sign up</Text>
						</TouchableOpacity>
					</Row>
				</View>
			</View>
		</ScrollView>
	)
}

export default Settings_Page
