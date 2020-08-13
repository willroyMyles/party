import React, { useState, useEffect } from "react"
import { View, Text, LoaderScreen, Colors } from "react-native-ui-lib"
import MapView, { Marker } from "react-native-maps"
import { Dimensions } from "react-native"
import { LocationData } from "expo-location"
import { useTheme } from "styled-components"

const UseSmallMapView = ( { loc }: { loc?: any } ) =>
{

	const theme = useTheme()
	
	const [loading, setLoading] = useState( true )
	const [region, setRegion] = useState<any>()
	useEffect(() => {
		const gong = String(loc).split(",")
	const latitude = Number.parseFloat(gong[0])
	const longitude = Number.parseFloat(gong[1])

	const { width, height } = Dimensions.get("window")
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
		setRegion( region )
		setLoading(false)
	}, [] )
	

	if ( loading ) return <View style={{ width: "100%", height: 250, elevation: 2 }}>
				<Text marginL-10  lvl3>location</Text>
	
		<LoaderScreen   />
	</View>

	




	return (
		<View bg-background marginT-10>
				<Text marginL-12 marginB-5 lvl3>location</Text>
			
			<View margin-10 br20 style={{ overflow: "hidden", marginTop:0, borderWidth:2, borderColor:Colors.foreground }}>
				<MapView
					scrollEnabled={false}
					showsUserLocation={false}
					loadingEnabled
					loadingBackgroundColor="red"
					loadingIndicatorColor="blue"
					region={region}
					zoomEnabled={false}
					toolbarEnabled
					
					onPoiClick={(e) => { }}
					onPress={(e) => {
						// setloc(null)
						// setMarker(e.nativeEvent.coordinate)
					}}
					style={{ width: "100%", height: 250 }}>
					<Marker image={require("../assets/images/marker.png")} pinColor="red" coordinate={region}></Marker>
				</MapView>
			</View>
		</View>
	)
}

export default UseSmallMapView
