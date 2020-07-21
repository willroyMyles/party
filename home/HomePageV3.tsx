import React, {Component, useState} from "react"
import {Text, View} from "react-native-ui-lib"
import ViewPager, {ViewPagerOnPageScrollEventData} from "@react-native-community/viewpager"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import ViewPagerTabBar from "../components/ViewPagerTabBar"
import {NativeSyntheticEvent, Animated} from "react-native"
import {useHeaderHeight} from "@react-navigation/stack"

export var headerHeight: number
const offset = new Animated.Value(0)

export const HomePageV3 = () => {
	const hh = useHeaderHeight()
	headerHeight = hh

	const names = [
		{name: "memories", iconName: "grid", press: () => null},
		{name: "categories", iconName: "layers", press: () => null},
	]
	const [page, setPage] = useState(0)
	const [pagerRef, setPagerRef] = useState<ViewPager>()

	const handlePagedSet = (index: number) => {
		setPage(index)
		pagerRef?.setPage(index)
	}

	const handleMoved = (e: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>) => {
		offset.setValue(e.nativeEvent.offset + e.nativeEvent.position)
	}

	return (
		<View flex-3 bg-background>
			<ViewPager
				ref={(e) => setPagerRef(e)}
				onPageScroll={handleMoved}
				onPageSelected={(e) => {
					const pos = e.nativeEvent.position
					setTimeout(() => {
						setPage(pos)
					}, 500)
				}}
				style={{flex: 1}}>
				<Feed_Page />
				<Category_Page />
			</ViewPager>
			<ViewPagerTabBar onPress={handlePagedSet} names={names} position={offset} page={page} />
		</View>
	)
}

export default HomePageV3
