import React from 'react'
import { View, Text, Image } from 'react-native-ui-lib'

const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    return (
        <View style={{ maxHeight: 300, overflow: "hidden" }}>
            <Image fadeDuration={600} source={{ uri: imageUrl }} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
        </View>
    )
}

export default EventHeaderImage
