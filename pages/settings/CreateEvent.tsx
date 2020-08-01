import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const CreateEvent = () => {
    const theme = useTheme()
    return (
        <View center >
            <TouchableOpacity center style={[style.upload, { backgroundColor: Colors.background }]}>
                <Text>upload image</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateEvent

const style = StyleSheet.create({
    upload: {
        borderWidth: .5,
        elevation: 10,
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        width: "80%"
    }
})
