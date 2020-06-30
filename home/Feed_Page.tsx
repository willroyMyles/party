import React, {useEffect, useState} from "react"
import {View, Card, Image, Text, TouchableOpacity, Button} from "react-native-ui-lib"
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
	const [data, setdata] = useState(dataProvider.data)
	useEffect(() => {
		dataProvider.generateFakeData().then((res) => {
			setdata(dataProvider.data)
		})
	}, [])

	const handleViewClick = (item: FeedItemModel) => {
		dataProvider.currentEvent = item
		navigation.navigate("event")
	}

	const theme: any = useTheme()

	return (
		<View bg-background style={{height: "100%"}}>
			{/* <ScrollView> */}
			<Text imp>Feed pages</Text>
			<View style={{height: 200, width: 200, backgroundColor: theme.body}} />
			{/* <FlatList
				onScroll={(e) => {}}
				style={{flexGrow: 1, flexDirection: "column"}}
				data={data}
				keyExtractor={({item, index}) => index}
				renderItem={({item, index, separators}) => {
					return <Feed_Item key={index} onClick={handleViewClick} index={index} item={item} />
				}}
			/> */}
		</View>
	)
}

export default Feed_Page
