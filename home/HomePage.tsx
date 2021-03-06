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
import {TabBar} from "react-native-tab-view"

const tab = createMaterialTopTabNavigator()

const HomePage = () => {
	const [index, setIndex] = useState(true)
	const nav = useNavigation()

	const theme = useTheme()

	return (
		<View style={{backgroundColor: uiManager.theme.background, flex: 1}}>
			{index && (
				<tab.Navigator
					tabBar={(props) => <CustomTabBar {...props} />}
					sceneContainerStyle={{backgroundColor: uiManager.theme.background}}
					tabBarOptions={{
						contentContainerStyle: {backgroundColor: uiManager.theme.background},
						activeTintColor: Colors.primary,
						inactiveTintColor: Colors.inactive,
						showIcon: true,
						// renderIndicator: (props) => <View height={10} width={10} br100 bg-primary />,
						indicatorContainerStyle: {borderWidth: 10},
					}}
					tabBarPosition="bottom">
					<tab.Screen
						options={{tabBarIcon: (props) => <Tabi {...props} name="layers" />}}
						name="feeds"
						component={Feed_Page}
					/>
					<tab.Screen
						options={{tabBarIcon: (props) => <Tabi {...props} name="grid" />}}
						name="category"
						component={Category_Page}
					/>
					{/* <tab.Screen name="settings" component={Settings_Page} /> */}
				</tab.Navigator>
			)}
		</View>
	)
}

const Tabi = (props: {focused: boolean; color: string; name: string}) => {
	return <Icon name={props.name} size={20} color={props.color} />
}

export default HomePage
