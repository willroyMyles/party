import React, {Component, useState} from "react"
import {Text, View} from "react-native-ui-lib"
import ViewPager, {ViewPagerOnPageScrollEventData} from "@react-native-community/viewpager"
import Feed_Page from "./Feed_Page"
import Category_Page from "./Category_Page"
import ViewPagerTabBar from "../components/ViewPagerTabBar"
import {NativeSyntheticEvent, Animated} from "react-native"
import {useHeaderHeight} from "@react-navigation/stack"
import Settings_Page from "./Settings_Page"

export var headerHeight: number
const offset = new Animated.Value(0)

export const HomePageV3 = () => {
	const hh = useHeaderHeight()
	headerHeight = hh

	const names = [
		{name: "memories", iconName: "grid", press: () => null},
		{name: "categories", iconName: "layers", press: () => null},
		{name: "profile", iconName: "user", press: () => null},
	]
	const [page, setPage] = useState(0)

	const handlePagedSet = (index: number) => {
		setPage(index)
	}

	const handleMoved = (e: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>) => {
		console.log(e.nativeEvent)
		offset.setValue(e.nativeEvent.offset + e.nativeEvent.position)
	}

	return (
		<View flex bg-background>
			{/* <ViewPager
				ref={(e) => setPagerRef(e)}
				onPageScroll={handleMoved}
				scrollEnabled={false}
				onPageSelected={(e) => {
					const pos = e.nativeEvent.position
					setTimeout(() => {
						setPage(pos)
					}, 500)
				}}
				style={{borderWidth: 12, borderColor: "red", backgroundColor: "red", flex: 2}}>
				<Feed_Page />
				<Category_Page />
				<Settings_Page />
			</ViewPager> */}

			{page == 0 && <Feed_Page />}
			{page == 1 && <Category_Page />}
			{page == 2 && <Settings_Page />}

			<ViewPagerTabBar onPress={handlePagedSet} names={names} page={page} />
		</View>
	)
}

export default HomePageV3
