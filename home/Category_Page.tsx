import React, {useState, useEffect} from "react"
import {View, Text, TouchableOpacity, Colors} from "react-native-ui-lib"
import {Dimensions, SectionList, FlatList} from "react-native"
import {useTheme} from "styled-components"
import {FeedItemModel, PartyType} from "../universial/Models"
import Feed_Item from "../components/Feed_Item"
import {useNavigation} from "@react-navigation/native"
import dataProvider from "../dataLayer/DataStore"
import * as faker from "faker"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"
import Feed_itemV2 from "../components/Feed_itemV2"
import uiManager from "../dataLayer/UiManager"

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
			//add slice here to limit data
			arr[index] = {title: value[0], data: value[1].slice(0, 2)}
		})

		setdata(arr)
	}

	const handleViewClick = (item: FeedItemModel) => {
		dataProvider.currentEvent = item
		navigation.navigate("event")
	}

	const theme: any = useTheme()

	return (
		<View bg-background style={{borderWidth: 0}}>
			<SectionList
				onScroll={(e) => {}}
				stickySectionHeadersEnabled
				// style={{borderWidth: 5}}
				sections={data || []}
				extraData={
					<View>
						<Text>hi</Text>
					</View>
				}
				renderItem={({item, index, section, separators}) => {
					// const d = section.data.slice(0, 3)

					return (
						<View marginV-5 key={index}>
							<Feed_itemV2 onClick={handleViewClick} index={index} item={item} />
						</View>
					)
				}}
				renderSectionHeader={({section: {title}}) => (
					<View
						row
						paddingH-15
						paddingV-10
						paddingT-35
						marginB-5
						// marginT-30
						style={{
							justifyContent: "space-between",
							backgroundColor: uiManager.theme.background,
							// elevation: 2,
							// borderBottomWidth: 2,
							// borderTopWidth: 2,
							borderColor: Colors.grey50,
						}}>
						<Text imp1 color={Colors.primary}>
							{title}
						</Text>
						<TouchableOpacity>
							<Text imp1> view all</Text>
						</TouchableOpacity>
					</View>
				)}
				keyExtractor={(item: FeedItemModel) => item.reference || faker.random.number(20000000000).toString()}
			/>
		</View>
	)
}

export default Category_Page
