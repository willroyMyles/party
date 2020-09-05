import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { Button } from 'react-native-ui-lib'
import {useTheme} from 'styled-components'
import { GetNotificationPermission } from '../universal/GetNotification'
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native-safe-area-context'
import RateParty from '../components/RateParty'

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
                    // RateParty.show()
                    RateParty.rateParty.hide()

                }}>
                    <Text>hide</Text>
                </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

export default LeaderBoard
