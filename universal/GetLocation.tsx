
import * as Location from "expo-location"
import { LatLng, Region } from "react-native-maps";
import { Alert, Dimensions } from "react-native";
import { eventEmitter, eventStrings } from "./EventEmitter";
import tm from "./UiManager";


export const RevokeLocationPermission = () => new Promise<boolean>( async resolve =>
{
    tm.setLocationGranted( false )
    
})
export const GetLocationPermission = () => new Promise<Boolean>( async (resolve) =>
{
    
    try
    {
        const permission = await Location.getPermissionsAsync()

        if ( permission.status == Location.PermissionStatus.GRANTED )
        {
            eventEmitter.emit( eventStrings.locationGranted )
            return resolve( true )
        }


        if ( !permission.granted && permission.canAskAgain) // request permission
        {
            const result = await Location.requestPermissionsAsync()
            if ( result.granted )
            {
                eventEmitter.emit( eventStrings.locationGranted )
                return resolve( true )
            }
            else
            {
                //show alert
                console.log("location denied");
                Alert.alert(
                    "Location",
                    "We need your location to show you parties near you. \n\nIf at anytime you wish to change your locations preferences, look under your profile settings" )
                eventEmitter.emit( eventStrings.locationNotGranted )
                return resolve(false)
            }
        }

        if ( !permission.granted && !permission.canAskAgain )
        {
            eventEmitter.emit( eventStrings.locationNotGranted )
            return resolve( false )
        }




    } catch ( err )
    {
        eventEmitter.emit( eventStrings.locationNotGranted )
        return resolve( false )
    }
})


export const getLocation = () => new Promise<any>(async (resolve, reject) => {
    try {
        const perm = await GetLocationPermission()     
       
        if (perm) {
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