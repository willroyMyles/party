import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const RowButton = ({ text, where }: { text: string, where: string }) => {
    const navigation = useNavigation()
    const [location, setLocation] = useState<string | null>(null)
   useEffect(() => {
      if(where != "") setLocation(where)
   }, [])
    const handlePress = () =>
    {
        if ( location ) { navigation.navigate( where ) }
    }
    return (
        <View padding-5 paddingH-10 marginT-7>
            <TouchableOpacity row onPress={handlePress} style={style.row}>
                <Text lvl2 style={style.text}>{text}</Text>
                <Icon name="chevron-right" size={15} style={{opacity:.3}} color={Colors.text1} />
            </TouchableOpacity>
        </View>
    )
}

export default RowButton

const style = StyleSheet.create({
    row: {
        justifyContent: "space-between",
        padding: 5,
        paddingBottom:15,
        borderBottomColor: Colors.grey40+"43",
        borderBottomWidth: .5,
        marginBottom:2

    },
    text: {
        textTransform: "capitalize"
    }
})
