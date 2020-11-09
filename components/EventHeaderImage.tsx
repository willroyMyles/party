import React, { useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import { Image, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { animated, useSpring } from 'react-spring/native'
import FastImage from 'react-native-fast-image'

const {width,height} = Dimensions.get("screen")
const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    const theme = useTheme()
    const [visible, setVisible] = useState( true );

     const [props, set] = useSpring( () => ( {
         opacity: 1, width: width, backgroundColor: Colors.background, maxHeight: height*.4,
        config: {
            bounce: 100,
            friction:30
        }
     } ) )
    
    const onPress = () =>
    {
        set( {
            maxHeight: visible? height : height*.4
        } ).then( () =>
        {
            setVisible(v => !v)
        })
    }

    const TouchOp = animated( TouchableOpacity )
    const IMG = animated( FastImage )

  

    return (
        <TouchOp activeOpacity={.9} onPress={onPress} style={{ zIndex:15, overflow: "hidden" , ...props}}>
            <IMG 
                source={{
                    uri: imageUrl,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                
                style={{
                height: height, width: width,
                top: props.maxHeight.to([height*.4, height*.9], [-height*.3,0])
            }} />
        </TouchOp>
    )
}

export default EventHeaderImage
