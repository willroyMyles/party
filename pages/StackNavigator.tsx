import React, { lazy, LazyExoticComponent, Suspense } from 'react'
import { View, Text, LoaderScreen } from 'react-native-ui-lib'
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
// import Login from './auth/Login';
// import Register from './auth/Register';

import { presetDarkPalettes } from '@ant-design/colors';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { Dimensions, Animated } from 'react-native';
import ImageView from '../components/ImageView';
import SearchComponent from '../components/SearchComponent';

// import ResetPassword from './auth/ResetPassword';
import WaitingScreen from './WaitingScreen';

const Stack = createStackNavigator()
const prest = TransitionPresets.SlideFromRightIOS
const scaleTransition = TransitionPresets.ScaleFromCenterAndroid





const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const CreateEvent = lazy(() => import("./settings/CreateEvent"));
const EventView = lazy(() => import("./EventView"));
const PastEventView = lazy(() => import("./PastEventView"));
const UseMapView = lazy(() => import("./UseMapView"));
const SearchPage = lazy(() => import("./SearchPage"));
const CategoryView = lazy(() => import("./CategoryView"));
const PostedPartiesView = lazy(() => import("./PostedPartiesView"));

const routemap : Map<string, LazyExoticComponent<() => JSX.Element>> = new Map();
routemap.set("login", Login);
routemap.set("register", Register);
routemap.set("reset password", ResetPassword);
routemap.set("create event", CreateEvent);
routemap.set("view event", EventView);
routemap.set("view past event", PastEventView);
routemap.set("useMap", UseMapView);
routemap.set("search", SearchPage);
routemap.set("category", CategoryView);
routemap.set("posted parties", PostedPartiesView);

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


const GetScreen = ({name,comp}:{name:string, comp : LazyExoticComponent<() => JSX.Element>}) : any => {
    return(
        <Stack.Screen name={name} >
        {() => <Suspense fallback={<LoaderScreen />}>
               {comp}
            </Suspense>}
    </Stack.Screen>
    )
}

const StackNavigator = () =>
{
    return (
        <View flex>
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false, ...prest }}>
                    {/* <Stack.Screen name="wait" component={WaitingScreen} /> */}
                    <Stack.Screen name="home" component={HomeNavigator} />
                    {[...routemap.entries()].map((entry, index)=>{
                        const Comp : LazyExoticComponent<() => JSX.Element> = entry[1];
                        return <Stack.Screen name={entry[0]} key={index}>
                            {() => (<Suspense fallback={<LoaderScreen />}>
                                {<Comp />}
                            </Suspense>)}
                        </Stack.Screen>
                    })}


                    <Stack.Screen options={{ ...scaleTransition, cardStyleInterpolator: forFade }} name="image view" component={ImageView} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default StackNavigator
