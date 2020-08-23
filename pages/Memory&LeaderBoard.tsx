import React from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Memories from './Memories'
import LeaderBoard from './LeaderBoard'
import { useTheme } from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tab = createMaterialTopTabNavigator()

const MemoryLeaderBoard = () =>
{
    const theme = useTheme()
    const s = { style: { marginHorizontal: 10, marginVertical: 5, marginBottom: 10, borderRadius: 60, overflow: "hidden", elevation: 0, borderWidth: 0 }, }
    const style = { tabStyle: { backgroundColor: Colors.background, borderBottomWidth: 2, borderBottomColor: Colors.foreground }, labelStyle: { fontFamily: "RR" }, activeTintColor: Colors.primary, inactiveTintColor: Colors.muted }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator tabBarOptions={style} tabBarPosition="top">
                <Tab.Screen name="memories" component={Memories} />
                <Tab.Screen name="leaderboard" component={LeaderBoard} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default MemoryLeaderBoard
