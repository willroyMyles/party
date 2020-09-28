import { HeaderHeightContext } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { View, Text, TouchableOpacity, Colors, Image } from 'react-native-ui-lib'

const GetCopy = () =>
{
    
}

const {width, height} = Dimensions.get("screen")
const PhotoGridImage = ( { numOfCols, wid, index, img, urls }: any ) =>
{
    const notIt = index % numOfCols == 0
    const [show, setShow] = useState( false )
    const [urlData, seturlData] = useState([])

    const handlePressed = (val : boolean) =>
    {
        setShow(val)
    }

    useEffect(() => {
        const arr: any = []
        urls.map( ( val:any, idx:number ) =>
        {
            arr.push( { url: val } )
        } )

        seturlData( arr )
    }, [])


    return (
        <View style={{
            // top: notIt ? 0 : 75,
            padding: 5 / numOfCols,
            width: wid,
            marginVertical:5
        }}>
            <Modal visible={show}>
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
        </View>
    )
}

export default PhotoGridImage
