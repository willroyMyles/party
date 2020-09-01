import React, { useState, useEffect, useRef } from 'react'
import { View, Text, LoaderScreen, Colors } from 'react-native-ui-lib'
import { useRoute } from '@react-navigation/native'
import { PartyType, FeedItemModel } from '../universal/Models'
import { useTheme } from 'styled-components'
import FireStore from '../data_layer/FireStore'
import { FlatList } from 'react-native-gesture-handler'
import FeedItemMemoryVersionOne from '../components/FeedItemMemoryVersionOne copy'
import RowButton from '../components/RowButton'
import FeedFabButtons from '../components/FeedFabButtons'
import FeedItemVersionOne from '../components/FeedItemVersionOne'
import { Dimensions } from 'react-native'
import TToast from '../components/TToast'
import BackDrop from '../components/BackDrop'
import Feed_Item from '../components/Feed_Item'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetPartytypeString } from '../universal/GS'
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'

const { width, height } = Dimensions.get( "screen" )
const CategoryView = () =>
{
    const theme = useTheme()
    const route = useRoute<any>()
    const { type } = route.params
    const partyType = Number.parseInt( PartyType[type] )

    const [data, setData] = useState<FeedItemModel[]>([])
    // const [offset, setOffset] = useState<any>( undefined )
    const [shouldLoadMore, setShouldLoadMore] = useState( true )
    const [lastDocument, setLastDocument] = useState<string>()
    const [loading, setLoading] = useState( true )


    useEffect( () =>
    {
        // setLast()
        displayCurrentParties()
        loadData()
    }, [] )

    const displayCurrentParties = () =>
    {
        const d: FeedItemModel[] = [...FireStore.data.values()].filter( ( value, index ) =>
        {
            return value.partyType == partyType
        } )

        setData( d )
    }


    const setLast = ( shouldSetLast = true ) =>
    {
        return new Promise<FeedItemModel[]>( ( resolve ) =>
        {
            const d: FeedItemModel[] = [...FireStore.data.values()].filter( ( value, index ) =>
            {
                return value.partyType == partyType
            } )
            console.log(d.length);
            
            if ( d && shouldSetLast && d.length > 0 )
            {
                const lastIndex = d.length - 1
                const ref = d[lastIndex].reference
                console.debug( ref )
                console.log(`refernce ${ref}`);
                
                setLastDocument( ref )

            }
            resolve( d )
           
            setData( d )
            setLoading(false)
            
        } )
    }

    const loadData = () =>
    {
        // console.log( lastDocument, "ref" );

        if ( !lastDocument ) return // last document doest exist

        if ( !shouldLoadMore )
        {
            // TToast.error( "Oops!", "No more events in list" )
            return
        }

        setLoading( true )
        FireStore.retrieve.specificParties( partyType, lastDocument || "" ).then( res =>
        {
            setLast()
        } ).catch( err =>
        {
            setLoading( false )
            setShouldLoadMore( false )
        } )
    }


    if ( type )
    {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                    <View bg-background flex center>
                        <Text marginV-12 indicator>{GetPartytypeString( partyType )}</Text>
                        <FlatList
                            data={[...data]}
                            keyExtractor={( item, index ) => item.reference + "item" + index}
                            // onMomentumScrollEnd={( e ) => setOffset( e.nativeEvent.contentOffset )}
                            onEndReachedThreshold={.1}
                            onEndReached={loadData}
                            renderItem={( { item, index } ) =>
                            {
                                return <View>
                                    
                                   <Feed_Item reference={item.reference || ""} />
                      
                                </View>
                            }}
                        />
                        {/* <FeedFabButtons offset={offset} /> */}
                        {loading && <View center margin-10 style={{ minHeight: 40 }}>
                            <LoaderScreen color={Colors.primary} />
                        </View>}
                        {!shouldLoadMore && !loading && <View center margin-10 style={{ minHeight: 40 }}>
                                <Text muted>no more events... =[</Text>
                            </View>
                        }
                    </View>
            </SafeAreaView>
        )
    }


    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default CategoryView
