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
		navigation.navigate("event")
	}

	const theme: any = useTheme()

	const Listt = () => {
		return (
			<FlatList
				onScroll={(e) => {}}
				// scrollEnabled={false}
				// contentContainerStyle={{borderWidth: 1, overflow: "visible", flex: 3}}
				style={{borderWidth: 0, flex: 1}}
				data={data}
				renderItem={({item, index}) => {
					return (
						<View marginV-5 key={index}>
							<Feed_Item onClick={handleViewClick} index={index} item={item} />
						</View>
					)
				}}
				keyExtractor={(item) => item.reference}
			/>
		)
	}

	return (
		<View flex bg-background style={{height: "100%", overflow: "scroll"}}>
			<Listt />
		</View>
	)
}

export default Feed_Page
