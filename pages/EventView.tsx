import React, { useEffect, useState } from 'react'
import { View, Text, Image, Avatar, Colors } from 'react-native-ui-lib'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import FireStore from '../data_layer/FireStore'
import { ScrollView } from 'react-native'
import moment from 'moment'
import { PartyType } from '../universal/Models'
import tm from '../universal/UiManager'
import { GS, GetIcon, GetPartytypeString } from '../universal/GS'
import Organizer from '../components/Organizer'
import UseSmallMapView from './UseSmallMapView'
import PartyTypeBadge from '../components/PartyTypeBadge'
import RSVPButton from '../components/RSVPButton'
import EventHeaderImage from '../components/EventHeaderImage'

const EventView = () =>
{
    const [image, setImage] = useState<string>()



    const navigation = useNavigation()
    const theme = useTheme()
    const route = useRoute()
    const reference = route.params?.reference
    const item = FireStore.data.get( reference )

    useEffect( () =>
    {
        async function getImage()
        {
            const d = await FireStore.retrieve.imageFromReference( item.reference )
            setImage( d )
        }

        if ( item ) getImage()
        // tm.setThemeType(true)
    }, [] )
    console.log( item?.imageUrl );



    if ( item ) return (
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.background, minHeight: "100%", paddingBottom: 40 }}>
            <EventHeaderImage imageUrl={image} />
            <View centerH>
                <PartyTypeBadge type={item?.partyType} />
            </View>
            <View bg-background padding-20 style={{ marginTop: -10 }}>
                <View marginV-5 centerV row spread>
                    <Text lvl1>{item.title}</Text>
                    <RSVPButton reference={item.reference} />
                </View>
                <View marginT-8 row>
                    <GetIcon name="calendar" />
                    <View marginL-10>
                        <Text lvl3 text3>Date</Text>
                        <Text regular>{moment( item.date ).format( "ddd - MMM DD, YYYY" )}</Text>
                    </View>
                </View>
                <View marginT-8 row>
                    <GetIcon name="clock" />
                    <View marginL-10>
                        <Text lvl3 text3>Time</Text>
                        <Text lvl2>{moment( item.start ).format( "hh:mm A" )} for {item.duration} hrs</Text>
                    </View>
                </View>
                <View marginT-8 row>
                    <GetIcon name="info" />
                    <View marginL-10>
                        <Text marginT-7 marginB-3 lvl3 text3>About</Text>
                        <Text lvl2>{item.description}</Text>
                    </View>
                </View>
            </View>
            <View>
                <UseSmallMapView loc={item.location} />
            </View>

            <Organizer org name={item.person || ""} reference={item.reference || ""} />
        </ScrollView >
    )

    else return <View />
}

export default EventView
