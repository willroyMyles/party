import React from "react"
import {StyleSheet, Text, View} from "react-native"
import MapView, {Marker, LatLng} from "react-native-maps"
import { FeedItemModel } from "../../universial/Models"
import { getLatitudeLongitudeFromString } from "../../universial/GetLocation"

const MarkerPin = (props: {marker?: LatLng}) => {
	if (props.marker)
		return <Marker image={require("../../assets/marker.png")} pinColor="green" coordinate={props.marker}></Marker>
	else return <View />
}

export const MarkerPinItem = (props: {value: FeedItemModel}) => {


	const coord: LatLng | undefined = getLatitudeLongitudeFromString(props.value.location)
	if (coord)
		return <Marker image={require("../../assets/marker.png")} pinColor="green" coordinate={coord}></Marker>
	else return <View />
}
export default MarkerPin

const styles = StyleSheet.create({})
