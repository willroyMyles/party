import React, {useState, useEffect, useCallback} from "react"
import {View, Text, Colors} from "react-native-ui-lib"
import MapView, {LatLng, Circle} from "react-native-maps"
import {Dimensions} from "react-native"
import * as Location from "expo-location"
import {DarkMapStyleWithoutLandmarks} from "../../universial/Theme"
import dataProvider from "../../dataLayer/DataStore"
import MarkerPin from "./MarkerPin"
import {FeedItemModel} from "../../universial/Models"
import {LocationRegion} from "expo-location"
import * as TaskManager from "expo-task-manager"
import {useTheme} from "styled-components"
import * as faker from "faker"
import { eventEmitter, eventStrings } from "../../universial/EventEmitter"


TaskManager.isTaskRegisteredAsync("geoLocation").then(res =>{
	if(!res){
		console.log("defining tasks");
		
		TaskManager.defineTask("geoLocation", ({data , error} : {data : any, error : any}) => {
			if (error) {
				console.log(error)
				return
			}
			console.log(data.eventType == Location.GeofencingEventType.Enter,  "taskkkkkssksks");
		
			if(data.eventType == Location.GeofencingEventType.Enter){
				eventEmitter.emit(eventStrings.locationEntered, data.region.identifier )
			}
		})
	}
})



const {width, height} = Dimensions.get("window")

const NearMeView = () => {
	const theme = useTheme()
	const [loc, setloc] = useState<any>(undefined)
	const [loading, setloading] = useState(true)
	const [dataHolder, setData] = useState<FeedItemModel[]>([])
	const [regions, setRegions] = useState<LocationRegion[]>([])
	const radius = 1400
	useEffect( () => {


		// TaskManager.unregisterAllTasksAsync().then(res =>{
		// 	console.log("tasks unregistered");
		// })

		// Location.stopGeofencingAsync("geoLocation").then(res =>{
		// 	console.log("location stopped");
			
		// })


		getCurrentLocation()
		sortData()
		// eventEmitter.addListener(eventStrings.locationEntered, (ref:string)=>{
		// 	console.log(dataProvider.data.get(ref)?.title);
		// })
		
		
		// return () => {
		// 	eventEmitter.removeListener(eventStrings.locationEntered, () => null)
		// }
	}, [])

	useEffect(() => {
		if(regions.length > 0)
		geofencing()

	}, [regions])

	const getReference = useCallback((ref:string) => {
			if(ref) console.log(ref);
			
		},[])

	

	const geofencing = async (stop: boolean = false) => {

		Location.hasStartedGeofencingAsync("geoLocation").then ( async (res) =>{
			if(!res){
				console.log("defining geo location");
				await Location.startGeofencingAsync("geoLocation", regions).then(async (res) => {
					console.log("geo")
				})
			}
		})
	

	}

	const getCurrentLocation = async () => {
		var permission = await Location.getPermissionsAsync()
		if (!permission.granted && permission.canAskAgain) {
			permission = await Location.requestPermissionsAsync()
		}

		if (!permission.granted) return

		Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced, enableHighAccuracy: false})
			.then((res) => {
				setLocLocation(res.coords)
			})
			.catch((err) => {
				console.log("err", err)
			})
	}

	const setLocLocation = async (coor: LatLng) => {
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
	}

	const sortData = () => {

		const d : any[] = []
		const r : any[] = []
		dataProvider.data.forEach((value, key) => {
			r.push(value)

			const gong = String(value.location).split(",")
			const latitude = Number.parseFloat(gong[0])
			const longitude = Number.parseFloat(gong[1])
			const coord: LocationRegion = {
				latitude: latitude,
				longitude: longitude,
				radius,
				identifier: value.reference,
				notifyOnEnter: true,
				notifyOnExit: true,
			}

			d.push(coord)
		})
		setRegions(d)
		setData(r)
	}
	return (
		<View flex>
			<MapView
				customMapStyle={DarkMapStyleWithoutLandmarks}
				scrollEnabled
				// liteMode={true}
				region={loc}
				// loadingEnabled={loading}
				showsUserLocation
				style={{width: Dimensions.get("screen").width, height: "100%"}}>
				{/* {loc && <Circle radius={radius} center={loc} fillColor={Colors.primary + "22"} strokeWidth={1} />} */}
				{dataHolder.map((value, index) => {
					const gong = String(value.location).split(",")
					const latitude = Number.parseFloat(gong[0])
					const longitude = Number.parseFloat(gong[1])
					const coord = {latitude: latitude, longitude: longitude}
					return (
						<View key={index}>
							<MarkerPin marker={coord} />
							<Circle radius={radius} center={coord} fillColor={Colors.primary + "22"} strokeWidth={1} />
						</View>
					)
				})}
			</MapView>
		</View>
	)
}

export default NearMeView
