import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const NearMe = () => {
    const theme = useTheme()
    return (
        <View style={{ backgroundColor: theme.background }}>
            <Text>near me</Text>
        </View>
    )
}

export default NearMe
