import React from "react"
import {View, Card, Image, Avatar, Text, TouchableOpacity, Button, Colors} from "react-native-ui-lib"
import dataProvider from "../../dataLayer/DataStore"

const EventView = () => {
	const event = dataProvider.currentEvent
	return (
		<View bg-background flex-1>
			<Image style={{borderRadius: 6}} source={{uri: event.image}} cover />
			<View padding-10 marginV-25>
				<View marginV-0>
					<View padding-10 style={{flexDirection: "row", alignItems: "center"}}>
						<Avatar backgroundColor={Colors.grey40} label={event.person} />
						<View paddingL-10 />
						<Text reg>organizers</Text>
					</View>
				</View>
				<View marginV-10>
					<Text imp>{event.title}</Text>
				</View>
				<View marginV-10>
					<Text>time</Text>
				</View>
				<View marginV-10>
					<Text>location</Text>
				</View>
				<View marginV-10>
					<Text>admission</Text>
				</View>
				<View marginV-10>
					<Text imp1>about</Text>
					<View padding-10>
						<Text reg>{event.about}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default EventView
