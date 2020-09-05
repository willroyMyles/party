import React from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { Button } from 'react-native-ui-lib'
import {useTheme} from 'styled-components'
import { GetNotificationPermission } from '../universal/GetNotification'
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native-safe-area-context'
import RateParty from '../components/RateParty'
import { animated, useSpring } from 'react-spring/native'
import { Dimensions } from 'react-native'

// @refresh reset

const width = Dimensions.get("screen").width

const LeaderBoard = () =>
{
    // @refresh reset

    const [props, set, stop] = useSpring( () => ( {
        opacity: 9, width: width, position: "absolute", top: 10, backgroundColor:"rgba(100,200,250,1)", config: {
        tension : 100
        }
    } ) )
    

    const theme = useTheme()
    const TouchButton = animated(View)
    const onPress = async () =>
    {
        const perm = await GetNotificationPermission()
        if ( perm )
        {
            console.log( "should sent noti" );
            
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
        <SafeAreaView style={{flex:1}}>

        <View bg-background style={{minHeight:"100%"}}>
            <Text lvl2>Leaderboard</Text>
                <Button onPress={onPress}>
                    <Text>some text</Text>
                </Button>

                <TouchableOpacity marginT-30 bg-red40 padding-30 center onPress={() =>
                {
                    // RateParty.show()
                    RateParty.rateParty.show()

                }}>
                    <Text>show</Text>
                </TouchableOpacity>
                <TouchableOpacity marginT-30 bg-blue40 padding-30 center onPress={() =>
                {
                    RateParty.rateParty.hide()

                }}>
                    <Text>hide</Text>
                </TouchableOpacity>

                <TouchButton center style={{
                    ...props, backgroundColor: props.top.to( val =>
                    {
                        let r = val / 450 * 255
                    let g = val / 450 * 255
                        let b = val / 450 * 255
                        return `rgba(${r}, ${b}, ${b}, 1)`
                }) }}>
                    <TouchableOpacity activeOpacity={1} marginT-30  padding-30 center onPress={() =>
                    {
                        
                        set( { top: 450, width:width/10, backgroundColor:"rgba(0,0,0,1)" } ).then( res =>
                        {
                            set({top:20, width:width, backgroundColor:"rgba(100,200,300,1)"})
                            
                        })
                    }}>
                        <Text>rest</Text>
                    </TouchableOpacity>
</TouchButton>
        </View>
        </SafeAreaView>
    )
}

export default LeaderBoard
