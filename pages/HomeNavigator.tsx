import React from 'react'
import { View, Text, ColorName, Colors } from 'react-native-ui-lib'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemoryLeaderBoard from './Memory&LeaderBoard';
import NearMe from './NearMe';
import Feed from './Feed';
import Settings from './Settings';
import NearMeV2 from './NearMeV2';

const Tab = createMaterialTopTabNavigator();


const HomeNavigator = () => {
    return (
        <Tab.Navigator tabBarPosition="bottom" swipeEnabled={false} tabBarOptions={{
            activeTintColor: Colors.primary,
            indicatorContainerStyle: {
                padding: 10,
            },
            tabStyle: {
                padding: 2,
                borderTopWidth: 1,
                borderColor: Colors.secondary,
            },
            allowFontScaling: true,
            // contentContainerStyle: {
            //     backgroundColor: Colors.background,
            //     elevation:10
            // },

        }}>
            <Tab.Screen name="ml" component={MemoryLeaderBoard} />
            <Tab.Screen name="nearme" component={NearMeV2} />
            <Tab.Screen name="feed" component={Feed} />
            <Tab.Screen name="settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default HomeNavigator
