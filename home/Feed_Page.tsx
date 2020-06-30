import React, {useEffect} from "react"
import {View, Card, Image, Text, TouchableOpacity, Button} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {List, ListItem, Layout} from "@ui-kitten/components"
import dataProvider from "../dataLayer/DataStore"
import {FlatList, ScrollView} from "react-native"
import moment from "moment"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"
import {useNavigation} from "@react-navigation/native"

const Feed_Page = () => {
	const navigation = useNavigation()
	useEffect(() => {
		dataProvider.generateFakeData()
	}, [])

	const handleViewClick = (event: any) => {
		dataProvider.currentEvent = event
		navigation.navigate("event")
	}

	return (
		<View bg-background style={{flex: 1, minHeight: 100, height: "100%", overflow: "scroll"}}>
			{/* <ScrollView> */}
			<Text imp>Feed pages</Text>
			<FlatList
				style={{flexGrow: 1, flexDirection: "column"}}
				data={dataProvider.data}
				keyExtractor={({item, index}) => index}
				renderItem={({item, index, separators}) => {
					return (
						<View key={index} bg-background_secondary margin-20 br20 style={{elevation: 4, overflow: "hidden"}}>
							<View>
								<Image style={{borderRadius: 6}} source={{uri: item.image}} cover />
								<View
									style={{
										position: "absolute",
										backgroundColor: "rgba(0,0,0,.1)",
										height: "100%",
										width: "100%",
										justifyContent: "center",
										alignItems: "flex-end",
										alignSelf: "center",
										opacity: 0,
									}}>
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											backgroundColor: "rgba(20,20,20,.7)",
											height: "40%",
											width: "30%",
											borderRadius: 7,
											justifyContent: "center",
											alignItems: "center",
										}}>
										<View>
											<Text btn>View </Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
								<View flex-3 padding-15>
									<Text date>{moment(item.date).format("MMMM DD, YYYY")}</Text>
									<Text reg marginT-3>
										{item.title}
									</Text>
									<Text hint>{item.hint}</Text>
								</View>
								<View flex-1>
									<TouchableOpacity
										onPress={() => {
											// eventEmitter.emit(eventStrings.eventClicked, item)
											handleViewClick(item)
										}}
										activeOpacity={0.8}
										style={{
											backgroundColor: "rgba(0,0,120,.06)", //find color base on thee
											height: "100%",
											justifyContent: "center",
											alignItems: "center",
										}}>
										<View>
											<Text reg>View</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)
				}}
			/>
			<View>
				<Button>
					<Text>load more</Text>
				</Button>
			</View>
			{/* </ScrollView> */}
		</View>
	)
}

export default Feed_Page
