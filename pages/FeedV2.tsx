import { CurrentRenderContext } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { View, Text, Animated, NativeScrollEvent, NativeSyntheticEvent, Dimensions, LayoutAnimation } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components'
import Feed_Item from '../components/Feed_Item'
import FireStore from '../data_layer/FireStore'
import { FeedItemModel } from '../universal/Models'
import PartyTypesRow from './PartyTypesRow'

const transitions = (
    <Transition.Sequence>
        <Transition.Out type="scale" />
        <Transition.Change durationMs={300} interpolation="linear" />
        <Transition.In type="scale" />
    </Transition.Sequence>
)

const FeedV2 = () =>
{
    const off = 260
    const theme = useTheme()
    const holder = useRef<TransitioningView | any>()
    const [visible, setVisible] = useState( true )
    const [data, setData] = useState<FeedItemModel[]>( [] )
    const [offset, setOffset] = useState<number>( 0 )

    const [headerOffset, setheaderOffset] = useState( 0 )
    const [viewOffset, setviewOffset] = useState( 250 )

    useEffect( () =>
    {
        const values = [...FireStore.data.values()]
        setData( values )
    }, [FireStore.data] )

    const onScroll = ( e: NativeSyntheticEvent<NativeScrollEvent> ) =>
    {
        var currentOffset = e.nativeEvent.contentOffset.y
        var direction = currentOffset > offset ? hide() : show();
        LayoutAnimation.configureNext( {
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: 300
        } );
        setOffset( currentOffset )
    }

    const hide = () =>
    {
        setheaderOffset( -off )
        setviewOffset( 0 )
    }

    const show = () =>
    {
        setheaderOffset( 0 )
        setviewOffset( off )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Transitioning.View ref={holder} transition={transitions} style={{ height: "100%" }}>
                <View bg-background style={{ height: "100%" }}>
                    <View style={{
                        position: "absolute",
                        top: headerOffset,
                        left: 0,
                        zIndex: 2,
                        width: "100%",
                        // height: 200
                    }}>
                        <PartyTypesRow />
                    </View>
                    <FlatList
                        style={{
                            position: "absolute",
                            top: viewOffset,
                            width: "100%",
                            height: Dimensions.get( "screen" ).height,
                            paddingBottom: 20,

                        }}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={data}
                        onScroll={onScroll}
                        renderItem={( { item, index } ) =>
                        {
                            return <Feed_Item reference={item.reference || ""} />
                        }}
                    />
                </View>
            </Transitioning.View>
        </SafeAreaView>
    )
}

export default FeedV2
