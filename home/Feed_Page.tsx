import React, {useEffect, useState} from "react"
import {View} from "react-native-ui-lib"
import dataProvider from "../dataLayer/DataStore"
import {FlatList} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {FeedItemModel} from "../universial/Models"
import {useTheme} from "styled-components"
import Feed_itemV2 from "../components/Feed_itemV2"

const Feed_Page = () => {
	const navigation = useNavigation()
	const [data, setdata] = useState([])
	useEffect(() => {
		dataProvider.generateFakeData().then(() => {
			// setdata(dataProvider.data)
			const d: any = []
			dataProvider.data.forEach((item) => {
				d.push(item)
			})
			setdata(d)
		})
	}, [])

	const handleViewClick = (item: FeedItemModel) => {
		dataProvider.currentEvent = item
		navigation.navigate("event", item)
	}

	return (
		<View bg-background>
			<FlatList
				onScroll={() => {}}
				// style={{borderWidth: 0, flex: 1}}
				data={data}
				renderItem={({item, index}) => {
					return (
						<View key={index}>
							<Feed_itemV2 onClick={handleViewClick} index={index} item={item} />
						</View>
					)
				}}
				keyExtractor={(item: FeedItemModel) => item.reference || fakerStatic.random.number(20000000000).toString()}
			/>
		</View>
	)
}

export default Feed_Page
