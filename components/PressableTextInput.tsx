import React from 'react'
import { View, Text, TextField, Colors, TouchableOpacity } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { GS } from '../universal/GS';

const PressableTextInput = ( { onPress, child} :{onPress: () => void, child:any}) =>
{    
    
    const theme = useTheme()
    return (
        <TouchableOpacity
            
            onPress={(e) =>
            {
                onPress()
        }}
        >
            {child}
        </TouchableOpacity>
    )
}

export default PressableTextInput
