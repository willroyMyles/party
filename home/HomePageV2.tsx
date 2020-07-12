import React, {Component} from "react"
import {Text, View} from "react-native-ui-lib"
import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import EventView from "./views/EventView"
import ViewPagerTabBar from "../components/ViewPagerTabBar"
import {useNavigation} from "@react-navigation/native"
import {FeedItemModel} from "../universial/Models"
import dataProvider from "../dataLayer/DataStore"

const Stack = createSharedElementStackNavigator()
export const HomePageV2 = () => {
	const navigation = useNavigation()
	const data = [
		{
			name: "memories",
			iconName: "layers",
			press: () => navigation.navigate("memories"),
		},
		{
			name: "categories",
			iconName: "grid",
			press: () => navigation.navigate("categories"),
		},
	]
	return (
		<View flex-10>
			<Stack.Navigator>
				<Stack.Screen name="memories" component={Feed_Page} />
				<Stack.Screen name="categories" component={Category_Page} />
				<Stack.Screen
					name="event"
					component={EventView}
					// sharedElementsConfig={(route, otherRoute, showing) => {
					// 	const item: FeedItemModel = dataProvider.currentEvent
					// 	const img = item.reference + "img"
					// 	const tit = item.reference + "title"
					// 	return [
					// 		{id: img, animation: "fade"},
					// 		{id: tit, animation: "fade"},
					// 	]
					// }}
				/>
			</Stack.Navigator>
			<ViewPagerTabBar names={data} />
		</View>
	)
}

export default HomePageV2
