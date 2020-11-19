import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { Image, Colors, View, TouchableOpacity } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { animated, useSpring } from 'react-spring/native'
import FastImage from 'react-native-fast-image'

//@refresh reset

const {width,height} = Dimensions.get("screen")
const minimizedHeight = height*.4;
const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    const theme = useTheme()
    const [visible, setVisible] = useState( true );

     const [props, set] = useSpring( () => ( {
         opacity: 1, width: width, backgroundColor: Colors.background, maxHeight: minimizedHeight,
         blur : 6,
        config: {
            bounce: 100,
            friction:30
        }
     } ) )
    
    const onPress = () =>
    {
        set( {
            maxHeight: visible? height : minimizedHeight,
            blur : visible? 0 : 6
        } ).then( () =>
        {
            setVisible(v => !v)
        })
    }

    const TouchOp = animated( TouchableOpacity )
    const IMG = animated( FastImage )

  

    return (
       <View style={{marginBottom:"45%"}}>
             <View center style={{width:"100%", height:"100%", zIndex:16, position:"absolute", top: "30%"}}>
               <TouchableOpacity center activeOpacity={.9} onPress={onPress} style={{width:"95%", height:"130%", padding:20}} >
               <View style={{elevation:10, width:"95%", height:"100%"}}>
               <IMG source={{
                    uri:imageUrl ,
                    priority : "normal"
                }}
                    style={{width:"100%", height:"100%"}}
                    resizeMode={FastImage.resizeMode.contain}
                    />
               </View>
               </TouchableOpacity>
            </View>
            <Image 
            blurRadius={6.3}
                source={{
                    uri: imageUrl
                }}
                resizeMode={FastImage.resizeMode.cover}
                
                style={{
                height: 390, width: "100%",
                // top : -minimizedHeight
                // top: props.maxHeight.to([minimizedHeight, height*.9], [-minimizedHeight,0])
            }} />
        </View>
    )
}

export default EventHeaderImage
