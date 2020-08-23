import React, { useState } from 'react'
import { ImageBackground, Modal, StatusBar } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { View, Text, Image, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    const theme = useTheme()
    const [visible, setVisible] = useState( false )


    return (
        <TouchableOpacity onPress={() => setVisible( true )} style={{ maxHeight: 300, overflow: "hidden" }}>
            <Image fadeDuration={600} source={{ uri: imageUrl }} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
            <Modal visible={visible}>
                <ImageBackground blurRadius={20} source={{ uri: imageUrl }} style={{ height: "100%", width: "100%" }}>
                    <ImageViewer renderIndicator={() => <View />} enableSwipeDown={false} backgroundColor={"rgba(0,0,0,0)"} onCancel={() => setVisible( false )} imageUrls={[{ url: imageUrl }]} />
                    <View absB center style={{ width: "100%" }}>
                        <TouchableOpacity onPress={() => setVisible( false )} margin-5 padding-6 paddingH-18 br50 marginB-15 style={{
                            borderWidth: 0, borderColor: Colors.text2,
                            backgroundColor: Colors.background,
                            elevation: 5
                        }}>
                            <Text indicator>close</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>


            </Modal>
        </TouchableOpacity>
    )
}

export default EventHeaderImage
