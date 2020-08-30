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
import { SafeAreaView } from 'react-native-safe-area-context'
import FeedTop from './feed_page/FeedTop'
import FeedList from './feed_page/FeedList'

const { width, height } = Dimensions.get( "screen" )
const Feed = () =>
{
    const off = 260

    const [moreData, setMoreData] = useState( true )

    const scrollY = new Animated.Value( 0 )
    const diffY = Animated.diffClamp( scrollY, 0, off )

    console.log( "rendered triggered" );

    useEffect( () =>
    {
        eventEmitter.addListener( eventStrings.dataFromProviderFinishedLoad, loadData )

        return () =>
        {
            eventEmitter.removeListener( eventStrings.dataFromProviderFinishedLoad, loadData )

        }
    }, [] )

    const loadData = () =>
    {
        const values = [...FireStore.intermediateryData.values()]
        const lastIndex = values.length - 1
        const ref = values[lastIndex].reference
        // setLastDocument( ref )
        setData( d => [...d, ...values] )
    }

    const loadMore = () =>
    {
        if ( !moreData ) return
        FireStore.retrieve.events().catch( err =>
        {
            setMoreData( false )
        } )
    }


    const headerY = Animated.interpolate( diffY, {
        inputRange: [0, off],
        outputRange: [0, -off]
    } )

    const checkIfShouldLoadMore = () =>
    {
        console.log( "end triggered" );

        // const val = Math.abs( contentHeight - yOffset )

        // console.log( `called check offset: ${ yOffset }, hieght : ${ contentHeight }, val : ${val}` );
        // if (  val < threshold )
        // {
        //     // loadMore()
        // }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View bg-background style={{ height: "100%" }}>
              
                <SearchBar />
                <FeedTop off={off} scrollY={scrollY}/>
                <FeedList off={off} scrollY={scrollY} />
            </View>
        </SafeAreaView>
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