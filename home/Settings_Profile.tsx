import React, {useState} from "react"
import {View, Text, Button, Avatar, TouchableOpacity, FloatingButton, Colors, Modal, Dialog} from "react-native-ui-lib"
import ThemeSwitcher from "../universial/ThemeSwitcher"
import Row from "../components/Row"
import uiManager from "../dataLayer/UiManager"
import {useTheme} from "styled-components"
import {getImage} from "../universial/GetImage"
import Icon from "react-native-vector-icons/Feather"
import {observer} from "mobx-react"
import {TextInput, StyleSheet, Alert} from "react-native"
import {useNavigation} from "@react-navigation/native"
import fireSotreMob from "../dataLayer/FireStore"
import Fire from "../dataLayer/FirebaseV2"
import TToast from "../components/TToast"
import {ScrollView} from "react-native-gesture-handler"
import RSVPModule from "../components/RSVPModule"

export const Settings_Profile = observer(() => {
	const theme = useTheme()
	const navigation = useNavigation()
	const [visible, setVisible] = useState(false)

	const style = StyleSheet.create({
		input: {
			borderWidth: 1,
			// borderColor: "rgba(0,0,0,.3)",
			borderColor: Colors.primary + "55",
			backgroundColor: Colors.backgroundHighlight,
			marginBottom: 35,
			marginTop: 7,
			borderRadius: 4,
			padding: 9,
			elevation: 0,
			color: Colors.textColor,
			fontFamily: "Nunito_Semi_Bold",
		},
	})

	const changeUserImage = () => {
		getImage(0.2).then((res: any) => {
			if (!res.cancelled) {
				const oldImage = fireSotreMob.userImageUri
				fireSotreMob.userImageUri = res.uri
				const data: any = {avatar: res.uri, old: oldImage}
				// fireSotreMob.sendAvatar(data)
			}
		})
	}

	const selectdata = [
		{label: "Optimist", onPress: () => null},
		{label: "Pessimist", onPress: () => null},
		{label: "Realist", onPress: () => null},
		{
			label: "Cancel",
			onPress: () => {
				setVisible(false)
			},
		},
	]

	return (
		<ScrollView contentContainerStyle={{paddingVertical: 20, paddingBottom: 40, flex: 1}}>
			{/* <Text imp1 marginV-35 marginB-10>
				Profile
			</Text> */}

			<View center>
				<TouchableOpacity
					onPress={() => changeUserImage()}
					style={{borderWidth: 1, borderColor: uiManager.theme.secondary_text, borderRadius: 100, elevation: 10}}>
					<Avatar label="user" source={{uri: fireSotreMob.userImageUri}} size={82} />
				</TouchableOpacity>
				<Text imp1 marginT-5 style={{textTransform: "capitalize"}}>
					{fireSotreMob.userName}
				</Text>
			</View>

			<Row marginT-15>
				<View>
					<Text hint>user-name</Text>
					<Text reg style={{textTransform: "capitalize"}}>
						{fireSotreMob.userName}
					</Text>
				</View>
				{/* <Button link onPress={() => setVisible(true)}>
					<Text style={{color: uiManager.theme.primary_text}}>change</Text>
				</Button> */}
				<Dialog onDismiss={() => setVisible(false)} visible={visible}>
					<View bg-background br20 padding-10>
						<TextInput
							// onBlur={onBlur}
							// onFocus={() => setShowDate(true)}
							onChangeText={(value) => (fireSotreMob.userName = value)}
							value={fireSotreMob.userName}
							style={[style.input, {width: "98%", marginHorizontal: 5}]}
							placeholder="name"
						/>
						<View marginT-10 row style={{justifyContent: "flex-end", paddingRight: 10}}>
							<Button bg-primary size="large" borderRadius={2} onPress={() => setVisible(false)}>
								<Text btn>confirm</Text>
							</Button>
						</View>
					</View>
				</Dialog>
			</Row>
			<Row marginT-15>
				<Text reg>dark theme</Text>
				<ThemeSwitcher />
			</Row>
			<Row>
				<Text reg>clear theme (development)</Text>
				<Button
					onPress={() => {
						// uiManager.clearTheme()
						// Fire.testAdd()
						// const hey = Fire.isLoggedIn()
						TToast.error("hellos", "worldx")
					}}
					size="small"
					round={false}
					borderRadius={2}>
					<Text>clear</Text>
				</Button>
			</Row>
			<Row>
				<RSVPModule />
			</Row>
			{/* <TouchableOpacity
				onPress={() => {
					navigation.navigate("create_event")
				}}
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
			</TouchableOpacity>*/}
			<View centerH style={{position: "absolute", bottom: 0, width: "100%"}}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						if (!fireSotreMob.isLoggedIn()) {
							TToast.error("log in", "you need to be logged in to create an event")
						} else {
							navigation.navigate("create_event")
						}
					}}
					style={{
						backgroundColor: Colors.primary,
						borderRadius: 5,
						borderWidth: 0,
						width: "80%",
						elevation: 12,
						padding: 20,
					}}>
					<View row centerH>
						<Icon name="plus-circle" size={32} color={uiManager.theme.background} />
						<Text btn style={{fontSize: 20, fontWeight: "700", marginLeft: 8}}>
							Create Event
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
})

export default Settings_Profile
