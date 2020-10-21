import React, { useState } from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { Dimensions, Easing } from 'react-native'
import Animated from 'react-native-reanimated'
import { animated, useSpring, } from 'react-spring/native'

const { width, height } = Dimensions.get( "screen" )
const BackDrop = () =>
{
    const theme = useTheme()
    return (
        <View bg-background style={{
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
// @refresh reset

export const BackDropV2 = () =>
{

      const [props, set, stop] = useSpring( () => ( {
        opacity: 9, width: width, position: "absolute", top: 10, backgroundColor: "rgba(100,200,250,1)",scale:1,
        from:{opacity:1, scale:.8},
        to: {opacity:-.1, scale:1.4},
        loop:true, config: {
            duration: 3000,
            easing: Easing.linear,

        }
    } ) )

    const AnimatedView = animated( View )

    return (
        <View style={{
            position: "absolute",
            width,
            height: "140%",
            // top: 0,
            zIndex: -1
        }}>

            <AnimatedView bg-purple40 style={[{
                position: "absolute",
                width,
                height: 400,
                left: "-60%",
                top: "-10%",
                borderRadius: 200,
                
                transform: [{ scale: props.scale }]

            }, props]} />
            <AnimatedView bg-purple40 style={[{
                position: "absolute",
                width,
                height: 400,
                left: "-60%",
                top: "-10%",
                borderRadius: 200,
                elevation: 30,
            }]} />

            <View bg-violet60 style={{
                position: "absolute",
                width: 400,
                height: 400,
                right: "-70%",
                bottom: "0%",
                borderRadius: 200,
                elevation: 10,

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
                position: "absolute",
                width: 120,
                height: 120,
                left: -60,
                top: -30,
                borderRadius: 200,
                elevation: 16,

            }} />

            <View bg-violet60 style={{
                width: 160,
                height: 160,
                right: -50,
                bottom: 0,
                borderRadius: 200,
                elevation: 6,
                position: "absolute",

            }} />


        </View>
    )
}
