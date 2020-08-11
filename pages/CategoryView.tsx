import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native-ui-lib'
import { useRoute } from '@react-navigation/native'
import { PartyType, FeedItemModel } from '../universal/Models'
import { useTheme } from 'styled-components'
import FireStore from '../data_layer/FireStore'
import { FlatList } from 'react-native-gesture-handler'
import FeedItemMemoryVersionOne from '../components/FeedItemMemoryVersionOne copy'
import RowButton from '../components/RowButton'
import FeedFabButtons from '../components/FeedFabButtons'
import FeedItemVersionOne from '../components/FeedItemVersionOne'

const CategoryView = () =>
{
    const theme = useTheme()
    const route = useRoute<any>()
    const { type } = route.params
    const partyType = PartyType[type]
    
    const [data, setData] = useState<FeedItemModel[]>()
    const [offset, setOffset] = useState<any>(undefined)
    
    useEffect(() => {
        const d = [...FireStore.data.values()].filter( ( value, index ) =>
        {
            return value.partyType == Number.parseInt(partyType)
        })
        setData( d )
        
    }, [partyType])
    
    if ( type )
    {
    return (
        <View bg-background flex center>
            <FlatList
            
                data={data}
                keyExtractor={(item, index) => item.reference + "item" + index}

                 onMomentumScrollEnd={(e) => setOffset(e.nativeEvent.contentOffset)}
                renderItem={( {item, index} ) =>
                {
                    return <FeedItemVersionOne reference={item.reference || ""}  />
                }}
            />
            <FeedFabButtons offset={offset} />
        </View>
    )
    }


        return (
        <View>
            <Text></Text>
        </View>
    )
}

export default CategoryView
