import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { GS } from '../universal/GS'
import { FeedItemModel, GeoCodeModel } from '../universal/Models'
import * as Location from "expo-location"

 

const LocationBlock = ( { styled, city, country, isoCountryCode, name, postalCode, region, street }: 

    { styled:boolean, city:string, country:string, isoCountryCode:string, name:string, postalCode:string, region:string, street:string }) =>
{
    const theme= useTheme()
    console.log(`location block ${city}`)
    
    if ( styled ) return (
        <View>
            <View style={[ { backgroundColor: Colors.background, width: "100%", paddingVertical: 0, borderRadius: 15 }]}>
                <Text lvl2  style={s.text} >{name} {street}</Text>
                <Text lvl2 style={s.text} >{city}, {region}</Text>
                <Text lvl2 style={s.text} >{country}</Text>
            </View>
        </View>
    )

    return (
        <View marginB-10>
            <Text lvl2 marginB-15>Location</Text>
            <View style={[GS.input, { backgroundColor: Colors.background, width: "100%", paddingVertical: 13, borderRadius: 15 }]}>
                <Text lvl2 style={s.text} >{name} {street} </Text>
                <Text lvl2 style={s.text} >{city}</Text>
                <Text lvl2 style={s.text} >{region}</Text>
                <Text lvl2 style={s.text} >{country}</Text>
            </View>
</View>
    )
}

const s = StyleSheet.create( {
    text: {
        fontSize: 14,
        paddingVertical: 5,
        marginBottom: 3,        
    }
})

export default LocationBlock
