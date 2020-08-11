import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const ImageView = () =>
{

    const navigation = useNavigation()
    const theme = useTheme()
    const route = useRoute()
    const imageUri = route.params?.uri

    const onClose = () => navigation.goBack()

    if ( imageUri )
    {
        return (
            <View flex center style={{borderWidth:3, backgroundColor:"transparent"}}>
                <Image source={{ uri: imageUri }} style={{ height:"50%"}} resizeMode="contain"  cover />
                <TouchableOpacity
                    onPress={onClose}
                    style={{
                        position: "absolute",
                        left: 10,
                        top: 20,
                        backgroundColor:Colors.background
                    
                }}>
                    <Icon name="x" />
                </TouchableOpacity>
            </View>
        )
    }
    else
    {
        return <View flex bg-background>
            <Text>Something went wrong</Text>
        </View>
    }
}

export default ImageView
