import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib'
import { GS } from '../universal/GS'

const LocationBlock = ( { info, styled = false }: { info: any, styled?: boolean } ) =>
{
    if ( !info ) return <View />
    
    const {city, country, isoCountryCode, name, postalCOde, region, street} = info

    return (
        <View marginB-10>
            <Text lvl2 marginB-15>Location</Text>
            <View style={[GS.input, { backgroundColor: Colors.background, width: "100%", paddingVertical: 13, borderRadius: 15 }]}>
                <Text style={s.text} >{name} {street}</Text>
                <Text style={s.text} >{city}</Text>
                <Text style={s.text} >{region}</Text>
                <Text style={s.text} >{country}</Text>
            </View>
</View>
    )
}

const s = StyleSheet.create( {
    text: {
        fontSize: 14,
        color: Colors.text1,
        paddingVertical: 5,
        marginBottom: 3,
        
    }
})

export default LocationBlock
