import React, {useEffect, useState} from "react"
import {View, Button, Text} from "react-native-ui-lib"
import dataProvider from "../dataLayer/DataStore"
import {FlatList} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {FeedItemModel} from "../universial/Models"
import {useTheme} from "styled-components"
import Feed_itemV2 from "../components/Feed_itemV2"
import {values} from "mobx"
import moment from "moment"
import Feed_Item from "../components/Feed_Item"

const Feed_Page = () => {
	const theme = useTheme()
	const navigation = useNavigation()
	const [data, setdata] = useState<FeedItemModel[]>([])
	useEffect(() => {
		getPastEvents()
	}, [])

	const handleViewClick = (item: FeedItemModel) => {
		dataProvider.currentEvent = item
		navigation.navigate("event", item)
	}

	const getPastEvents = () => {
		//should really fetch data and sort in data layer...
		const d: FeedItemModel[] = []
		dataProvider.data.forEach((val: FeedItemModel, key) => {
			if (checkDate(val.date)) d.push(val)
		})

		setdata(d)
	}

	const checkDate = (d: string) => {
		const old = Date.parse(d)
		const comp = new Date().valueOf()
		// console.log(d, d < comp)

		return old <= comp
	}

	return (
		<View bg-background flex>
			<FlatList
				onScroll={() => {}}
				// style={{borderWidth: 0, flex: 1}}
				data={data}
				renderItem={({item, index}) => {
					return (
						<View key={index}>
							<Feed_Item onClick={handleViewClick} index={index} item={item} />
						</View>
					)
				}}
				keyExtractor={(item: FeedItemModel) => item.reference || fakerStatic.random.number(20000000000).toString()}
			/>
			<View center>
				<Button onPress={() => getPastEvents()}>
					<Text btn>load feed </Text>
				</Button>
			</View>
		</View>
	)
}

export default Feed_Page
