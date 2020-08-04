import React from 'react'
import { View, Text, Image, Avatar, Colors } from 'react-native-ui-lib'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import FireStore from '../data_layer/FireStore'
import { ScrollView } from 'react-native'
import moment from 'moment'
import { PartyType } from '../universal/Models'

const EventView = () => {

    const navigation = useNavigation()
    const theme = useTheme()
    const route = useRoute()
    const reference = route.params?.reference
    const item = FireStore.data.get(reference)
    let pt: string = PartyType[item?.partyType]
    pt = pt.replace("_", " ").toLowerCase()
    if (item) return (
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.grey40 }}>
            <View style={{ maxHeight: 200, overflow: "hidden" }}>
                <Image source={require("../assets/images/splash.jpg")} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
                <Text center style={{ position: "absolute", right: 10, bottom: 20, backgroundColor: Colors.background, borderWidth: 3, borderColor: Colors.grey10, borderRadius: 20, padding: 7, paddingHorizontal: 13, elevation: 5 }}>{pt}</Text>
            </View>
            <View br0 bg-background padding-20 style={{ marginTop: -10 }}>
                <View marginV-10 row spread>
                    <Text>{item.title}</Text>
                    <Text>heart</Text>
                </View>
                <View marginV-3>
                    <Text>{moment(item.date).format("ddd - MMM DD, YYYY")}</Text>
                    <Text>{moment(item.start).format("hh:mm A")} for {item.duration} hrs</Text>
                </View>
                <View marginV-10>
                    <Text marginT-3>About</Text>
                    <Text>{item.description}</Text>
                </View>
            </View>
            <View marginV-15 center padding-10 bg-background style={{ elevation: 3 }}>
                <Avatar size={50} containerStyle={{ borderRadius: 100, elevation: 3, padding: 3, borderColor: Colors.primary, borderWidth: 1 }} />
                <Text>{item.person}</Text>
            </View>
            <View>
                <Text>{item.location}</Text>
            </View>
        </ScrollView >
    )

    else return <View />
}

export default EventView
