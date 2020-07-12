import React, {Component} from "react"
import {Text, View} from "react-native-ui-lib"
import ViewPager, {ViewPagerOnPageScrollEventData} from "@react-native-community/viewpager"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import ViewPagerTabBar from "../components/ViewPagerTabBar"
import {NativeSyntheticEvent} from "react-native"

export const HomePageV3 = () => {
	const names = [
		{name: "memories", iconName: "grid", press: () => null},
		{name: "categories", iconName: "layers", press: () => null},
	]

	const handleMoved = (e: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>) => {
		// console.log(e)
	}

	return (
		<View flex-3>
			<ViewPager onPageScroll={handleMoved} style={{flex: 1}}>
				<Feed_Page />
				<Category_Page />
			</ViewPager>
			<ViewPagerTabBar names={names} />
		</View>
	)
}

export default HomePageV3
