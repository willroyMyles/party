import React, {useState, ReactNode, useEffect} from "react"
import {View, Text, TouchableOpacity, Colors, Carousel} from "react-native-ui-lib"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import Settings_Page from "./Settings_Page"
import {ViewPager, BottomNavigation, BottomNavigationTab} from "@ui-kitten/components"
import {SafeAreaView} from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/Feather"
import uiManager from "../dataLayer/UiManager"
import {useNavigation} from "@react-navigation/native"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"
import {ScrollView} from "react-native"

// import * as Icon from "react-feather"

const HomePage = () => {
	const [index, setIndex] = useState(0)
	const nav = useNavigation()

	return (
		<SafeAreaView style={{backgroundColor: Colors.background, flex: 1}}>
			{/* <View flex-1>
				{index == 0 && <Category_Page />}
				{index == 1 && <Feed_Page />}
				{index == 2 && <Settings_Page />}
			</View> */}
			<ViewPager onSelect={(num: number) => setIndex(num)} selectedIndex={index} style={{flex: 1}}>
				<Category_Page />
				<Feed_Page />
				<Settings_Page />
			</ViewPager>

			<Bar
				index={index}
				onSelected={setIndex}
				tabName={["category", "feed", "settings"]}
				icons={["layers", "list", "settings"]}
			/>
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
