import React, { useEffect, useState, memo } from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import MapView, { Region, Circle } from 'react-native-maps'
import { getLocation, getRegion, getLatitudeLongitudeFromString } from '../../universial/GetLocation'
import { Dimensions } from 'react-native'
import { FeedItemModel } from '../../universial/Models'
import MarkerPin, { MarkerPinItem } from './MarkerPin'
import dataProvider from '../../dataLayer/DataStore'
import { LocationRegion } from 'expo-location'
import * as Location from "expo-location"
import * as TaskManager from "expo-task-manager"
import { eventEmitter, eventStrings } from '../../universial/EventEmitter'



const radius = 1600

const Map = memo(({ region }: { region?: Region }) => {
    console.log("map render");

    if (region) return <MapView
        // liteMode

        showsScale
        showsMyLocationButton
        showsUserLocation
        // showsMyLocationButton
        region={region}
        style={{ width: Dimensions.get("screen").width, height: "100%" }}>
        <Circle radius={radius} center={region} fillColor={Colors.primary + "22"} strokeWidth={1} strokeColor={Colors.grey50} />



        {[...dataProvider.data.values()].map((value, index)=>{
           return <MarkerPinItem key={index} value={value}  />
        })}

    </MapView>
    else return <View center>
        <Text>getting location</Text>
    </View>
})

const NearMeV2 = () => {

    const [region, setRegion] = useState<Region>()
    const [geoRegions, setGeoRegions] = useState<LocationRegion[]>([])
    const [eventCards, setEventCards] = useState<FeedItemModel[]>([])
    const taskName = "geoLocation"

    useEffect(() => {
    

        sortGeoRegions()

        getLocation().then(async res => {
            const reg = await getRegion(res)
            setRegion(reg)
        })

        
        eventEmitter.addListener(eventStrings.locationEntered, test)
        console.log(eventEmitter.listeners(eventStrings.locationEntered), "listeners");

        return() =>{
            eventEmitter.removeListener(eventStrings.locationEntered, test)
            Location.hasStartedGeofencingAsync(taskName).then(res=>{
                if(res){
                   // Location.stopGeofencingAsync(taskName)
                }
            })

        }
    }, [])

    const test = (refr:string) =>{

        console.log(refr);
        
    }



    const sortGeoRegions = () =>{
        const d : any = []
        dataProvider.data.forEach((value, key)=>{
            const coord = getLatitudeLongitudeFromString(value.location)
            if(coord){
                const c : LocationRegion = {
                    latitude : coord.latitude,
                    longitude : coord.longitude,
                    radius,
                    identifier : value.reference
                }

                d.push(c)
            }
        })

        setGeoRegions(d)

        console.log("regions set",geoRegions.length);
        

        if( TaskManager.isTaskDefined(taskName)){
            console.log("task is defined");
            
            Location.hasStartedGeofencingAsync("geoLocation").then(async res=>{
                console.log("started?", res);
                if(!res && geoRegions.length > 0){
                    await Location.startGeofencingAsync("geoLocation", geoRegions)
                    console.log("geo started");
                    
                }
                
            })
    
           }
    }


    return (
        <View flex>
            <Map region={region} />
            <View bg-background padding-10 center style={{position:"absolute", minHeight:10, minWidth:"100%", bottom:3}}>
                {eventCards.map((value, index)=>{
                    return <View key={index}><Text>{value.title}</Text></View>
                })}
            </View>
        </View>
    )
}

export default NearMeV2
