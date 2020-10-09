import React from 'react'
import { ImageBackground, StatusBar } from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'


const WaitingScreen = () =>
{
    const theme = useTheme()
    return (
        <View center flex bg-background>

            <StatusBar backgroundColor={Colors.background} />
            <Text lvl1>waiting</Text>
        </View>
    )
}

export default WaitingScreen
