import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Profile from './settings/Profile'
import Account from './settings/Account'
import About from './settings/About'

const Tab = createMaterialTopTabNavigator()
const Settings = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="profile" component={Profile} />
            <Tab.Screen name="account" component={Account} />
            <Tab.Screen name="about" component={About} />
        </Tab.Navigator>
    )
}

export default Settings
