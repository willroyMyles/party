import React from "react"
import {  Colors, Text, View } from "react-native-ui-lib"
import MapView, { Marker, LatLng, Callout, Region, CalloutSubview } from "react-native-maps"
import { FeedItemModel } from "../universal/Models"
import { getLatitudeLongitudeFromString } from "../universal/GetLocation"
import Mapcard from "./Mapcard"
import { Dimensions } from "react-native"

const { width, height } = Dimensions.get( "screen" )

const MarkerPin = (props: { marker?: LatLng }) => {
	if (props.marker)
		return <Marker image={require( "../assets/images/splash.jpg" )} pinColor="green" coordinate={props.marker}>
			
		</Marker>
	else return <View />
}

export const MarkerPinItem = (props: { value: FeedItemModel, onPressed? : (reference:string) => void, region:Region }) => {

	const w = width * .975

	const coord: LatLng | undefined = getLatitudeLongitudeFromString(props.value.location)
	if (coord)
		return <Marker
			image={require( "../assets/images/marker.png" )}
			pinColor="green"
			coordinate={coord}
			onPress={() => props.onPressed ? props.onPressed( props.value.reference ) : null}
		>
		</Marker>
	else return <View />
}
export default MarkerPin

