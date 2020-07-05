import "mobx-react-lite/batchingForReactNative"
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
import Leftheader from "./components/Leftheader"
import Settings_Page from "./home/Settings_Page"
import * as Font from "expo-font"
import {AppLoading} from "expo"
import CreateEventView from "./home/views/CreateEventView"
import FormTest from "./home/views/FormTest"
import fire from "./dataLayer/Firebase"
import themeHelper from "./universial/ThemeHelper"

const Stack = createStackNavigator()

export default observer(function App(props: any) {
	const [ok, setOk] = useState(false)
	const col = generate(Colors.yellow20, {})
	const [loading, setLoading] = useState(true)

	const [node, setnode] = useState<ReactNode>(undefined)

	useEffect(() => {
		Font.loadAsync({
			Nunito_Black: require("./assets/fonts/Nunito/Nunito-Black.ttf"),
			Nunito_Regular: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
			Nunito_Semi_Bold: require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
		}).then((res) => {
			console.log(Font.isLoaded("Nunito_Black"))
			setLoading(false)
		})
	}, [])

	if (loading) return <AppLoading />

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={uiManager.theme}>
				<View style={styles.container}>
					{!loading && (
						<NavigationContainer>
							<Stack.Navigator
								screenOptions={{
									headerShown: false,
									headerStyle: {backgroundColor: Colors.background},
									headerTintColor: uiManager.theme.primary_text,
								}}>
								<Stack.Screen
									options={{
										headerShown: true,
										headerTitle: "My #1 Party",
										headerRight: (props) => <Leftheader {...props} />,
									}}
									name="home"
									component={HomePage}
								/>
								<Stack.Screen name="accounts" component={AccountPage} />
								<Stack.Screen name="login" component={LoginPage} />
								<Stack.Screen name="signup" component={Signup} />
								<Stack.Screen options={{headerShown: true}} name="settings" component={Settings_Page} />

								{/* sub pages */}
								{/* <Stack.Screen options={{headerShown: true}} name="test" component={FormTest} /> */}
								<Stack.Screen options={{headerShown: true}} name="event" component={EventView} />
								<Stack.Screen
									options={{headerShown: true, headerTitle: ""}}
									name="create_event"
									component={CreateEventView}
								/>

								<Stack.Screen options={{headerShown: true}} name="profile" component={Profile} />
								<Stack.Screen options={{headerShown: true}} name="about" component={Contact_About_Page} />
							</Stack.Navigator>
						</NavigationContainer>
					)}
				</View>
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
