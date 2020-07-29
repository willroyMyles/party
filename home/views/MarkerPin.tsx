import React from "react"
import {StyleSheet, Text, View} from "react-native"
import MapView, {Marker, LatLng} from "react-native-maps"

const MarkerPin = (props: {marker?: LatLng}) => {
	if (props.marker)
		return <Marker image={require("../../assets/marker.png")} pinColor="green" coordinate={props.marker}></Marker>
	else return <View />
}

export default MarkerPin

const styles = StyleSheet.create({})
