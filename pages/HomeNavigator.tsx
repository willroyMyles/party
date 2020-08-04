import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemoryLeaderBoard from './Memory&LeaderBoard';
import NearMe from './NearMe';
import Feed from './Feed';
import Settings from './Settings';

const Tab = createMaterialTopTabNavigator();


const HomeNavigator = () => {
    return (
        <Tab.Navigator tabBarPosition="bottom" swipeEnabled={false}>
            <Tab.Screen name="ml" component={MemoryLeaderBoard} />
            <Tab.Screen name="nearme" component={NearMe} />
            <Tab.Screen name="feed" component={Feed} />
            <Tab.Screen name="settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default HomeNavigator