
import * as Location from "expo-location"
import { LatLng, Region } from "react-native-maps";
import { Dimensions } from "react-native";
import { eventEmitter, eventStrings } from "./EventEmitter";


export const getLocation = () => new Promise<any>(async (resolve, reject) => {
    try {
        const perm = await Location.getPermissionsAsync()        
        if ( !perm.granted && perm.canAskAgain )
        {
            //should request permission first?
            Location.requestPermissionsAsync().then( result =>
            {
            if ( !result.granted )
            {
                eventEmitter.emit( eventStrings.locationNotGranted )
                return reject( "not granted" )
                
            }
            } ).catch( err =>
            {
                eventEmitter.emit( eventStrings.locationNotGranted )
                return reject( "not granted" )

           })

        }

        if ( !perm.granted )
        {
            eventEmitter.emit(eventStrings.locationNotGranted)
            reject( "not granted" )
        }

        if (perm.granted) {
            Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }).then(res => {

                resolve(res.coords)
            } ).catch( err =>
            {
                console.log("somthing bad happened, could not get location");
                
            eventEmitter.emit(eventStrings.locationNotGranted)
                
            })
        }
    }
    catch (err) {
        console.log(err);
        reject( "not granted" )
    }

})

export const getRegion = (coords: LatLng) => new Promise<Region>((resolve, reject) => {
    const { width, height } = Dimensions.get("window")
    const ASPECT_RATIO = width / height

    const latDelta = .05
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
    if (!ll) return undefined
    const gong = String(ll).split(",")
    const latitude = Number.parseFloat(gong[0])
    const longitude = Number.parseFloat(gong[1])
    const coord: LatLng = {
        latitude: latitude,
        longitude: longitude,
    }

    return coord
}


    export function getDistanceFromLatLonInKm(lat1:number,lon1:number,lat2:number,lon2:number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

export function deg2rad(deg:any) {
  return deg * (Math.PI/180)
}