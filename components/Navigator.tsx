import React from "react"
import {View, Text} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {Colors} from "react-native/Libraries/NewAppScreen"
import uiManager from "../dataLayer/UiManager"
import Leftheader from "./Leftheader"
import HomePage from "../home/HomePage"
import AccountPage from "../pages/AccountPage"
import LoginPage from "../pages/LoginPage"
import Signup from "../pages/Signup"
import Settings_Page from "../home/Settings_Page"
import EventView from "../home/views/EventView"
import PreviewEventView from "../home/views/PreviewEventView"
import CreateEventView from "../home/views/CreateEventView"
import UseMapView from "../home/views/UseMapView"
import Profile from "../home/settings_pages/Profile"
import Contact_About_Page from "../home/settings_pages/Contact_About_Page"
import {createStackNavigator} from "@react-navigation/stack"
import {observer} from "mobx-react"
import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import {FeedItemModel} from "../universial/Models"
// const Stack = createStackNavigator()
const Stack = createSharedElementStackNavigator()

export const Navigator = observer(() => {
	return (
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
				<Stack.Screen
					options={{headerShown: false}}
					name="event"
					component={EventView}
					sharedElementsConfig={(route, otherRoute, showing) => {
						const item: FeedItemModel = route.params
						const img = item.reference + "img"
						const tit = item.reference + "title"
						return [
							{id: img, animation: "fade"},
							{id: tit, animation: "fade"},
						]
					}}
				/>
				<Stack.Screen options={{headerShown: true}} name="previewEvent" component={PreviewEventView} />
				<Stack.Screen options={{headerShown: true, headerTitle: ""}} name="create_event" component={CreateEventView} />
				<Stack.Screen name="map-view" component={UseMapView} />

				<Stack.Screen options={{headerShown: true}} name="profile" component={Profile} />
				<Stack.Screen options={{headerShown: true}} name="about" component={Contact_About_Page} />
			</Stack.Navigator>
		</NavigationContainer>
	)
})

export default Navigator
