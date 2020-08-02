import React, { useEffect, useState, useRef } from 'react'
import { Text, View } from 'react-native-ui-lib'
import { StyleSheet, Dimensions } from 'react-native'
import { getLocation, getRegion } from '../universal/GetLocation'
import MapView, { Region } from 'react-native-maps'

const { width, height } = Dimensions.get("screen")
const UseMapView = () => {


    const [region, setRegion] = useState<Region>()

    const map = useRef<MapView | null>(null)


    useEffect(() => {
        setreg()
    }, [])

    const setreg = async () => {
        const coords = await getLocation();
        const reg = await getRegion(coords)
        setRegion(region)

        if (map) {
            console.log("map present");

            map.current?.animateToRegion(reg)
        }
    }
    return (
        <View flex>
            <MapView
                style={{ width, height }}
                ref={map}
                showsUserLocation

            >

            </MapView>
        </View>
    )
}

export default UseMapView

const styles = StyleSheet.create({})
