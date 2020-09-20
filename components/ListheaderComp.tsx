import React from 'react'
import { View, Text } from 'react-native-ui-lib'

const ListheaderComp = ({header}:{header:string}) => {
    return (
        <View center>
            <Text lvl1 indicator>{header}</Text>
        </View>
    )
}

export default ListheaderComp
