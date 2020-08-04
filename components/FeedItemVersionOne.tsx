import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { FeedItemModel } from '../universal/Models'
import { Dimensions } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import moment from 'moment'
import DateBox from './DateBox'
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get("screen")
const FeedItemVersionOne = ({ item }: { item: FeedItemModel }) => {
    const theme = useTheme()
    const navigation = useNavigation()
    return (
        <View margin-10 marginV-20 style={{ width: width * .8, height: 200, overflow: "hidden", borderRadius: 7, elevation: 6, borderWidth: .1 }}>
            <TouchableOpacity onPress={() => navigation.navigate("view event", { reference: item.reference })} activeOpacity={.8} style={{ width: "100%", height: "100%" }}>
                <Image source={require("../assets/images/banner2.png")} cover />
                <View absB padding-10 bg-background style={{ width: "100%", bottom: -1 }}>
                    <Text lvl1>{item.title}</Text>
                    <Text lvl2>{item.description}</Text>
                    <View row>
                        <Text lvl2>start - </Text>
                        <Text lvl2>{moment(item.start).format("hh:mm A")} for {item.duration} hrs</Text>
                    </View>
                    <DateBox date={item.date || ""} />
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default FeedItemVersionOne
