import React from "react"
import {View, Text} from "react-native-ui-lib"
import MapView from "react-native-maps"
import {Dimensions} from "react-native"

const NearMeView = () => {
	return (
		<View flex>
			<MapView style={{width: Dimensions.get("screen").width, height: "100%"}}></MapView>
		</View>
	)
}

export default NearMeView
