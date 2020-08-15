import React, { useState } from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'

const { width, height } = Dimensions.get( "screen" )
const BackDrop = () =>
{
    const theme = useTheme()
    return (
        <View style={{
            position: "absolute",
            width,
            height,
            top: 0,
            zIndex: -1
        }}>

            <View bg-violet60 style={{
                position: "absolute",
                width,
                height: 400,
                left: "-50%",
                top: "-10%",
                borderRadius: 200,
                elevation: 10,

            }} />

            <View bg-purple40 style={{
                position: "absolute",
                width: 400,
                height: 400,
                right: "-50%",
                bottom: "0%",
                borderRadius: 200,
                elevation: 10,

            }} />

        </View>
    )
}

export default BackDrop

export const BackDropV2 = () =>
{

    const [scale, setScale] = useState( new Animated.Value( 1 ) )

    return (
        <View style={{
            position: "absolute",
            width,
            height: "140%",
            // top: 0,
            zIndex: -1
        }}>

            <View bg-purple40 style={{
                position: "absolute",
                width,
                height: 400,
                left: "-60%",
                top: "-10%",
                borderRadius: 200,
                elevation: 30,

            }} />

            <View bg-violet60 style={{
                position: "absolute",
                width: 400,
                height: 400,
                right: "-70%",
                bottom: "0%",
                borderRadius: 200,
                elevation: 30,

            }} />


        </View>
    )
}


export const BackDropV3 = () =>
{
    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1
        }}>

            <View bg-purple60 style={{
                // position: "absolute",
                width: "100%",
                height: "100%",
                left: "-60%",
                top: "-10%",
                borderRadius: 200,
                elevation: 10,

            }} />

            <View bg-violet60 style={{
                width: "100%",
                height: "100%",
                right: "-60%",
                top: "-70%",
                borderRadius: 200,
                elevation: 10,

            }} />


        </View>
    )
}
