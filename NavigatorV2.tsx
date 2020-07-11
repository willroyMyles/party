import React from "react"
import {View, Text} from "react-native"

import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import HomePage from "./home/HomePage"
import {createAppContainer} from "react-navigation"
import {enableScreens} from "react-native-screens"
import Feed_Page from "./home/Feed_Page"
import EventView from "./home/views/EventView"

enableScreens()
const Stack = createSharedElementStackNavigator(
	{
		home: Feed_Page,
		event: EventView,
		// event: EventView
	},
	{}
)

const NavigatorV2 = () => {
	return (
		<View>
			<Text></Text>
		</View>
	)
}

export default createAppContainer(Stack)
