import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Memories from './Memories'
import LeaderBoard from './LeaderBoard'

const Tab = createMaterialTopTabNavigator()

const MemoryLeaderBoard = () => {
    return (
        <View flex>
            <Tab.Navigator tabBarPosition="top">
                <Tab.Screen name="memories" component={Memories} />
                <Tab.Screen name="leaderboard" component={LeaderBoard} />
            </Tab.Navigator>
        </View>
    )
}

export default MemoryLeaderBoard
