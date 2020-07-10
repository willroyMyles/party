import React from "react"
import {View, Text} from "react-native-ui-lib"
import MapView, {Marker} from "react-native-maps"
import {Dimensions} from "react-native"
import {LocationData} from "expo-location"

const UseSmallMapView = ({loc}: {loc?: any}) => {
	if (!loc) return <View></View>

	const gong = String(loc).split(",")
	const latitude = Number.parseFloat(gong[0])
	const longitude = Number.parseFloat(gong[1])

	const {width, height} = Dimensions.get("window")
	const ASPECT_RATIO = width / height

	const northeastLat = latitude + 0.03 // for scale
	const southwestLat = latitude
	const latDelta = northeastLat - southwestLat
	const lngDelta = latDelta * ASPECT_RATIO

	const region = {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: latDelta,
		longitudeDelta: lngDelta,
	}
	return (
		<View bg-background>
			<View>
				<MapView
					scrollEnabled={false}
					showsUserLocation={false}
					loadingEnabled
					region={region}
					zoomEnabled
					toolbarEnabled
					onPoiClick={(e) => {}}
					onPress={(e) => {
						// setloc(null)
						// setMarker(e.nativeEvent.coordinate)
					}}
					style={{width: "100%", height: 250}}>
					<Marker image={require("../../assets/marker.png")} pinColor="red" coordinate={region}></Marker>
				</MapView>
			</View>
		</View>
	)
}

export default UseSmallMapView
