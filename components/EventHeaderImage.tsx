import React, { useState } from 'react'
import { Dimensions, Easing, ImageBackground, Modal, StatusBar } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { View, Text, Image, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import LinearGradient from 'react-native-linear-gradient';
import { animated, useSpring } from 'react-spring/native'
import { interpolate } from 'react-native-reanimated'

const {width,height} = Dimensions.get("screen")
const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    const theme = useTheme()
    const [visible, setVisible] = useState( true )

     const [props, set, stop] = useSpring( () => ( {
         opacity: 1, width: width, position: "relative", backgroundColor: Colors.background, maxHeight: height*.4,
        config: {
            bounce: 100,
            friction:30
        }
     } ) )
    
    const onPress = () =>
    {
        set( {
            maxHeight: visible? height : height*.4
        } ).then( res =>
        {
            setVisible(v => !v)
        })
    }

    const TouchOp = animated( TouchableOpacity )
    const IMG = animated( Image )

    return (
        <TouchOp onPress={onPress} style={{ zIndex:15, overflow: "hidden" , ...props}}>
            <IMG fadeDuration={600} source={{ uri: imageUrl }} resizeMode="contain" style={{
                height: height, width: width,
                top: props.maxHeight.to([height*.4, height*.9], [-height*.3,0])
            }} />
        </TouchOp>
    )
}

export default EventHeaderImage
