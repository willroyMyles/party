import React from "react"
import {View, Image, Avatar, Text, Button, Colors} from "react-native-ui-lib"
import dataProvider from "../../dataLayer/DataStore"
import {FeedItemModel} from "../../universial/Models"
import UseSmallMapView from "./UseSmallMapView"
import {ScrollView, Dimensions} from "react-native"
import moment from "moment"
import {SharedElement} from "react-navigation-shared-element"
import BackButton from "../../components/BackButton"
import RSVPButton from "../../components/RSVPButton"

const EventView = ({preview}: {preview?: boolean}) => {
	// const route = useRoute()
	const e: FeedItemModel | undefined = dataProvider.currentEvent

	if (e)
		return (
			<View flex>
				<View flex bg-background paddingB-20>
					<View>
						<SharedElement id={e.reference + "img"}>
							<Image
								style={{borderRadius: 6, height: 400}}
								source={{uri: e.imageUrl}}
								resizeMethod="scale"
								resizeMode="cover"></Image>
						</SharedElement>
						<RSVPButton reference={e.reference} />
					</View>
					<BackButton />
					<ScrollView contentContainerStyle={{justifyContent: "center"}} style={{flex: 1}} scrollEnabled>
						<View padding-10>
							<View padding-5 center marginV-10>
								<Avatar backgroundColor={Colors.grey40} label={e.person} />
								<View paddingL-10 />
								<Text hint>organizers</Text>
							</View>
							<SharedElement id={e.reference + "title"}>
								<Text imp>{e.title}</Text>
							</SharedElement>
							<View marginV-10>
								{/* <DateBox date={e.date} shadow /> */}
								<Text reg>{e.date}</Text>
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
					</ScrollView>
				</View>
				{preview && (
					<View marginV-2 row style={{justifyContent: "space-around", paddingBottom: 15}}>
						<Button onPress={() => {}} bg-primary size="large" borderRadius={2}>
							<Text btn>back</Text>
						</Button>
						<Button onPress={() => {}} bg-primary size="large" borderRadius={2}>
							<Text btn>proceed</Text>
						</Button>
					</View>
				)}
			</View>
		)
	else {
		return <View></View>
	}
}

EventView.sharedElements = () => {
	const item: FeedItemModel = dataProvider.currentEvent
	const img = item.reference + "img"
	const tit = item.reference + "title"
	return [
		{id: img, animation: "move"},
		{id: tit, animation: "fade"},
	]
}
export default EventView
