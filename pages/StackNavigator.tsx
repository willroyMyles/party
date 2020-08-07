import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { createStackNavigator , TransitionPresets, } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import Login from './auth/Login';
import Register from './auth/Register';
import CreateEvent from './settings/CreateEvent';
import UseMapView from './UseMapView';
import EventView from './EventView';
import PastEventView from './PastEventView';
import { presetDarkPalettes } from '@ant-design/colors';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { Dimensions, Animated } from 'react-native';

const Stack = createStackNavigator()
const prest = TransitionPresets.SlideFromRightIOS

const config : TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 1.01,
    restSpeedThreshold: 1.01,
  },
};

const forFade = ( { current }: { current: any } ) =>
{
    const offset = new Animated.Value(current.progress * Dimensions.get("screen").width)
    
    return {
        cardStyle: {
            opacity: current.progress,
            // scaleY: current.progress,
            // scaleX: current.progress,

        }
    }
}


const StackNavigator = () => {
    return (
        <View flex>
            <NavigationContainer >
                <Stack.Navigator  screenOptions={{ headerShown: false, ...prest }}>
                    <Stack.Screen name="home" component={HomeNavigator} />
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="register" component={Register} />
                    <Stack.Screen name="create event" component={CreateEvent} />
                    <Stack.Screen name="view event" component={EventView}   options={{cardStyleInterpolator:forFade}} />
                    <Stack.Screen name="view past event" component={PastEventView} />
                    <Stack.Screen name="useMap" component={UseMapView} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default StackNavigator
