import React, {useState, useEffect, useCallback, memo} from "react"
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


const {width, height} = Dimensions.get("window")
const radius = 1400

const Map = memo((props : any) =>{

	return <MapView
	customMapStyle={DarkMapStyleWithoutLandmarks}
	scrollEnabled
	region={props.region}
	showsUserLocation
	style={{width: Dimensions.get("screen").width, height: "100%"}}>
	{/* {dataHolder.map((value, index) => {
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
	})} */}
</MapView>
})

const NearMeView = () => {
	const theme = useTheme()
	const [loc, setloc] = useState<any>(undefined)
	const [dataHolder, setData] = useState<FeedItemModel[]>([])
	const [regions, setRegions] = useState<LocationRegion[]>([])
	const [ids, setIds] = useState<string[]>([])
	useEffect( () => {


		// TaskManager.unregisterAllTasksAsync().then(res =>{
		// 	console.log("tasks unregistered");
		// })

		// Location.stopGeofencingAsync("geoLocation").then(res =>{
		// 	console.log("location stopped");
		// })


		getCurrentLocation()
		sortData()
		eventEmitter.addListener(eventStrings.locationEntered, (ref:string)=>{
			if(!ids.includes(ref)) setIds((ids) => ids.concat(ref))
		})
		console.log(eventEmitter.listeners, "listeners enter");
		
		
		return () => {
			eventEmitter.removeListener(eventStrings.locationEntered, () => console.log("exiting"));
			
			console.log(eventEmitter.listeners.length, "listeners exit");

		}
	}, [])

	useEffect(() => {
		if(regions.length > 0)  geofencing()

	}, [regions])

	const getReference = useCallback((ref?:string) => {
		console.log("hello from the other side");
		
			if(ref){

console.log(ids);

			}
			else console.log("ref removed");
			

		},[])



	const geofencing = async (stop: boolean = false) => {
		const taskname = "geoLocation"
		const geoEnabled = await TaskManager.isTaskRegisteredAsync(taskname)
		console.log("is sgeo location enabled", geoEnabled);
		
		Location.startGeofencingAsync(taskname, regions)
Location.hasStartedGeofencingAsync(taskname).then(async (hasStarted) =>{



	// if(hasStarted){
	// 	Location.stopGeofencingAsync(taskname).then(async res=>{

	// 		await Location.startGeofencingAsync(taskname, regions)
	// 		console.log("stop and start geo");
	// 	})
	// 	.catch(err => console.log("errerrrer", err))
		
		
	// }else{
	// 	await Location.startGeofencingAsync(taskname, regions)
	// 	console.log("start geo");
	// }
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
			<Map region={loc} />
			<View absB bottom-20>
			{ids.map((value, index)=>{
				console.log("hey");
				
				return <View padding-10 bg-white key={index}><Text>{value}</Text></View>
			})}
			</View>
		</View>
	)
}

export default NearMeView
