import React from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { Button } from 'react-native-ui-lib'
import {useTheme} from 'styled-components'
import { GetNotificationPermission } from '../universal/GetNotification'
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native-safe-area-context'
import RateParty from '../components/RateParty'
import { animated, useSpring } from 'react-spring/native'
import { Dimensions, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList } from 'react-native-gesture-handler'
import { FeedItemModel } from '../universal/Models'
import { useState } from 'react'
import FireStore from '../data_layer/FireStore'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import LeaderBoardTiles from '../components/LeaderBoardTiles'
import * as faker from 'faker'
import { BackDropV2 } from '../components/BackDrop'

// @refresh reset

const width = Dimensions.get("screen").width

const LeaderBoard = () =>
{
    // @refresh reset

    // const [props, set, stop] = useSpring( () => ( {
    //     opacity: 9, width: width, position: "absolute", top: 10, backgroundColor: "rgba(100,200,250,1)",
    //     from:{top:0},
    //     to: {top:450, opacity:.4},
    //     loop: { reverse: true }, config: {
    //         duration: 3000,
    //         easing: Easing.bounce,
            
    //     }
    // } ) )
    const theme = useTheme()
    const [data, setData] = useState<Map<string, FeedItemModel>>( new Map() )
    const [loading, setLoading] = useState( false )
    
    
    
    useEffect(() => {
setLoading(true)
        FireStore.retrieve.getEventsByRatings().then( res =>
        {               
            if ( res.length > 0 )
            {
                setData( d =>
                {
                    res.map( ( value: FeedItemModel, index ) =>
                    {
                        d.set(value.reference, value)
                    } )
                    
                    return d
                })  
            }
            setLoading(false)
        } ).catch( err =>
        {
            console.log("leaderboard err");
            setLoading( false )

            //could not get events
        })
    }, [] )

    if ( data.size == 0 )
    {
        return <View flex center padding-60 bg-background>
            <View center padding-10 style={{ minHeight: "10%" }}>
                <Icon name="trophy" size={42} color={Colors.text1} style={{ elevation: 10, textShadowRadius: 10 }} />
            </View>
            <Text lvl1 center>no parties rated yet. Be one of the first to get to the top!</Text>
            <View bg-foreground style={{
                position:"absolute",
                width: 200,
                height: 200,
                zIndex: -1,
                borderRadius: 200,
                elevation: 0,
                opacity:.3
            }} />
            <BackDropV2 />
        </View>
    }
    
    const getDataForList = ():FeedItemModel[] =>
    {
        return [...data.values()].sort((a,b)=> b.rating - a.rating)
    }

    const onPress = async () =>
    {
        const perm = await GetNotificationPermission()
        if ( perm )
        {
            
            Notifications.setNotificationHandler( {
                handleNotification: async () => ( {
                    shouldShowAlert: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                } ),
            } );
            
            Notifications.scheduleNotificationAsync( {
                content: {
                    title: "test notification",
                    body:"seem your at our party, enjoying it?"
                },
                trigger: {
                    seconds:1
                }
            })
        }
    }


    return (
        <SafeAreaView style={{flex:1, backgroundColor:Colors.background}}>
        <View bg-background>
                <View center padding-10 bg-background style={{ minHeight: "10%" }}>
                    <Icon name="trophy" size={42} color={Colors.text1} style={{ elevation: 10, textShadowRadius: 10 }} />
                </View>

                <FlatList
                    data={getDataForList()}
                    keyExtractor={( item: FeedItemModel ) => item.reference || faker.random.number( 200 ).toString()}
                    renderItem={( { item, index } ) =>
                    {
                    return <LeaderBoardTiles index={index} item={item} />
                }}    
                    />

        </View>
        </SafeAreaView>
    )
}

export default observer(LeaderBoard)
