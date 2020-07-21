import React, {Component, useState} from "react"
import {Text, View} from "react-native-ui-lib"
import ViewPager, {ViewPagerOnPageScrollEventData} from "@react-native-community/viewpager"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import ViewPagerTabBar from "../components/ViewPagerTabBar"
import {NativeSyntheticEvent, Animated} from "react-native"
import {useHeaderHeight} from "@react-navigation/stack"

export var headerHeight: number
export const HomePageV3 = () => {
	const hh = useHeaderHeight()
	headerHeight = hh

	const names = [
		{name: "memories", iconName: "grid", press: () => null},
		{name: "categories", iconName: "layers", press: () => null},
	]

	const offset = new Animated.Value(0)

	const handleMoved = (e: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>) => {
		offset.setValue(e.nativeEvent.offset + e.nativeEvent.position)
	}

	return (
		<View flex-3 bg-background>
			<ViewPager onPageScroll={handleMoved} style={{flex: 1}}>
				<Feed_Page />
				<Category_Page />
			</ViewPager>
			<ViewPagerTabBar names={names} position={offset} />
		</View>
	)
}

export default HomePageV3
