import React from "react"
import {View, Text, Avatar, Colors, Image, Button} from "react-native-ui-lib"
import dataProvider from "../../dataLayer/DataStore"
import EventView from "./EventView"
import Row from "../../components/Row"
import {FeedItemModel} from "../../universial/Models"

const PreviewEventView = () => {
	return (
		<View bg-background flex>
			<EventView preview />
		</View>
	)
}

export default PreviewEventView
