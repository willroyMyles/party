import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { Button } from 'react-native-ui-lib'
import {useTheme} from 'styled-components'
import { GetNotificationPermission } from '../universal/GetNotification'
import * as Notifications from 'expo-notifications';

const LeaderBoard = () =>
{
    const theme = useTheme()
    
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
        <View bg-background style={{minHeight:"100%"}}>
            <Text lvl2>Leaderboard</Text>
            <Button onPress={onPress}>
                <Text>some text</Text>
            </Button>
        </View>
    )
}

export default LeaderBoard
