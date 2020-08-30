import { CurrentRenderContext } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { View, Text, NativeScrollEvent, NativeSyntheticEvent, Dimensions, LayoutAnimation, FlatListProps } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Animated, { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import Feed_Item from '../components/Feed_Item'
import FireStore from '../data_layer/FireStore'
import { eventEmitter, eventStrings } from '../universal/EventEmitter'
import { FeedItemModel } from '../universal/Models'
import PartyTypesRow from './PartyTypesRow'

const { width, height } = Dimensions.get( "screen" )

const transitions = (
    <Transition.Sequence>
        <Transition.Out type="scale" />
        <Transition.Change durationMs={300} interpolation="linear" />
        <Transition.In type="scale" />
    </Transition.Sequence>
)

const FeedV2 = () =>
{
    const off = 320
    const theme = useTheme()
    const [data, setData] = useState<FeedItemModel[]>( [] )
    const [lastDocument, setLastDocument] = useState<string>()
    const [moreData, setMoreData] = useState(true)


    const scrollY = new Animated.Value( 0 )
    const diffY = Animated.diffClamp( scrollY, 0, off )

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
        const values = [...FireStore.data.values()]
        const lastIndex = values.length - 1
        const ref = values[lastIndex].reference
        setLastDocument( ref )
        setData( values )
    }

    const loadMore = () =>
    {
        if(!moreData) return
        FireStore.retrieve.events().then( res =>
        {
            loadData()
        } ).catch( err =>
        {
            setMoreData(false)
        })
    }


    const headerY = Animated.interpolate( diffY, {
        inputRange: [0, off],
        outputRange: [0, -off]
    } )

    const AFL = Animated.createAnimatedComponent( FlatList )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View bg-background style={{ height: "100%" }}>
                <Animated.View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    width: "100%",
                    transform: [{ translateY: headerY }]
                    // height: 200
                }}>
                    <PartyTypesRow heightt={off} />
                </Animated.View>
                <AFL
                    scrollEventThrottle={16}
                    bounces={false}

                    style={{
                        // position: "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        paddingBottom: off,
                        paddingTop: off

                    }}
                    contentContainerStyle={{ paddingBottom: off, backgroundColor: Colors.background }}
                    data={data}
                    onEndReachedThreshold={height / 4}
                    onEndReached={loadMore}

                    onScroll={
                        Animated.event<any>( [{
                            nativeEvent: { contentOffset: { y: scrollY } }
                        }] )
                    }
                    keyExtractor={( item: any, index: number ) => "item" + index}

                    renderItem={( { item, index } ) =>
                    {
                        return <Feed_Item reference={item.reference || ""} />
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default FeedV2
