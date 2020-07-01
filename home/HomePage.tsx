import React, {useState, ReactNode, useEffect} from "react"
import {View, Text, TouchableOpacity, Colors, Carousel} from "react-native-ui-lib"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import Settings_Page from "./Settings_Page"
import {SafeAreaView} from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/Feather"
import uiManager from "../dataLayer/UiManager"
import {useNavigation} from "@react-navigation/native"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"
import {ScrollView} from "react-native"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import CustomTabBar from "../components/CustomTabBar"
import {useTheme} from "styled-components"

const tab = createMaterialTopTabNavigator()

const HomePage = () => {
	const [index, setIndex] = useState(true)
	const nav = useNavigation()

	const theme = useTheme()

	return (
		<SafeAreaView style={{backgroundColor: uiManager.theme.background, flex: 1}}>
			{index && (
				<tab.Navigator
					sceneContainerStyle={{backgroundColor: uiManager.theme.background}}
					tabBarOptions={{
						contentContainerStyle: {backgroundColor: uiManager.theme.background},
						activeTintColor: Colors.text,
					}}
					tabBarPosition="bottom">
					<tab.Screen name="feeds" component={Feed_Page} />
					<tab.Screen name="category" component={Category_Page} />
					{/* <tab.Screen name="settings" component={Settings_Page} /> */}
				</tab.Navigator>
			)}
		</SafeAreaView>
	)
}

export default HomePage
interface IP {
	tabName: Array<string>
	index: number
	icons: string[]

	onSelected: (index: number) => void
}

const Bar = (props: IP) => {
	return (
		<View
			bg-base
			paddingV-20
			style={{
				position: "relative",
				bottom: -2,
				// margin: 5,
				// elevation: 13,
				alignItems: "center",
				justifyContent: "space-around",
				flexDirection: "row",
				borderRadius: 1,
				// borderWidth: 2,
				borderColor: "rgba(0,0,0,.2)",
				width: "102%",
				left: -2,
			}}>
			{props.tabName.map((value, index) => {
				const width = 100 / props.tabName.length + "%"
				const selected = props.index == index
				return (
					<TouchableOpacity
						onPress={(e) => props.onSelected(index)}
						style={{width: width, margin: 2, alignItems: "center"}}
						key={index}>
						<Icon
							key={index + "icon"}
							style={{marginBottom: 3}}
							name={props.icons[index]}
							size={20}
							color={selected ? Colors.primary : Colors.text_disabled}
						/>
						{selected && (
							<Text tabs color={selected ? Colors.primary : Colors.text_disabled}>
								{value}
							</Text>
						)}
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
