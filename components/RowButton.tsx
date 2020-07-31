import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

const RowButton = ({ text, where }: { text: string, where: string }) => {
    const navigation = useNavigation()
    const handlePress = () => navigation.navigate(where)
    return (
        <View padding-10>
            <TouchableOpacity row onPress={handlePress} style={style.row}>
                <Text style={style.text}>{text}</Text>
                <Text>{">"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RowButton

const style = StyleSheet.create({
    row: {
        justifyContent: "space-between",
        padding: 5,

    },
    text: {
        textTransform: "capitalize"
    }
})
