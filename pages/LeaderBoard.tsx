import React from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { Button } from 'react-native-ui-lib'
import {useTheme} from 'styled-components'
import { GetNotificationPermission } from '../universal/GetNotification'
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native-safe-area-context'
import { animated, useSpring } from 'react-spring/native'
import { Dimensions, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList } from 'react-native-gesture-handler'
import { FeedItemModel, PartyType } from '../universal/Models'
import { useState } from 'react'
import FireStore from '../data_layer/FireStore'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import LeaderBoardTiles from '../components/LeaderBoardTiles'
import * as faker from 'faker'
import { BackDropV2 } from '../components/BackDrop'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import LeaderBoardPage from './leaderboards/LeaderBoardPage'
import { getPartyTypeArray } from '../universal/GS'

// @refresh reset

const width = Dimensions.get("screen").width
const Tabs = createMaterialTopTabNavigator();
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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} >
            <View center padding-10 bg-background style={{ minHeight: "10%" }}>
                <Icon name="trophy" size={42} color={Colors.text1} style={{ elevation: 0, textShadowRadius: 1 }} />
            </View>
            <Tabs.Navigator tabBarOptions={{
                allowFontScaling: true,
                tabStyle: {
                    borderBottomColor: Colors.primary,
                    backgroundColor:Colors.background
                },
                labelStyle:{shadowRadius:1},
                activeTintColor: Colors.primary,
                inactiveTintColor: Colors.muted,
                indicatorStyle:{backgroundColor:Colors.secondary, elevation:12, borderRadius:50}
            }}>
                {getPartyTypeArray().map( ( keys, index:number ) =>
                {
                    
                    const text = (keys + "").replace('_', ' ').toLowerCase()
                    
                    return ( <Tabs.Screen key={keys + "" + index} name={text} >

                        {() =>
                        {
                            return (
                                    <LeaderBoardPage type={keys} />
                            )
                       }}
                        </Tabs.Screen>)
                         
                        })}
            </Tabs.Navigator>
        </SafeAreaView>
    )

}

export default observer(LeaderBoard)
