import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { StyleSheet, Dimensions } from 'react-native'
import { getLocation, getRegion } from '../universal/GetLocation'
import MapView, { Region, Coordinate, LatLng } from 'react-native-maps'
import MarkerPin from '../components/MarkerPin'
import { GS } from '../universal/GS'
import { useTheme } from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useRoute, useNavigation } from '@react-navigation/native'
import BackDrop from '../components/BackDrop'

const { width, height } = Dimensions.get("screen")
const UseMapView = () => {

    const theme = useTheme()
    const route = useRoute()
    const navigation = useNavigation()

    const [region, setRegion] = useState<Region>()
    const [marker, setMarker] = useState<LatLng | null>()
    const map = useRef<MapView | null>(null)


    useEffect(() => {
        setreg()
    }, [])

    const setreg = async () => {
        const coords = await getLocation();
        const reg = getRegion(coords)
        setRegion(region)

        if (map) {
            map.current?.animateToRegion(reg)
        }
    }

    const setMarkerCoordinates = (coord: LatLng) => setMarker(coord)
    const onConfirm = () => {
        if (route.params?.set) route.params?.set(marker)
        navigation.goBack()
    }





    return (
        <View flex>
            <MapView showsMyLocationButton
                toolbarEnabled
                style={{ width, height }}
                ref={map}
                showsUserLocation
                onPress={(e) => setMarkerCoordinates(e.nativeEvent.coordinate)}
            >
                {marker && <MarkerPin marker={marker} />}
            </MapView>
            <View centerH paddingH-20 style={{ position: "absolute", width: "100%", height: "100%" }}>
                <View absT row spread style={{ width: "100%", top: 20 }}>
                    <TouchableOpacity center style={[styles.back, { backgroundColor: Colors.background }]}>
                        <Icon name="long-arrow-alt-left" size={23} />
                    </TouchableOpacity>


                </View>
                <View absB style={{ width: "100%", bottom: 15 }}>

                    {marker &&
                        <TouchableOpacity onPress={onConfirm} center style={[GS.button, { backgroundColor: Colors.background, overflow:"hidden", elevation:7,  }]}>
                        <BackDrop />
                            <Text btn uppercase>confirm</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}

export default UseMapView

const styles = StyleSheet.create({
    back: {
        borderRadius: 3,
        elevation: 7,
        padding: 10
    }
})
