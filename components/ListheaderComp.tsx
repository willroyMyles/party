import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const ListheaderComp = ( { header }: { header: string } ) =>
{
    const theme= useTheme()
    return (
        <View center>
            <Text lvl1 indicator>{header}</Text>
        </View>
    )
}

export default ListheaderComp
