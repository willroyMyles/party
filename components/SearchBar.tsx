import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components'

const SearchBar = () =>
{
    const theme = useTheme()
    const navigation = useNavigation()
    const handlePress = () =>
    {
        navigation.navigate( "search" )
    }
    return (
        <View padding-7 paddingH-15 marginV-4 marginB-10 paddingT-12 style={{ width: "100%" }}>
            <TouchableOpacity centerV onPress={handlePress} spread bg-foreground style={s.bar} >
                <Text lvl2>search</Text>
                <Icon name="search" size={14} color={Colors.text2} />
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create( {
    bar: {
        padding: 7,
        flexDirection: "row",
        borderRadius: 50,
        paddingHorizontal: 15

    }
} )

export default SearchBar
