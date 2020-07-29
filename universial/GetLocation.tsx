import { promises } from "fs";

import * as Location from "expo-location"
import { LatLng, Region } from "react-native-maps";
import { Dimensions } from "react-native";


export const getLocation =  () => new Promise<LatLng>( async (resolve,reject)  =>{
    const perm = await Location.getPermissionsAsync()
    if (!perm.granted && perm.canAskAgain) {
        const result = await Location.requestPermissionsAsync()
    }

    if(!perm.granted) reject("not granted")

    if(perm.granted){
        Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced}).then(res=>{
            resolve(res.coords)
        })
    }
})

export const getRegion = (coords: LatLng) => new Promise<Region>((resolve, reject)=>{
    const {width, height} = Dimensions.get("window")
    const ASPECT_RATIO = width / height

    const latDelta = .03
    const lngDelta = latDelta * ASPECT_RATIO

    let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
    }

    resolve(region)

})

export const getLatitudeLongitudeFromString = (ll?: string) => {
    if(!ll) return undefined
    const gong = String(ll).split(",")
	const latitude = Number.parseFloat(gong[0])
	const longitude = Number.parseFloat(gong[1])
	const coord: LatLng = {
		latitude: latitude,
		longitude: longitude,
    }
    
    return coord
}