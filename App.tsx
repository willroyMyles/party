import React from "react"
import {StyleSheet, Text, View} from "react-native"
import AccountPage from "./pages/AccountPage"
import {Colors, Typography, ThemeManager} from "react-native-ui-lib"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/Signup"
import HomePage from "./home/HomePage"
import {ApplicationProvider} from "@ui-kitten/components"
import Profile from "./home/settings_pages/Profile"
import Contact_About_Page from "./home/settings_pages/Contact_About_Page"

const s = StyleSheet.create({
	desc: {
		color: Colors.grey30,
		fontSize: 22,
	},
	important: {
		color: Colors.grey10,
		fontSize: 35,
		fontWeight: "700",
	},
	check: {
		color: Colors.grey10,
		fontSize: 22,
		fontWeight: "700",
	},
})
Typography.loadTypographies({
	desc: s.desc,
	imp: s.important,
	imp1: s.check,
})

const Stack = createStackNavigator()

export default function App() {
	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{headerShown: false}}>
						<Stack.Screen name="accounts" component={AccountPage} />
						<Stack.Screen name="login" component={LoginPage} />
						<Stack.Screen name="signup" component={Signup} />
						<Stack.Screen name="home" component={HomePage} />

						{/* sub pages */}

						<Stack.Screen options={{headerShown: true}} name="profile" component={Profile} />
						<Stack.Screen options={{headerShown: true}} name="about" component={Contact_About_Page} />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		</SafeAreaProvider>
	)
}

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
