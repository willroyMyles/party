import React, {Component, useState} from "react"
import {Text, View} from "react-native-ui-lib"
import ViewPager, {ViewPagerOnPageScrollEventData} from "@react-native-community/viewpager"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import ViewPagerTabBar from "../components/ViewPagerTabBar"
import {NativeSyntheticEvent} from "react-native"
import Animated from "react-native-reanimated"

export const HomePageV3 = () => {
	const names = [
		{name: "memories", iconName: "grid", press: () => null},
		{name: "categories", iconName: "layers", press: () => null},
	]

	const [offset, setOffset] = useState<Animated.Value<number>>(new Animated.Value(0))

	const handleMoved = (e: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>) => {
		setOffset(new Animated.Value(e.nativeEvent.offset))
	}

	return (
		<View flex-3>
			<ViewPager onPageScroll={handleMoved} style={{flex: 1}}>
				<Feed_Page />
				<Category_Page />
			</ViewPager>
			<ViewPagerTabBar names={names} position={offset} />
		</View>
	)
}

export default HomePageV3
