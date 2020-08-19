import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Colors, TextField, PanListenerView, PanningProvider } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import tm from '../universal/UiManager'
import FireStore from '../data_layer/FireStore'
import { ScrollView } from 'react-native-gesture-handler'
import { SectionList, FlatList, Dimensions, StyleSheet } from 'react-native'
import FeedItemVersionOne from '../components/FeedItemVersionOne'
import FBS from '../data_layer/FireBaseClient'
import { eventEmitter, eventStrings } from '../universal/EventEmitter'
import Animated from 'react-native-reanimated'
import SearchComponent from '../components/SearchComponent'
import FeedFabButtons from '../components/FeedFabButtons'
import { useNavigation } from '@react-navigation/native'
import Feed_Item from '../components/Feed_Item'
import SearchBar from '../components/SearchBar'

const { width, height } = Dimensions.get( "screen" )
const Feed = () =>
{
    const theme = useTheme()
    const navigation = useNavigation()
    const [data, setdata] = useState<string[]>()
    const [offset, setoffset] = useState<{ x: number, y: number }>( { x: 0, y: 0 } )

    useEffect( () =>
    {
        eventEmitter.addListener( eventStrings.dataFromProviderFinishedLoad, () => loadData() )

        return () =>
        {
            eventEmitter.removeListener( eventStrings.dataFromProviderFinishedLoad, () => loadData() )
        }
    }, [] )

    const loadData = () =>
    {
        // FireStore.sortFeedItemDocs()
        const keyss = [...FireStore.categorizedData.keys()]
        setdata( keyss )
        // eventEmitter.emit( eventStrings.dataFromProviderFinishedLoad )
    }

    const resetBackend = () =>
    {
        FBS.resetLast()
        handleLoad()
        loadData()
    }


    const handleLoad = () =>
    {
        FireStore.retrieve.events().then()
    }

    const handleViewAll = ( route: string ) => navigation.navigate( "category", { type: route } )


    return (



        <View bg-background paddingB-50 style={{ minHeight: "100%", width: "100%" }}>
            <SearchBar />
            <ScrollView
                onMomentumScrollEnd={( e ) => setoffset( e.nativeEvent.contentOffset )
                }
            // contentContainerStyle={{ backgroundColor: Colors.background, minHeight: "100%" }}
            >
                {data?.map( ( value, idx ) =>
                {
                    const name = value.replace( "_", " " ).toLowerCase()
                    return <View key={idx}>
                        <View row spread marginH-8>
                            <Text indicator>{name}</Text>
                            <TouchableOpacity marginR-5 onPress={() => handleViewAll( value )}>
                                <Text color={Colors.primary}>view all</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            // style={{ width: "100%", borderWidth: 5, borderColor: Colors.blue20 }}
                            // contentContainerStyle={{borderColor:Colors.red20, borderWidth:13, padding:0}}
                            horizontal
                            data={FireStore.categorizedData.get( value )}
                            keyExtractor={( item, index ) => item.reference + "item" + index}
                            renderItem={( { item, index } ) =>
                            {
                                return <Feed_Item reference={item.reference || ""} />

                            }}
                        />
                    </View>
                } )}
                <TouchableOpacity style={[style.btn]} onPress={handleLoad}>
                    <Text>load from backend</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btn]} onPress={loadData}>
                    <Text>load from store</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btn]} onPress={resetBackend}>
                    <Text>reset backend</Text>
                </TouchableOpacity>
            </ScrollView>
            {/* <FeedFabButtons offset={offset} /> */}
        </View>
    )
}

export default Feed

const style = StyleSheet.create( {
    btn: {
        padding: 10,
        borderWidth: 1,
        margin: 3
    }
} )