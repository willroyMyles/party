import React, {useEffect, useState} from "react"
import {View, Card, Image, Text, TouchableOpacity, Button, FloatingButton} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import dataProvider from "../dataLayer/DataStore"
import {FlatList, ScrollView} from "react-native"
import moment from "moment"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"
import {useNavigation} from "@react-navigation/native"
import Feed_Item from "../components/Feed_Item"
import {FeedItemModel} from "../universial/Models"
import {useTheme} from "styled-components"
import {fake} from "faker"
import Feed_itemV2 from "../components/Feed_itemV2"

const Feed_Page = () => {
	const navigation = useNavigation()
	const [data, setdata] = useState([])
	useEffect(() => {
		dataProvider.generateFakeData().then((res) => {
			// setdata(dataProvider.data)
			const d: any = []
			dataProvider.data.forEach((item, key) => {
				d.push(item)
			})
			setdata(d)
		})
	}, [])

	const handleViewClick = (item: FeedItemModel) => {
		dataProvider.currentEvent = item
		navigation.navigate("event", item)
	}

	const theme: any = useTheme()

	return (
		<View bg-background>
			<FlatList
				onScroll={(e) => {}}
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
