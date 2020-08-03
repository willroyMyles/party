import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import tm from '../universal/UiManager'
import FireStore from '../data_layer/FireStore'
import { ScrollView } from 'react-native-gesture-handler'
import { FeedItemModel } from 'universal/Models'

const Feed = () =>
{
    const theme = useTheme()
    const [data, setdata] = useState<FeedItemModel[]>()

    useEffect( () =>
    {
        loadData
    }, [FireStore.data] )

    const loadData = () =>
    {
        const d: FeedItemModel[] = [...FireStore.data.values()]
        setdata( d )
    }


    const handleLoad = () =>
    {
        FireStore.retrieve.events().then( loadData )
    }


    return (
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.background }} >
            <Text>feed</Text>
            {data?.map( ( value, index ) =>
            {
                return <Text>{value.title}</Text>
            } )}
            <TouchableOpacity onPress={handleLoad}>
                <Text>load</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Feed
