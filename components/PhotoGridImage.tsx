import { useBackButton } from '@react-navigation/native'
import { HeaderHeightContext } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { BackHandler, Dimensions, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { View, Text, TouchableOpacity, Colors, Image } from 'react-native-ui-lib'
import { useSpring, animated, useTransition } from 'react-spring/native'

const GetCopy = () =>
{
    
}
// @refresh reset


const {width, height} = Dimensions.get("screen")

const PhotoGridImage = ( { numOfCols, wid, index, img, urls }: any ) =>
{
    const notIt = index % numOfCols == 0
    const [show, setShow] = useState( false )
    const [urlData, seturlData] = useState( [] )
    const [values, setValues] = useState<any>()

    
    const [props, set] = useSpring( () => ( {
        from: { opacity:1, num:0.97},
        to: {  opacity:1 , num:1},
        
        config: {
            duration : 300
        },
        native:true
    } ) )


    const handlePressed = (val : boolean) =>
    {
        BackHandler.addEventListener( "hardwareBackPress", dismiss )

        setShow(val)
    }

    useEffect(() => {
        const arr: any = []
        urls.map( ( val:any, idx:number ) =>
        {
            arr.push( { url: val } )
        } )
        BackHandler.addEventListener( "hardwareBackPress", dismiss )

        seturlData( arr )

    }, [] )
    
    const dismiss = () =>
    {        
        // setShow( false )
        // BackHandler.removeEventListener( "hardwareBackPress", dismiss )
        return undefined
    }

const V = animated(View)
    return (
        <V style={{
            // top: props.top,
            padding: 5 / numOfCols,
            width: wid,
            marginVertical: 5,
            transform:[{scale: props.num}],
            ...props
            // ...values
        }}>
            <Modal visible={show} onRequestClose={() => setShow(false)}>
                <ImageViewer imageUrls={urlData} index={index} enableSwipeDown swipeDownThreshold={200} onCancel={() => handlePressed( false )} />
            </Modal>
            
            <TouchableOpacity
                onPress={() => handlePressed( !show )}
                activeOpacity={0.85}
                key={index}
                style={{
                    elevation: 0,
                    borderWidth: 1,
                    borderColor: Colors.text1 + "33",
                    borderRadius: 6,
                    overflow: "hidden",
                    height: 150,

                }}>

                 <Image source={{ uri: img }} resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                /> 
            </TouchableOpacity>
        </V>
    )
}

export default PhotoGridImage
