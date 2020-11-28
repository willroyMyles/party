import React from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'

const LoadingScreen = () => {
    return (
        <View flex>
            <LoadingScreen loaderColor={Colors.primary} />
        </View>
    )
}

export default LoadingScreen
