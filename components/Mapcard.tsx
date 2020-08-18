import React from 'react'
import { View, Text, Colors, TouchableOpacity } from 'react-native-ui-lib'
import { Region } from 'react-native-maps'
import moment from 'moment'
import
{
    getLatitudeLongitudeFromString,
    getDistanceFromLatLonInKm,
} from '../universal/GetLocation'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import FireStore from '../data_layer/FireStore'

const Mapcard = ( {
    reference,
    currentPosition,
}: {
    reference: string,
    currentPosition: Region
} ) =>
{
    const item = FireStore.data.get( reference ) || undefined

    const theme = useTheme()
    const navigation = useNavigation()
    const handleListing = () => navigation.navigate( 'view event', { reference: item?.reference } )

    if ( item )
    {
        const l1 = getLatitudeLongitudeFromString( item.location )
        const { latitude, longitude } = currentPosition
        const l2 = { latitude, longitude }

        const distance = getDistanceFromLatLonInKm(
            l1?.latitude,
            l1?.longitude,
            l2.latitude,
            l2.longitude,
        ).toFixed( 2 )

        return (
            <View
                bg-background
                padding-10
                br20
                style={{
                    elevation: 5,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: Colors.primary,
                }}>
                <Text lvl1>{item.title}</Text>
                <View row spread padding-5>
                    <View>
                        <Text lvl2 marginT-5>
                            {moment( new Date( item.date || "" ) ).calendar( 'dddd' )}
                        </Text>
                        <Text lvl2 marginT-5>
                            {moment( new Date( item.start || "" ) ).format( 'hh:MM a' )}
                        </Text>
                        <Text lvl2 marginT-5>
                            {item.duration} hrs
            </Text>
                    </View>
                    <View>
                        <Text lvl2>{distance} km</Text>
                        <Text lvl3 center>
                            away
                        </Text>
                    </View>
                </View>
                <View row right>
                    <TouchableOpacity onPress={handleListing} padding-5 marginH-15>
                        <Text lvl3 primary>
                            listing
            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity padding-5 marginL-10>
                        <Text lvl3 primary>
                            directions
            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else return <View />
}

export default Mapcard
