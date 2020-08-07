import React, { useEffect } from 'react'
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

const EventView = () => {

    useEffect(() => {
        // tm.setThemeType(true)
    }, [])

    const navigation = useNavigation()
    const theme = useTheme()
    const route = useRoute()
    const reference = route.params?.reference
    const item = FireStore.data.get( reference )
    
    console.log(item?.imageUrl);
    


    if (item) return (
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.background, minHeight: "100%", paddingBottom: 40 }}>
            <View style={{ maxHeight: 300, overflow: "hidden" }}>
                <Image source={{ uri: item.imageUrl }} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
                <PartyTypeBadge type={item?.partyType}/>
            </View>
            <View bg-background padding-20 style={{ marginTop: -10 }}>
                <View marginB-5 row spread>
                    <Text lvl1>{item.title}</Text>
                    <GetIcon name="heart" />
                </View>
                <View marginT-8 row>
                    <GetIcon name="calendar" />
                    <View marginL-10>
                        <Text regular>{moment(item.date).format("ddd - MMM DD, YYYY")}</Text>
                        <Text lvl2>{moment(item.start).format("hh:mm A")} for {item.duration} hrs</Text>
                    </View>
                </View>
                <View marginT-20 row>
                    <GetIcon name="info" />
                    <View marginL-10>
                        <Text marginT-7 marginB-3 regular>About</Text>
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
