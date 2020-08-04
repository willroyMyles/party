import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import Login from './auth/Login';
import Register from './auth/Register';
import CreateEvent from './settings/CreateEvent';
import UseMapView from './UseMapView';
import EventView from './EventView';

const Stack = createStackNavigator()

const StackNavigator = () => {
    return (
        <View flex>
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="home" component={HomeNavigator} />
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="register" component={Register} />
                    <Stack.Screen name="create event" component={CreateEvent} />
                    <Stack.Screen name="view event" component={EventView} />
                    <Stack.Screen name="useMap" component={UseMapView} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default StackNavigator
