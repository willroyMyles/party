import React from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import { PartyType } from '../universal/Models'
import { GetPartytypeString } from '../universal/GS'

const PartyTypeBadge = ({type}: {type: PartyType}) => {
    return (
        <View center style={{ position: "absolute", right: -10, bottom: 5, backgroundColor: Colors.background, borderWidth: 0, borderColor: Colors.grey40, borderTopLeftRadius:8, padding: 3, paddingHorizontal: 13}}>

            <Text regular>{GetPartytypeString(type)}</Text>
        </View>

    )
}

export default PartyTypeBadge
