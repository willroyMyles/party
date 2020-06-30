import React, {useEffect, useState, ReactNode} from "react"
import {StyleSheet, Text, View} from "react-native"
import AccountPage from "./pages/AccountPage"
import {Colors, Typography, ThemeManager} from "react-native-ui-lib"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {NavigationContainer, useNavigation} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/Signup"
import HomePage from "./home/HomePage"
import Profile from "./home/settings_pages/Profile"
import Contact_About_Page from "./home/settings_pages/Contact_About_Page"
import {observer} from "mobx-react"
import uiManager, {ThemeType} from "./dataLayer/UiManager"
import {eventEmitter, eventStrings} from "./universial/EventEmitter"
import {generate} from "@ant-design/colors"
import EventView from "./home/views/EventView"
import {ThemeProvider, useTheme} from "styled-components"
import {lightTheme, darkTheme} from "./universial/Theme"

const Stack = createStackNavigator()

export default observer(function App(props: any) {
	const [ok, setOk] = useState(false)
	const col = generate(Colors.yellow20, {})

	const s = StyleSheet.create({
		desc: {
			color: uiManager.theme.secondary_text,
			fontSize: 22,
		},
		tabs_text: {
			fontWeight: "700",
			fontSize: 16,
			textTransform: "uppercase",
			textShadowRadius: 1,
		},
		important: {
			color: uiManager.theme.primary_text,
			fontSize: 35,
			fontWeight: "700",
		},
		check: {
			color: uiManager.theme.primary_text,
			fontSize: 22,
			fontWeight: "700",
		},
		date: {
			fontWeight: "700",
			fontSize: 16,
			color: Colors.primary,
		},
		regular: {
			color: uiManager.theme.primary_text,
			textShadowRadius: 1,
			fontSize: 16,
			fontWeight: "700",
		},
		hint: {
			color: uiManager.theme.primary_text,
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

	const [node, setnode] = useState<ReactNode>(undefined)

	useEffect(() => {
		eventEmitter.once(eventStrings.themeChanged, () => {
			setOk(!ok)
		})

		return () => {
			eventEmitter.removeListener(eventStrings.themeChanged, () => {})
		}
	}, [])

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={uiManager.theme}>
				<View style={styles.container}>
					<View style={{flex: 1}}>
						<NavigationContainer>
							<Stack.Navigator
								screenOptions={{
									headerShown: false,
									headerStyle: {backgroundColor: Colors.background},
									headerTintColor: uiManager.theme.primary_text,
								}}>
								<Stack.Screen
									options={{headerShown: true, headerTitle: "My #1 Party"}}
									name="home"
									component={HomePage}
								/>
								<Stack.Screen name="accounts" component={AccountPage} />
								<Stack.Screen name="login" component={LoginPage} />
								<Stack.Screen name="signup" component={Signup} />

								{/* sub pages */}
								<Stack.Screen options={{headerShown: true}} name="event" component={EventView} />

								<Stack.Screen options={{headerShown: true}} name="profile" component={Profile} />
								<Stack.Screen options={{headerShown: true}} name="about" component={Contact_About_Page} />
							</Stack.Navigator>
						</NavigationContainer>
					</View>
				</View>
				{ok && <View />}
			</ThemeProvider>
		</SafeAreaProvider>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	text: {
		color: "#fff",
	},
})
