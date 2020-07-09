import React from "react"
import {View, Text, TouchableOpacity} from "react-native-ui-lib"
import Row from "../components/Row"
import {useTheme} from "styled-components"
export const SettingsAbout = () => {
	const theme = useTheme()

	return (
		<View View>
			<Text imp1 marginV-45 marginB-10>
				About
			</Text>
			<Row>
				<TouchableOpacity
					style={{
						width: "100%",
					}}
					activeOpacity={0.7}>
					<Text reg>privacy policy</Text>
				</TouchableOpacity>
			</Row>

			<Row>
				<TouchableOpacity
					style={{
						width: "100%",
					}}
					activeOpacity={0.7}>
					<Text reg>Support</Text>
				</TouchableOpacity>
			</Row>
			<Row>
				<TouchableOpacity
					style={{
						width: "100%",
					}}
					activeOpacity={0.7}>
					<Text reg>About</Text>
				</TouchableOpacity>
			</Row>
			<Row>
				<TouchableOpacity
					style={{
						width: "100%",
					}}
					activeOpacity={0.7}>
					<Text reg>Terms of Service</Text>
				</TouchableOpacity>
			</Row>
		</View>
	)
}
