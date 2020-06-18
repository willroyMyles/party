import React, {useState} from "react"
import {View, Text, TouchableOpacity, Colors} from "react-native-ui-lib"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import Settings_Page from "./Settings_Page"
import {ViewPager, BottomNavigation, BottomNavigationTab} from "@ui-kitten/components"
import {SafeAreaView} from "react-native-safe-area-context"

const HomePage = () => {
	const [index, setIndex] = useState(0)
	return (
		<SafeAreaView style={{backgroundColor: "white", flex: 1}}>
			<ViewPager style={{backgroundColor: "white", flex: 1}} selectedIndex={index} onSelect={(idx) => setIndex(idx)}>
				<Feed_Page />
				<Category_Page />
				<Settings_Page />
			</ViewPager>

			<Bar index={index} onSelected={setIndex} tabName={["feed", "category", "settings"]} />
		</SafeAreaView>
	)
}

export default HomePage
interface IP {
	tabName: Array<string>
	index: number

	onSelected: (index: number) => void
}

const Bar = (props: IP) => {
	return (
		<View
			bg-white
			style={{
				padding: 20,
				position: "absolute",
				bottom: 0,
				margin: 15,
				// elevation: 1,
				alignItems: "center",
				justifyContent: "space-around",
				flexDirection: "row",
				borderRadius: 25,
				borderWidth: 1,
				borderColor: Colors.grey50,
			}}>
			{props.tabName.map((value, index) => {
				const width = 100 / props.tabName.length + "%"
				const slected = props.index == index
				return (
					<TouchableOpacity
						onPress={(e) => props.onSelected(index)}
						style={{width: width, margin: 2, alignItems: "center"}}
						key={index}>
						<Text color={slected ? Colors.blue50 : Colors.grey50}>{value}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
