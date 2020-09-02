import React from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import moment from 'moment'

const DateBox = ({ date }: { date: string }) => {
    const month = moment( new Date( date || "" )).format("MMM")
    const day = moment( new Date( date || "" )).format("DD")
    return (
        <View bg-background center style={{
            position: "absolute",
            right: 10,
            top: -30,
            padding: 4,
            paddingHorizontal: 10,
            borderRadius: 7,
            borderWidth: 1,
            borderBottomWidth: 4,
            borderTopWidth: 0,
            borderColor: Colors.secondary
        }}>
            <Text lvl2 primary >{month}</Text>
            <Text lvl1 style={{ fontSize: 18, marginTop: -2 }}>{day}</Text>

        </View>
    )
}

export default DateBox
