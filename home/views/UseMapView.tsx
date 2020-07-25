import React, {useState} from "react"
import {View, Text, Button, TouchableOpacity, Colors} from "react-native-ui-lib"
import {useTheme} from "styled-components"
import MapView, {Marker, LatLng} from "react-native-maps"
import {Dimensions, StyleSheet, TextInput} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import * as Location from "expo-location"
import {eventEmitter, eventStrings} from "../../universial/EventEmitter"
import {useNavigation} from "@react-navigation/native"
import axios from "axios"
import themeHelper from "../../universial/ThemeHelper"
import BackButton from "../../components/BackButton"
import {extraFixColorsMap} from "react-native-ui-lib/generatedTypes/style/colorsPalette"

const UseMapView = (props: {setValue: () => null}) => {
	const theme = useTheme()
	const navigation = useNavigation()
	const [marker, setMarker] = useState<any>(null)
	const [loc, setloc] = useState<any>(undefined)
	// const [scrollEnabled, setScrollEnabled] = useState(false)
	const [map, setMap] = useState<MapView>()

	const useLocation = async () => {
		const perm = await Location.getPermissionsAsync()
		if (!perm.granted && perm.canAskAgain) {
			//asl permission
			const result = await getLocationPermission()
		}

		if (perm.granted) {
			Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Balanced,
			}).then((res) => {
				let boundingBox = {
					southWest: {
						latitude: res.coords.latitude,
						longitude: res.coords.longitude,
					},
					northEast: {
						latitude: res.coords.latitude + 0.03,
						longitude: res.coords.longitude - 0.05,
					},
				}

				setLocLocation(res.coords)
			})
		}
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
		setMarker(coor)

		const lat = coor.latitude
		const lon = coor.longitude
	}

	const getLocationPermission = () => {
		return new Promise(async (resolve) => {
			const result = await Location.requestPermissionsAsync()
		})
	}

	const confirm = () => {
		eventEmitter.emit(eventStrings.locationConfirmed, loc)
		navigation.goBack()
	}

	return (
		<View flex-5 bg-background>
			<View flex-5>
				<MapView
					// liteMode
					mapType="standard"
					ref={(e) => setMap(e || undefined)}
					showsScale
					showsMyLocationButton
					showsUserLocation
					// showsMyLocationButton
					region={loc}
					onPress={(e) => {
						setLocLocation(e.nativeEvent.coordinate)
					}}
					onPoiClick={(e) => {
						console.log(e)
					}}
					style={{width: Dimensions.get("screen").width, height: "100%"}}>
					{marker && (
						<Marker draggable image={require("../../assets/marker.png")} pinColor="red" coordinate={marker}></Marker>
					)}
				</MapView>
				<BackButton />
				{/* <View
					style={{
						position: "absolute",
						top: 25,
						left: "20%",
						width: "60%",
						padding: 5,
						flexDirection: "row",
						borderWidth: 0,
					}}>
					<TextInput placeholder="search" style={[themeHelper.styles.input, {flex: 1}]} />
				</View> */}
			</View>
			<View row marginV-35 style={{justifyContent: "space-around", position: "absolute", width: "100%", bottom: 5}}>
				<Button
					outline
					outlineColor={Colors.primary}
					outlineWidth={3}
					onPress={() => navigation.goBack()}
					bg-primary
					size="large"
					borderRadius={2}>
					<Text btn color={Colors.primary} style={{fontWeight: "700"}}>
						cancel
					</Text>
				</Button>
				<Button style={styles.btn} onPress={() => useLocation()} bg-primary size="large" borderRadius={2}>
					<Text btn>use location</Text>
				</Button>
				<Button style={styles.btn} onPress={() => confirm()} bg-primary size="large" borderRadius={2}>
					<Text btn>confirm</Text>
				</Button>
			</View>
		</View>
	)
}

export default UseMapView

const styles = StyleSheet.create({
	btn: {
		elevation: 5,
	},
})
