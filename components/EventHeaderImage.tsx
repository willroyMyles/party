import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { Image, Colors, View, TouchableOpacity } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { animated, useSpring } from 'react-spring/native'
import FastImage from 'react-native-fast-image'

//@refresh reset

const {width,height} = Dimensions.get("screen")
const minimizedHeight = height*.7;
const EventHeaderImage = ( { imageUrl }: { imageUrl?: string } ) =>
{
    const theme = useTheme()
    const [visible, setVisible] = useState( true );

     const [props, set] = useSpring( () => ( {
         opacity: 1, width: width, backgroundColor: Colors.background, maxHeight: minimizedHeight,
         bm : "45%", h:minimizedHeight, top:"8%", blurImageHeight: "80%",
         blur : 6,
        config: {
            duration:350
        }
     } ) )
    
    const onPress = () =>
    {
        set( {
            bm: visible? "0%" : "45%",
            h: visible? height : minimizedHeight,
            top: visible? "0%" : "8%",
            blurImageHeight : visible? "100%" : "80%",
            blur: visible? 10 : 6
        } ).then( () =>
        {
            setVisible(v => !v)
        })
    }

    const TouchOp = animated( TouchableOpacity )
    const IMG = animated( FastImage )
    const IMG1 = animated( Image )
    const Vi = animated( View )

  

    return (
       <Vi style={{height:props.h, overflow:"visible", width, paddingBottom:20}}>
                      <IMG1 
            blurRadius={8}
                source={{
                    uri: imageUrl
                }}
                resizeMode="cover"
                
                style={{
                    zIndex:1, backgroundColor:Colors.background,
                height: props.blurImageHeight, width:"100%"
                // top : -minimizedHeight
                // top: props.maxHeight.to([minimizedHeight, height*.9], [-minimizedHeight,0])
            }} />
             <Vi  center style={{width:"100%", height:"100%", zIndex:16, position:"absolute", top: props.top, borderWidth:0, elevation:0}}>
               <TouchableOpacity center activeOpacity={.9} onPress={onPress} style={{ borderWidth:0, elevation:0, width:"90%", height:"90%"}} >
               <IMG source={{
                    uri:imageUrl ,
                    priority : "normal"
                }}
                    style={{width:"100%", height:"99%"}}
                    resizeMode={ FastImage.resizeMode.contain}
                    />
               </TouchableOpacity>
            </Vi>
 
        </Vi>
    )
}

export default EventHeaderImage
