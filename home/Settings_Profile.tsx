import React, {useState} from "react"
import {View, Text, Button, Avatar, TouchableOpacity, FloatingButton, Colors} from "react-native-ui-lib"
import ThemeSwitcher from "../universial/ThemeSwitcher"
import Row from "../components/Row"
import uiManager from "../dataLayer/UiManager"
import {useTheme} from "styled-components"
import {getImage} from "../universial/GetImage"
import Icon from "react-native-vector-icons/Feather"
import {observer} from "mobx-react"
export const Settings_Profile = observer(() => {
	const theme = useTheme()

	const changeUserImage = () => {
		getImage(0.2).then((res: any) => {
			if (!res.cancelled) {
				console.log(res.uri)
				uiManager.userImageUri = res.uri
			}
		})
	}
	return (
		<View flex>
			{/* <Text imp1 marginV-35 marginB-10>
				Profile
			</Text> */}
			<View center>
				<TouchableOpacity
					onPress={() => changeUserImage()}
					style={{borderWidth: 1, borderColor: uiManager.theme.secondary_text, borderRadius: 100, elevation: 10}}>
					<Avatar label="user" source={{uri: uiManager.userImageUri}} size={82} />
				</TouchableOpacity>
				<Text imp1 marginT-5>
					name
				</Text>
			</View>
			<Row marginT-15>
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
			<TouchableOpacity
				activeOpacity={0.8}
				marginB-10
				marginR-10
				br100
				padding-25
				style={{
					position: "absolute",
					right: 10,
					bottom: 10,
					height: 35,
					width: 35,
					backgroundColor: Colors.primary,
					justifyContent: "center",
					alignItems: "center",
					overflow: "visible",
					elevation: 5,
				}}>
				<Icon
					name="plus"
					size={30}
					color={uiManager.theme.background}
					style={{
						position: "absolute",
						alignSelf: "center",
						justifyContent: "center",
					}}
				/>
				<Text
					hint
					style={{
						position: "absolute",
						top: 50,
					}}>
					create event
				</Text>
			</TouchableOpacity>
		</View>
	)
})

export default Settings_Profile
