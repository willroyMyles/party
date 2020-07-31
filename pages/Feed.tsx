import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import tm from '../universal/UiManager'

const Feed = () => {
    const theme = useTheme()



    return (
        <View bg-background style={{ backgroundColor: tm.theme.background }}>
            <Text>feed</Text>
        </View>
    )
}

export default Feed
