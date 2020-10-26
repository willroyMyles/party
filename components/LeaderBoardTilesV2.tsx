import React from 'react'
import { View, Text, Colors, Image } from 'react-native-ui-lib'
import { useSpring } from 'react-spring/native'
import { useTheme } from 'styled-components'
import { FeedItemModel } from '../universal/Models'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'
import { useEffect } from 'react'
import FireStore from '../data_layer/FireStore'

const LeaderBoardTilesV2 = ( { item, index }: { item: FeedItemModel, index: number } ) =>
{
    const theme = useTheme()
    const [image, setImage] = useState<string>()
    useEffect( () =>
    {
        async function getImage()
        {
            const d = await FireStore.retrieve.imageFromReference( item.reference, item.flyer )
            setImage( d )
        }

        if ( item ) getImage()
    }, [] )
  
    return (
        <View marginT-20 bg-foreground centerV style={{
            width: "100%", overflow: "hidden", elevation:0, paddingVertical:5, borderRadius:7 }}>
            
            <View centerV row style={{ width: "100%"}}>

                <View center padding-10>
                    <Text lvl1>{index + 1}.</Text>
                </View>
                <View style={{
                    height: 70, width: 70, borderRadius: 60, elevation: 7, overflow: "hidden", borderWidth: 3, borderColor: Colors.foreground
                }}>
                    <Image fadeDuration={600} blurRadius={.5} source={{ uri: image }} resizeMode="cover" style={{ height: "100%", width: "100%", position: "absolute" }} />
                </View>
      
                <View row marginL-5 paddingH-10 centerV spread style={{width:"70%"}}>
                    <View padding-3 br10 paddingH-15>
                        <Text lvl1> { item.title}</Text>
                    </View>

                    <View marginR-5 center padding-10>
                        <Text lvl1 center style={{ width: "100%", fontWeight: "700", marginStart: 3, marginTop: 3, fontSize: 30 }}>{item.attendance} </Text>
                        <Text lvl2 center muted style={{ width: "100%", fontWeight: "400", marginStart: 3, marginTop: 3 }}>attended </Text>
                    </View>
                </View>    


            </View>      
        </View>
    )
}
export default LeaderBoardTilesV2
