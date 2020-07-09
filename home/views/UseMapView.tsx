import React, {useState} from "react"
import {View, Text, Button} from "react-native-ui-lib"
import {useTheme} from "styled-components"
import MapView, {Marker} from "react-native-maps"
import {Dimensions, StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import * as Location from "expo-location"
import {eventEmitter, eventStrings} from "../../universial/EventEmitter"
import {useNavigation} from "@react-navigation/native"

const UseMapView = (props: {setValue: () => null}) => {
	const theme = useTheme()
	const navigation = useNavigation()
	const [marker, setMarker] = useState<any>(null)
	const [loc, setloc] = useState<any>(undefined)

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

				const {width, height} = Dimensions.get("window")
				const ASPECT_RATIO = width / height

				const northeastLat = res.coords.latitude + 0.03 // for scale
				const southwestLat = res.coords.latitude
				const latDelta = northeastLat - southwestLat
				const lngDelta = latDelta * ASPECT_RATIO

				let region = {
					latitude: res.coords.latitude,
					longitude: res.coords.longitude,
					latitudeDelta: latDelta,
					longitudeDelta: lngDelta,
				}

				setloc(region)
				setMarker(res.coords)
			})
		}
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
					showsUserLocation
					region={loc}
					onPress={(e) => {
						setloc(null)
						setMarker(e.nativeEvent.coordinate)
					}}
					style={{width: Dimensions.get("screen").width, height: "100%"}}>
					{marker && (
						<Marker image={require("../../assets/marker.png")} pinColor="red" coordinate={marker}>
							{/* <View style={{padding: 10, marginTop: -20, overflow: "visible"}}>
								<Text>SF</Text>
							</View> */}
						</Marker>
					)}
				</MapView>
			</View>
			<View row marginV-35 style={{justifyContent: "space-around", position: "absolute", width: "100%", bottom: 5}}>
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
