import React, { useState } from 'react'
import { View, Text, Avatar, TouchableOpacity } from 'react-native-ui-lib'
import auth from '@react-native-firebase/auth'
const ProfilePiece = () => {


    const [name, setName] = useState("")
    const [image, setImage] = useState("")

    auth().onAuthStateChanged( ( user ) =>
    {
        console.log("use changed");
        
        if (user) {
            setName(user.displayName || "")
            setImage(user.photoURL || "")
        }

    })



    return (
        <View marginV-20>
            <View center>
                <TouchableOpacity>
                    <Avatar animate source={{ uri: image }} size={82} containerStyle={{ elevation: 5 }} />
                </TouchableOpacity>
                <Text marginT-5>{name}</Text>
            </View>
        </View>
    )
}

export default ProfilePiece
