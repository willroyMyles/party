import React from 'react'
import { View, Text, UIManager } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Profile from './settings/Profile'
import Account from './settings/Account'
import About from './settings/About'
import { Colors } from 'react-native-ui-lib'
import tm from '../universal/UiManager'
import { useTheme } from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tab = createMaterialTopTabNavigator()
const Settings = () =>
{
    const theme = useTheme()

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Tab.Navigator tabBarOptions={{
                allowFontScaling: true,
                tabStyle: {
                    borderBottomColor: Colors.primary,
                    backgroundColor: Colors.background
                },
                labelStyle: { shadowRadius: 1 },
                activeTintColor: Colors.primary,
                inactiveTintColor: Colors.muted,
                indicatorStyle: { backgroundColor: Colors.secondary, elevation: 12, borderRadius: 0, marginBottom: -3 }
            }}>
                <Tab.Screen name="profile" component={Profile} />
                <Tab.Screen name="account" component={Account} />
                <Tab.Screen name="about" component={About} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Settings
