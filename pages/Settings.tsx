import React from 'react'
import { View, Text, UIManager } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Profile from './settings/Profile'
import Account from './settings/Account'
import About from './settings/About'
import { Colors } from 'react-native-ui-lib'
import tm from '../universal/UiManager'
import { useTheme } from 'styled-components'

const Tab = createMaterialTopTabNavigator()
const Settings = () =>
{
    const theme = useTheme()
   const style = {tabStyle: { backgroundColor: Colors.background, borderBottomWidth: 2, borderBottomColor: Colors.foreground }, labelStyle: { fontFamily: "RR" }, activeTintColor:Colors.primary, inactiveTintColor:Colors.muted
}
    return (
        <Tab.Navigator tabBarOptions={style}>
            <Tab.Screen name="profile" component={Profile} />
            <Tab.Screen name="account" component={Account} />
            <Tab.Screen name="about" component={About} />
        </Tab.Navigator>
    )
}

export default Settings
