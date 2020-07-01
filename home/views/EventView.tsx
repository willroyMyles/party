import React from "react"
import {View, Card, Image, Avatar, Text, TouchableOpacity, Button, Colors} from "react-native-ui-lib"
import dataProvider from "../../dataLayer/DataStore"

const EventView = () => {
	const event = dataProvider.currentEvent
	return (
		<View bg-background flex-1>
			<Image style={{borderRadius: 6}} source={{uri: event.image}} cover />
			<View padding-10>
				<View padding-5 center marginV-10>
					<Avatar backgroundColor={Colors.grey40} label={event.person} />
					<View paddingL-10 />
					<Text hint>organizers</Text>
				</View>
				<View marginV-10>
					<Text imp1>{event.title}</Text>
				</View>
				<View marginV-10>
					<Text reg>time</Text>
				</View>
				<View marginV-10>
					<Text reg>location</Text>
				</View>
				<View marginV-10>
					<Text reg>admission</Text>
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
