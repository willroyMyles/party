import React from "react"
import {View, Card, Image, Avatar, Text, TouchableOpacity, Button, Colors} from "react-native-ui-lib"
import dataProvider from "../../dataLayer/DataStore"
import {FeedItemModel} from "../../universial/Models"
import {useNavigation} from "@react-navigation/native"
import UseSmallMapView from "./UseSmallMapView"
import {ScrollView} from "react-native"
import moment from "moment"
import DateBox from "../../components/DateBox"
import DateAndTimeBox from "../../universial/DateAndTimeBox"

const EventView = ({preview}: {preview?: boolean}) => {
	const event: FeedItemModel = dataProvider.currentEvent
	const navigation = useNavigation()

	console.log(event)
	if (event)
		return (
			<ScrollView style={{flex: 1, borderWidth: 1}}>
				<View bg-background paddingB-20>
					<Image style={{borderRadius: 6}} source={{uri: event.flyer}} cover />
					<View padding-10>
						<View padding-5 center marginV-10>
							<Avatar backgroundColor={Colors.grey40} label={event.person} />
							<View paddingL-10 />
							<Text hint>organizers</Text>
						</View>
						<View marginV-10>
							<Text imp>{event.title}</Text>
						</View>
						<View marginV-10>
							{/* <DateBox date={event.date} shadow /> */}
							<Text reg>{moment(event.date).format("MMM D, YYYY")}</Text>
							<Text reg>
								{event.start} - {event.end}
							</Text>

							{/* <DateAndTimeBox date={event.date} start={event.start} end={event.end} shadow /> */}
						</View>
						<View marginV-20>
							<Text hint>INFORMATION</Text>
							<Text reg>{event.description}</Text>
						</View>

						<View marginV-10>
							<Text reg>{event.admission}</Text>
						</View>
						<View marginV-10>
							<UseSmallMapView loc={event.location} />
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
		return <div></div>
	}
}

export default EventView
