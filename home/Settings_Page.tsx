import React from "react"
import {View, ListItem, Colors} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation, TabActions} from "@react-navigation/native"
import {useTheme} from "styled-components"
import * as faker from "faker"
import {ScrollView} from "react-native"
import Settings_Profile from "./Settings_Profile"
import {SettingsAbout} from "./SettingsAbout"
import {SettingsAccount} from "./SettingsAccount"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import uiManager from "../dataLayer/UiManager"

const tab = createMaterialTopTabNavigator()

const Settings_Page = () => {
	const navigation = useNavigation()
	const theme = useTheme()

	const account = (props: any) => {
		return <SettingsAccount></SettingsAccount>
	}

	return (
		<tab.Navigator
			sceneContainerStyle={{backgroundColor: uiManager.theme.background, padding: 10}}
			tabBarOptions={{
				tabStyle: {backgroundColor: uiManager.theme.background},
				activeTintColor: Colors.primary,
				inactiveTintColor: uiManager.theme.teritairy_text,
			}}>
			<tab.Screen name="profile" component={Settings_Profile} />
			<tab.Screen name="account" component={account} />
			<tab.Screen name="about" component={SettingsAbout} />
		</tab.Navigator>
	)
}

export default Settings_Page
