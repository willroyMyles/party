import React, { useState } from 'react'
import { useEffect } from 'react'
import { Text, View } from 'react-native-ui-lib'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, LoaderScreen } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import Feed_Item from '../components/Feed_Item'
import FireStore from '../data_layer/FireStore'
import { eventEmitter, eventStrings } from '../universal/EventEmitter'
import { AFL } from '../universal/GS'
import PartyTypesRow from './PartyTypesRow'
import ListheaderComp from '../components/ListheaderComp'
import ListFooterComp from '../components/ListFooterComp'
import { observer } from 'mobx-react'

// @refresh reset


const scrollY = new Animated.Value( 0 )
const FeedV2 = () =>
{
    const theme = useTheme()
    const off = 260
    // const [, setLastDocument] = useState<string>()
    const [moreData, setMoreData] = useState(true)
    const [loading, setLoading] = useState( false )
    
    const diffY = Animated.diffClamp( scrollY, 0, off )

    const headerY = Animated.interpolate( diffY, {
        inputRange: [0, off],
        outputRange: [0, -off]
    } )


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            {FireStore.data.size == 0 && <View center style={{height:"100%", width:"100%"}}>
                <Text>Fetching Data</Text>
                <LoaderScreen />
            </View>}
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
                    // ListHeaderComponent={<ListheaderComp header="discover" />}
                    style={{
                        // position: "absolute",
                        flex:1,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        paddingTop: off,
                        paddingBottom:off
                    }}
                    contentContainerStyle={{ paddingBottom: off, backgroundColor: Colors.background }}
                    data={[...FireStore.data.values()]}
                    // onEndReachedThreshold={.1}
                    // onEndReached={loadMore}

                    onScroll={
                        Animated.event<any>( [{
                            nativeEvent: { contentOffset: { y: scrollY } }
                        }])
                    }


                    keyExtractor={( item: any, index: number ) => "item" + index}

                    renderItem={( { item } ) =>
                    {
                        return <Feed_Item reference={item.reference || ""} />
                    }}
                    ListFooterComponent={<ListFooterComp loadMore={moreData} loading={loading} />}

                />
            </View>
        </SafeAreaView>
    )
}

export default observer(FeedV2)
