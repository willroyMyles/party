import React, { useState, useEffect } from "react"
import { View, Text, LoaderScreen, Colors, TouchableOpacity } from "react-native-ui-lib"
import MapView, { Marker, Region } from "react-native-maps"
import { Dimensions } from "react-native"
import { LocationData } from "expo-location"
import { useTheme } from "styled-components"
import { getLatitudeLongitudeFromString } from "../universal/GetLocation"
import { showLocation } from 'react-native-map-link'
import { BackDropV2 } from "../components/BackDrop"

const UseSmallMapView = ( { loc }: { loc?: any } ) =>
{

	const theme = useTheme()
	
	const [loading, setLoading] = useState( true )
	const [region, setRegion] = useState<Region>()
	useEffect(() => {


	const { latitude, longitude } = getLatitudeLongitudeFromString(loc)
	const { width, height } = Dimensions.get("window")
	const ASPECT_RATIO = width / height

	const northeastLat = latitude + 0.03 // for scale
	const southwestLat = latitude
	const latDelta = northeastLat - southwestLat
		const lngDelta = latDelta * ASPECT_RATIO
		
	const region = {
		latitude,
		longitude,
		latitudeDelta: latDelta,
		longitudeDelta: lngDelta,
	}
		setRegion( region )
		setLoading(false)
	}, [] )

	const onPress = () =>
	{
		showLocation( {
			latitude: region?.latitude,
			longitude: region?.longitude,
			
		})
	}
	

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
				<View style={{
					position: "absolute",
					bottom: 7,
					right: 7,
					backgroundColor: Colors.background,
					elevation: 7,
					padding: 8,
					borderRadius: 3,
					overflow:"hidden"
				}}>
					<TouchableOpacity
						activeOpacity={.85}
						onPress={onPress}
					>
						<Text lvl2 uppercase style={{fontWeight:"700"}}>
							navigate
						</Text>
						<BackDropV2 />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default UseSmallMapView
