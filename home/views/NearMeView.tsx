import React, {useState, useEffect} from "react"
import {View, Text} from "react-native-ui-lib"
import MapView, {LatLng} from "react-native-maps"
import {Dimensions} from "react-native"
import * as Location from "expo-location"
import {DarkMapStyleWithoutLandmarks} from "../../universial/Theme"
const NearMeView = () => {
	const [loc, setloc] = useState<any>(undefined)
	const [loading, setloading] = useState(true)
	useEffect(() => {
		getCurrentLocation()
	}, [])

	const getCurrentLocation = async () => {
		var permission = await Location.getPermissionsAsync()
		if (!permission.granted && permission.canAskAgain) {
			permission = await Location.requestPermissionsAsync()
		}

		if (!permission.granted) return

		// const pro = await Location.getProviderStatusAsync()
		// console.log(pro)

		console.log("requesting location")

		Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, enableHighAccuracy: false})
			.then((res) => {
				console.log(res)
				setLocLocation(res.coords)
			})
			.catch((err) => {
				console.log("err", err)
			})
	}

	const setLocLocation = async (coor: LatLng) => {
		const {width, height} = Dimensions.get("window")
		const ASPECT_RATIO = width / height

		const northeastLat = coor.latitude + 0.03 // for scale
		const southwestLat = coor.latitude
		const latDelta = northeastLat - southwestLat
		const lngDelta = latDelta * ASPECT_RATIO

		let region = {
			latitude: coor.latitude,
			longitude: coor.longitude,
			latitudeDelta: latDelta,
			longitudeDelta: lngDelta,
		}

		setloc(region)
		// setMarker(coor)

		const lat = coor.latitude
		const lon = coor.longitude
	}
	return (
		<View flex>
			<MapView
				customMapStyle={DarkMapStyleWithoutLandmarks}
				toolbarEnabled
				liteMode={true}
				region={loc}
				loadingEnabled={loading}
				showsUserLocation
				style={{width: Dimensions.get("screen").width, height: "100%"}}></MapView>
		</View>
	)
}

export default NearMeView
