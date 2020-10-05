import React from 'react'
import { TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, Colors } from 'react-native-ui-lib'


interface InputProps extends TextInputProps{
    name?:string,
    errors? : string
}

const CustomTextInput = (props : InputProps) => {
    return (
        <View marginV-5 style={{width:"100%"}}>
            <Text lvl2 style={{textTransform:"capitalize"}}>{props.name}</Text>
                <TextInput {...props} style={{
                    padding: 5,
                    backgroundColor:Colors.background,
                    marginVertical:4,
                    borderRadius:7,
                    color:Colors.text1,
                    paddingStart:15
                }}/>
            {props.errors && <Text lvl2 red10 >{props.errors}</Text>}
        </View>
    )
}

export default CustomTextInput
