import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack'
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
import ImageView from '../components/ImageView';
import SearchComponent from '../components/SearchComponent';
import SearchPage from './SearchPage';
import CategoryView from './CategoryView';
import ResetPassword from './auth/ResetPassword';
import WaitingScreen from './WaitingScreen';
import PostedPartiesView from './PostedPartiesView';

const Stack = createStackNavigator()
const prest = TransitionPresets.SlideFromRightIOS
const scaleTransition = TransitionPresets.ScaleFromCenterAndroid

const config: TransitionSpec = {
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
    return {
        cardStyle: {
            opacity: current.progress,
            scaleY: current.progress,
            scaleX: current.progress,

        }
    }
}


const StackNavigator = () =>
{
    return (
        <View flex>
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false, ...prest }}>
                    {/* <Stack.Screen name="wait" component={WaitingScreen} /> */}
                    <Stack.Screen name="home" component={HomeNavigator} />
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="register" component={Register} />
                    <Stack.Screen name="create event" component={CreateEvent} />
                    <Stack.Screen name="view event" component={EventView} />
                    <Stack.Screen name="view past event" component={PastEventView} />
                    <Stack.Screen name="useMap" component={UseMapView} />
                    <Stack.Screen name="search" component={SearchPage} />
                    <Stack.Screen name="category" component={CategoryView} />
                    <Stack.Screen name="reset password" component={ResetPassword} />
                    <Stack.Screen name="posted parties" component={PostedPartiesView} />
                    <Stack.Screen options={{ ...scaleTransition, cardStyleInterpolator: forFade }} name="image view" component={ImageView} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default StackNavigator
