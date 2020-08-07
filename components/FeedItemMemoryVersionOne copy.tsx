import React from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { FeedItemModel, PartyType } from '../universal/Models'
import { Dimensions } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import moment from 'moment'
import DateBox from './DateBox'
import { useNavigation } from '@react-navigation/native'
import FireStore from '../data_layer/FireStore'
import PartyTypeBadge from './PartyTypeBadge'
const { width, height } = Dimensions.get("screen")
const FeedItemMemoryVersionOne = ({ reference }: { reference: string }) => {
    const theme = useTheme()
    const navigation = useNavigation()
    const item = FireStore.data.get( reference )
    
    if(item)return (
        <View margin-10 marginV-20 style={{ width: width * .8, height: 200, overflow: "hidden", borderRadius: 7, elevation: 6, borderWidth: .3, borderColor:Colors.secondary }}>
            <TouchableOpacity onPress={() => navigation.navigate("view past event", { reference: item.reference })} activeOpacity={.8} style={{ width: "100%", height: "100%" }}>
                <Image source={{ uri: item.imageUrl }} cover />
                {/* <PartyTypeBadge type={item.partyType} /> */}
                <View row spread absB padding-10 bg-background style={{ width: "100%", bottom: -1 }}>
                    <View>
                    <Text lvl1>{item.title}</Text>
                    <Text lvl2 primary>{moment( item.date ).format( "MMM DD, YYYY" )}</Text>

                    </View>
                    <Text lvl3> amount visited</Text>
                    <PartyTypeBadge type={item.partyType} />
                </View>
            </TouchableOpacity>

        </View>
    )
    else
    {
        return <View />
    }
}

export default FeedItemMemoryVersionOne
