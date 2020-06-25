import React, {useEffect, useState} from "react"
import {StyleSheet, Text, View} from "react-native"
import AccountPage from "./pages/AccountPage"
import {Colors, Typography, ThemeManager} from "react-native-ui-lib"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/Signup"
import HomePage from "./home/HomePage"
import {ApplicationProvider, Layout, IconRegistry} from "@ui-kitten/components"
import Profile from "./home/settings_pages/Profile"
import Contact_About_Page from "./home/settings_pages/Contact_About_Page"
import * as eva from "@eva-design/eva"
import {EvaIconsPack} from "@ui-kitten/eva-icons"
import {observer} from "mobx-react"
import uiManager, {ThemeType} from "./dataLayer/UiManager"
import {eventEmitter, eventStrings} from "./universial/EventEmitter"
import {generate} from "@ant-design/colors"

const Stack = createStackNavigator()

export default observer(function App() {
	const [ok, setOk] = useState(false)
	const col = generate(Colors.yellow20, {})
	console.log(col)

	if (uiManager.themeType == ThemeType.DARK) {
		Colors.loadColors({
			base: "rgba(16,16,16,.15)",
			primary: col[5],
			// background: Colors.grey10,
			background: "#222",
			// background_secondary: Colors.grey20,
			background_secondary: "#333",
			text: Colors.grey80,
			text_light: Colors.grey70,
			textShadowColor: Colors.white,
			text_disabled: Colors.dark20,
		})
	}
	if (uiManager.themeType == ThemeType.LIGHT) {
		Colors.loadColors({
			base: Colors.white,
			primary: Colors.yellow20,
			background: Colors.grey80,
			background_secondary: Colors.white,
			text: Colors.grey30,
			text_light: Colors.grey50,
			textShadowColor: Colors.grey70,
			text_disabled: Colors.dark60,
		})
	}

	const s = StyleSheet.create({
		desc: {
			color: Colors.text,
			fontSize: 22,
		},
		tabs_text: {
			fontWeight: "700",
			fontSize: 16,
			textTransform: "uppercase",
			textShadowRadius: 1,
		},
		important: {
			color: Colors.text,
			fontSize: 35,
			fontWeight: "700",
		},
		check: {
			color: Colors.text,
			fontSize: 22,
			fontWeight: "700",
		},
		date: {
			fontWeight: "700",
			fontSize: 16,
			color: Colors.primary,
		},
		regular: {
			color: Colors.text,
			textShadowRadius: 1,
			fontSize: 16,
			fontWeight: "700",
		},
		hint: {
			color: Colors.text,
			textShadowRadius: 0.1,
			fontSize: 14,
			fontWeight: "700",
			opacity: 0.5,
		},
		btn_text: {
			color: Colors.background,
			fontWeight: "700",
			textShadowRadius: 0.2,
		},
	})
	Typography.loadTypographies({
		desc: s.desc,
		imp: s.important,
		imp1: s.check,
		date: s.date,
		reg: s.regular,
		hint: s.hint,
		tabs: s.tabs_text,
		btn: s.btn_text,
	})

	useEffect(() => {
		eventEmitter.once(eventStrings.themeChanged, () => {
			console.log("listener")
			setOk(!ok)
		})
	}, [])
	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider theme={eva.dark} {...eva}>
					<View style={{flex: 1}}>
						<NavigationContainer>
							<Stack.Navigator
								screenOptions={{
									headerShown: false,
									headerStyle: {backgroundColor: Colors.background},
									headerTintColor: Colors.text,
								}}>
								<Stack.Screen name="home" component={HomePage} />
								<Stack.Screen name="accounts" component={AccountPage} />
								<Stack.Screen name="login" component={LoginPage} />
								<Stack.Screen name="signup" component={Signup} />

								{/* sub pages */}

								<Stack.Screen options={{headerShown: true}} name="profile" component={Profile} />
								<Stack.Screen options={{headerShown: true}} name="about" component={Contact_About_Page} />
							</Stack.Navigator>
						</NavigationContainer>
					</View>
				</ApplicationProvider>
			</View>
			{ok && <View />}
		</SafeAreaProvider>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		// // backgroundColor: "#333",
		// alignItems: "center",
		// justifyContent: "center",
	},
	text: {
		color: "#fff",
	},
})
