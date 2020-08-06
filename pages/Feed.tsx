import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import tm from '../universal/UiManager'
import FireStore from '../data_layer/FireStore'
import { ScrollView } from 'react-native-gesture-handler'
import { FeedItemModel } from 'universal/Models'
import { SectionList, FlatList, Dimensions } from 'react-native'
import FeedItemVersionOne from '../components/FeedItemVersionOne'
import FBS from '../data_layer/FireBaseClient'

const { width, height } = Dimensions.get("screen")
const Feed = () => {
    const theme = useTheme()
    const [data, setdata] = useState<string[]>()

    useEffect(() => {
        loadData
    }, [FireStore.data])

    const loadData = () => {
        // FireStore.sortFeedItemDocs()
        const keyss = [...FireStore.categorizedData.keys()]
        setdata(keyss)
    }

    const resetBackend = () =>
    {
        FBS.resetLast()
        handleLoad()
        loadData()
    }


    const handleLoad = () => {
        FireStore.retrieve.events().then()
    }


    return (
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.background }} >
            <Text>feed</Text>
            {data?.map((value, idx) => {
                console.log(typeof value);

                const name = value.replace("_", " ").toLowerCase()
                return <View padding-10 marginV-17 key={idx}>
                    <View row spread >
                        <Text indicator>{name}</Text>
                        <TouchableOpacity>
                            <Text color={Colors.primary}>view all</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={FireStore.categorizedData.get( value )}
                        keyExtractor={(item, index) => item.reference + "item" + index}
                        renderItem={({ item, index }) => {
                            return <FeedItemVersionOne reference={item.reference}  />
                        }}
                    />
                </View>
            })}
            <TouchableOpacity onPress={handleLoad}>
                <Text>load from backend</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loadData}>
                <Text>load from store</Text>
            </TouchableOpacity>
                        <TouchableOpacity onPress={resetBackend}>
                <Text>reset backend</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Feed
