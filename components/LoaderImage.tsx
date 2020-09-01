import React from 'react'
import { Image } from 'react-native'
import { View, Text, LoaderScreen, Colors } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const LoaderImage = ( { uri, width, height }: { uri: string | undefined, height: string | number | undefined, width: string | number | undefined}) => {
   
    const theme = useTheme()
   
   if(uri) return (
       <Image
           fadeDuration={300}
           source={{ uri: uri }}
           style={{ width: width || "100%", height: height || "100%" }}
       />
   )
    
    return (
        <View bg-background center style={{width:"100%", height:"100%"}}>
            <LoaderScreen color={Colors.primary}/>
        </View>
    )
}

export default LoaderImage
