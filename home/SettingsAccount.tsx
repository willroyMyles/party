import React from "react"
import {View, Text, TouchableOpacity} from "react-native-ui-lib"
import Row from "../components/Row"
export const SettingsAccount = (props: {onLoginPressed: () => void; onSignUpPressed: () => void}) => (
	<View>
		<Text imp1 marginV-45 marginB-10>
			Account
		</Text>

		<Row>
			<TouchableOpacity
				onPress={() => {
					props.onLoginPressed()
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
					props.onSignUpPressed()
				}}
				style={{
					width: "100%",
				}}
				activeOpacity={0.7}>
				<Text reg>Sign up</Text>
			</TouchableOpacity>
		</Row>
	</View>
)
