import React from 'react'
import { View, Text, Avatar } from 'react-native-ui-lib'

const ProfilePiece = ({ name, image }: { name: string, image: string }) => {
    return (
        <View marginV-20>
            <View center>
                <Avatar animate source={{ uri: image }} size={82} containerStyle={{ elevation: 5 }} />
                <Text marginT-5>{name}</Text>
            </View>
        </View>
    )
}

export default ProfilePiece
