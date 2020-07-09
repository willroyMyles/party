import React, {useState} from "react"
import {View, Text, Button, Avatar, TouchableOpacity} from "react-native-ui-lib"
import ThemeSwitcher from "../universial/ThemeSwitcher"
import Row from "../components/Row"
import uiManager from "../dataLayer/UiManager"
import {useTheme} from "styled-components"
import {getImage} from "../universial/GetImage"
export const Settings_Profile = () => {
	const theme = useTheme()
	const [imageUri, setimageUri] = useState()

	const changeUserImage = () => {
		getImage(0.2).then((res: any) => {
			if (!res.cancelled) {
				console.log(res.uri)
				setimageUri(res.uri)
				uiManager.userImageUri = res.uri
			}
		})
	}
	return (
		<View>
			{/* <Text imp1 marginV-35 marginB-10>
				Profile
			</Text> */}
			<View center>
				<TouchableOpacity
					onPress={() => changeUserImage()}
					style={{borderWidth: 1, borderColor: uiManager.theme.secondary_text, borderRadius: 100, elevation: 10}}>
					<Avatar label="user" source={{uri: imageUri}} size={82} />
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
		</View>
	)
}

export default Settings_Profile
