import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import uiManager from "../dataLayer/UiManager"
import Leftheader from "./Leftheader"
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
import {observer} from "mobx-react"
import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import HomePageV3 from "../home/HomePageV3"
import SocialSignIn from "../pages/SocialSignIn"
import CategoryView from "../home/views/CategoryView"
import PastEventView from "../home/views/PastEventView"
import {Colors} from "react-native-ui-lib"
import Header from "./Header"
import {TransitionPresets} from "@react-navigation/stack"
// const Stack = createStackNavigator()
const Stack = createSharedElementStackNavigator()

export const Navigator = observer(() => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				headerMode="float"
				screenOptions={{
					cardOverlayEnabled: false,
					animationTypeForReplace: "pop",
					...TransitionPresets.ModalSlideFromBottomIOS, //play with transitions

					headerShown: false,
					headerStyle: {backgroundColor: "transparent", elevation: 0},
					headerTitleStyle: {marginTop: -20},
					headerTitleAlign: "center",
					headerTintColor: uiManager.theme.primary_text,
					// headerTransparent: true,
					headerBackground: (props) => {
						return <Header {...props} />
					},
				}}>
				<Stack.Screen
					options={{
						headerShown: true,
						headerTitle: "My #1 Party",
						headerRight: (props) => <Leftheader {...props} />,
					}}
					name="home"
					component={HomePageV3}
				/>
				<Stack.Screen name="accounts" component={AccountPage} />
				<Stack.Screen name="login" component={LoginPage} />
				<Stack.Screen name="signup" component={Signup} />
				<Stack.Screen name="google" component={SocialSignIn} />
				<Stack.Screen options={{headerShown: true}} name="settings" component={Settings_Page} />

				{/* sub pages */}
				{/* <Stack.Screen options={{headerShown: true}} name="test" component={FormTest} /> */}
				<Stack.Screen
					options={{
						headerShown: false,
						headerTransparent: true,
					}}
					name="event"
					component={EventView}
				/>
				<Stack.Screen options={{headerShown: false}} name="past-event" component={PastEventView} />
				<Stack.Screen options={{headerShown: true}} name="previewEvent" component={PreviewEventView} />
				<Stack.Screen options={{headerShown: true}} name="categoryView" component={CategoryView} />
				<Stack.Screen
					options={{headerShown: true, headerTitle: "create event"}}
					name="create_event"
					component={CreateEventView}
				/>
				<Stack.Screen name="map-view" component={UseMapView} />

				<Stack.Screen options={{headerShown: true}} name="profile" component={Profile} />
				<Stack.Screen options={{headerShown: true}} name="about" component={Contact_About_Page} />
			</Stack.Navigator>
		</NavigationContainer>
	)
})

export default Navigator
