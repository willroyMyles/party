import React from "react"
import { StyleSheet, Text, View } from "react-native"
import MapView, { Marker, LatLng } from "react-native-maps"
import { FeedItemModel } from "../universal/Models"
import { getLatitudeLongitudeFromString } from "../universal/GetLocation"


const MarkerPin = (props: { marker?: LatLng }) => {
	if (props.marker)
		return <Marker image={require("../assets/images/marker.png")} pinColor="green" coordinate={props.marker}></Marker>
	else return <View />
}

export const MarkerPinItem = (props: { value: FeedItemModel, onPressed? : (reference:string) => void }) => {


	const coord: LatLng | undefined = getLatitudeLongitudeFromString(props.value.location)
	if (coord)
		return <Marker image={require("../assets/images/marker.png")} pinColor="green" coordinate={coord} onPress={e => props.onPressed? props.onPressed(props.value.reference||"") : null}></Marker>
	else return <View />
}
export default MarkerPin

const styles = StyleSheet.create({})
