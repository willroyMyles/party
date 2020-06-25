import React, {useEffect} from "react"
import {View, Card, Image, Text} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {List, ListItem, Layout} from "@ui-kitten/components"
import dataProvider from "../dataLayer/DataStore"
import {FlatList} from "react-native"
import moment from "moment"

const Feed_Page = () => {
	useEffect(() => {
		dataProvider.generateFakeData()
	}, [])
	return (
		<View bg-background style={{flex: 1, minHeight: 100}}>
			<Text>Feed pages</Text>
			<FlatList
				data={dataProvider.data}
				keyExtractor={({item, index}) => index}
				renderItem={({item, index, separators}) => {
					return (
						<View key={index} bg-background_secondary margin-20 br20 style={{elevation: 4}}>
							<Image style={{borderRadius: 6}} source={{uri: item.image}} cover />
							<View padding-10 style={{flex: 1, alignItems: "center"}}>
								<Text date>{moment(item.date).format("MMMM DD, YYYY")}</Text>
								<Text reg marginT-3>
									{item.title}
								</Text>
								<Text hint>{item.hint}</Text>
							</View>
						</View>
					)
				}}
			/>
		</View>
	)
}

export default Feed_Page
