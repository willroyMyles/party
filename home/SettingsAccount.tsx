import React from "react"
import {View, Text, TouchableOpacity} from "react-native-ui-lib"
import Row from "../components/Row"
import fireSotreMob from "../dataLayer/FireStore"
import {useNavigation} from "@react-navigation/native"
import TToast from "../components/TToast"
export const SettingsAccount = () => {
	const navigation = useNavigation()
	const onLoginPressed = () => {
		navigation.navigate("login")
	}

	const onSignUpPressed = () => {
		navigation.navigate("signup")
	}

	const onLogOut = () =>
		fireSotreMob.logOut().then((res) => {
			if (res) {
				TToast.success("Success", "Successfully logged out")
			} else TToast.error("Error", "something went wrong")
			{
			}
		})

	return (
		<View>
			<Text imp marginV-45 marginB-10>
				Actions
			</Text>

			<Row>
				<TouchableOpacity
					onPress={() => {
						onLoginPressed()
					}}
					style={{
						width: "100%",
					}}
					activeOpacity={0.7}>
					<Text reg>Login</Text>
				</TouchableOpacity>
			</Row>
			<Row>
				<TouchableOpacity
					onPress={() => {
						onSignUpPressed()
					}}
					style={{
						width: "100%",
					}}
					activeOpacity={0.7}>
					<Text reg>Sign up</Text>
				</TouchableOpacity>
			</Row>
			{fireSotreMob.userName && (
				<Row>
					<TouchableOpacity
						onPress={() => {
							onLogOut()
						}}
						style={{
							width: "100%",
						}}
						activeOpacity={0.7}>
						<Text reg>Log out</Text>
					</TouchableOpacity>
				</Row>
			)}
		</View>
	)
}
