import React from "react"
import {View, Card, Image, Avatar, Text, TouchableOpacity, Button, Colors} from "react-native-ui-lib"
import dataProvider from "../../dataLayer/DataStore"
import {FeedItemModel} from "../../universial/Models"
import {useNavigation, useRoute} from "@react-navigation/native"
import UseSmallMapView from "./UseSmallMapView"
import {ScrollView} from "react-native"
import moment from "moment"
import DateBox from "../../components/DateBox"
import DateAndTimeBox from "../../universial/DateAndTimeBox"
import {SharedElement, SharedElementsComponentConfig} from "react-navigation-shared-element"

const EventView = ({preview}: {preview?: boolean}) => {
	// const route = useRoute()
	const e: FeedItemModel | undefined = dataProvider.currentEvent

	if (e)
		return (
			<ScrollView style={{flex: 1, borderWidth: 1}}>
				<View bg-background paddingB-20>
					<SharedElement id={e.reference + "img"}>
						<Image style={{borderRadius: 6, height: 330}} source={{uri: e.flyer}} aspectRatio={1.33} />
					</SharedElement>
					<View padding-10>
						<View padding-5 center marginV-10>
							<Avatar backgroundColor={Colors.grey40} label={e.person} />
							<View paddingL-10 />
							<Text hint>organizers</Text>
						</View>
						<View marginV-10>
							<SharedElement id={e.reference + "title"}>
								<Text imp>{e.title}</Text>
							</SharedElement>
						</View>
						<View marginV-10>
							{/* <DateBox date={e.date} shadow /> */}
							<Text reg>{moment(e.date).format("MMM D, YYYY")}</Text>
							<Text reg>
								{e.start} - {e.end}
							</Text>

							{/* <DateAndTimeBox date={e.date} start={e.start} end={e.end} shadow /> */}
						</View>
						<View marginV-20>
							<Text hint>INFORMATION</Text>
							<Text reg>{e.description}</Text>
						</View>

						<View marginV-10>
							<Text reg>{e.admission}</Text>
						</View>
						<View marginV-10>
							<UseSmallMapView loc={e.location} />
						</View>
					</View>
				</View>
				{preview && (
					<View marginV-2 row style={{justifyContent: "space-around", paddingBottom: 15}}>
						<Button onPress={(e: any) => {}} bg-primary size="large" borderRadius={2}>
							<Text btn>back</Text>
						</Button>
						<Button onPress={(e: any) => {}} bg-primary size="large" borderRadius={2}>
							<Text btn>proceed</Text>
						</Button>
					</View>
				)}
			</ScrollView>
		)
	else {
		return <View></View>
	}
}

EventView.sharedElements = (route: any, otherRoute: any, showing: any) => {
	const item: FeedItemModel = dataProvider.currentEvent
	const img = item.reference + "img"
	const tit = item.reference + "title"
	return [
		{id: img, animation: "move"},
		{id: tit, animation: "fade"},
	]
}
export default EventView
