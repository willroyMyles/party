import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get("screen")
const BackDrop = () => {
    const theme = useTheme()
    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height,
            top: 0,
            zIndex: -1
        }}>

            <View bg-green30 style={{
                position: "absolute",
                width: "100%",
                height: 400,
                left: "-50%",
                top: "-10%",
                borderRadius: 200,
                elevation: 10,

            }} />

            <View bg-red30 style={{
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
