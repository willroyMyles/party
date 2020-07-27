import React from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import {View, Colors} from "react-native-ui-lib"
import uiManager from "../dataLayer/UiManager"
import MemoriesView from "./views/MemoriesView"
import LeaderboardView from "./views/LeaderboardView"

const tab = createMaterialTopTabNavigator()

const Feed_Page = () => {
	return (
		<View flex>
			<tab.Navigator
				sceneContainerStyle={{
					backgroundColor: uiManager.theme.background,
					flex: 1,
					padding: 10,
				}}
				tabBarOptions={{
					tabStyle: {backgroundColor: uiManager.theme.background, borderWidth: 0, elevation: 10},
					activeTintColor: Colors.primary,
					inactiveTintColor: uiManager.theme.teritairy_text,
				}}>
				<tab.Screen name="memories" component={MemoriesView} />
				<tab.Screen name="leaderBoard" component={LeaderboardView} />
			</tab.Navigator>
		</View>
	)
}

export default Feed_Page
