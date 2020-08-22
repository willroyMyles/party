import React, { useState } from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { View, Text, Image, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    const theme = useTheme()
    const [visible, setVisible] = useState( false )
    const [urls, setUrls] = useState( [{ url: imageUrl }] )


    return (
        <TouchableOpacity onPress={() => setVisible( true )} style={{ maxHeight: 300, overflow: "hidden" }}>
            <Image fadeDuration={600} source={{ uri: imageUrl }} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
            <Modal visible={visible}>
                <ImageViewer renderIndicator={() => <View />} enableSwipeDown={false} backgroundColor={Colors.background} onCancel={() => setVisible( false )} imageUrls={urls} />
                <View absB center style={{ width: "100%" }}>
                    <TouchableOpacity onPress={() => setVisible( false )} margin-5 padding-6 paddingH-15 br30 marginB-15 style={{ borderWidth: 1, borderColor: Colors.text2 }}>
                        <Text lvl2>close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default EventHeaderImage
