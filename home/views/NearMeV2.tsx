import React, { useEffect, useState, memo } from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import MapView, { Region, Circle } from 'react-native-maps'
import { getLocation, getRegion, getLatitudeLongitudeFromString } from '../../universial/GetLocation'
import { Dimensions } from 'react-native'
import { FeedItemModel } from '../../universial/Models'
import MarkerPin, { MarkerPinItem } from './MarkerPin'
import dataProvider from '../../dataLayer/DataStore'
import { LocationRegion } from 'expo-location'



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

    useEffect(() => {
        getLocation().then(async res => {
            const reg = await getRegion(res)
            setRegion(reg)
        })

        sortGeoRegions()

    }, [])

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
    }


    return (
        <View flex>
            <Map region={region} />
            <Text>hi</Text>
        </View>
    )
}

export default NearMeV2
