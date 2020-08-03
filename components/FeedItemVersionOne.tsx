import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { FeedItemModel } from '../universal/Models'
import { Dimensions } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import moment from 'moment'
import DateBox from './DateBox'
const { width, height } = Dimensions.get( "screen" )
const FeedItemVersionOne = ( { item }: { item: FeedItemModel } ) =>
{
    const theme = useTheme()
    return (
        <View margin-10 marginV-20 style={{ width: width * .6, height: 150, overflow: "hidden", borderRadius: 7, elevation: 3, borderWidth: .1 }}>
            <Image source={require( "../assets/images/banner2.png" )} cover />
            <View absB padding-10 bg-background style={{ width: "100%" }}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
                <View row>
                    <Text>start - </Text>
                    <Text>{moment( item.start ).format( "hh:mm A" )}</Text>
                </View>
                <DateBox date={item.date || ""} />
            </View>
        </View>
    )
}

export default FeedItemVersionOne
