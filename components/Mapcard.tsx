import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import dataProvider from '../dataLayer/DataStore'
import { FeedItemModel } from '../universial/Models'

const Mapcard = ({item} : {item:FeedItemModel}) => {

   if(item) return (
        <View bg-primary padding-10 br20 style={{elevation:5}}>
            <Text white>{item.title}</Text>
            <Text white marginT-5>{item.start}</Text>
        </View>
    )
    else return <View/>
}

export default Mapcard
