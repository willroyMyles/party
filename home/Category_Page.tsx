import React, {useState, useEffect} from "react"
import {View, Text} from "react-native-ui-lib"
import {Dimensions, SectionList} from "react-native"
import {useTheme} from "styled-components"
import {FeedItemModel, PartyType} from "../universial/Models"
import Feed_Item from "../components/Feed_Item"
import {useNavigation} from "@react-navigation/native"
import dataProvider from "../dataLayer/DataStore"
import * as faker from "faker"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"

const Category_Page = () => {
	const navigation = useNavigation()
	const [data, setdata] = useState<any[]>()
	useEffect(() => {
		// setdata(dataProvider.data)
		const d: any = []
		dataProvider.data.forEach((item, key) => {
			d.push(item)
		})
		sortData(d)
	}, [dataProvider.data])

	const sortData = (data1: FeedItemModel[]) => {
		const obj: any = {title: "", data: []}
		const map = new Map<string, FeedItemModel[]>()
		data1.map((value, index) => {
			const key = PartyType[value.partyType || PartyType.AFTER_WORK_JAM]

			if (map.has(key)) {
				map.get(key)?.push(value)
			} else {
				map.set(key, [value])
			}
		})

		const arr: Array<Object> = []
		const newMap = [...map]

		newMap.forEach(async (value: [string, FeedItemModel[]], index) => {
			obj.title = value[0]
			obj.data = value[1]
			arr[index] = {title: value[0], data: value[1]}
		})

		setdata(arr)
	}

	const handleViewClick = (item: FeedItemModel) => {
		dataProvider.currentEvent = item
		navigation.navigate("event")
	}

	const theme: any = useTheme()

	const Listt = () => {
		return (
			<SectionList
				onScroll={(e) => {}}
				// scrollEnabled={false}
				// contentContainerStyle={{borderWidth: 1, overflow: "visible", flex: 3}}
				style={{borderWidth: 0, flex: 1}}
				sections={data}
				renderItem={({item, index}) => {
					return (
						<View marginV-5 key={index}>
							<Feed_Item onClick={handleViewClick} index={index} item={item} />
						</View>
					)
				}}
				renderSectionHeader={({section: {title}}) => <Text imp1>{title}</Text>}
				keyExtractor={(item: FeedItemModel) => item.reference || faker.random.number(20000000000).toString()}
			/>
		)
	}

	return (
		<View flex bg-background style={{height: "100%", overflow: "scroll"}}>
			<Listt />
		</View>
	)
}

export default Category_Page
