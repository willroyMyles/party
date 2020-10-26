import React from 'react'
import { View, Text, Colors, Image } from 'react-native-ui-lib'
import { useSpring } from 'react-spring/native'
import { useTheme } from 'styled-components'
import { FeedItemModel } from '../universal/Models'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'
import { useEffect } from 'react'
import FireStore from '../data_layer/FireStore'

const LeaderBoardTiles = ( { item, index }: { item: FeedItemModel, index: number } ) =>
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
    const isFirst = index < 10 
    const topThree = index < 1
    return (
        <View margin-10 padding-0 bg-foreground br20 centerV style={{
            elevation: 6,
            height: topThree ? 100 : "auto",
            overflow:"hidden"
        }}>

            {isFirst && <Image fadeDuration={600} blurRadius={1} source={{ uri: image }} resizeMode="cover" style={{ height: "120%", width: "105%", position:"absolute" }} />
}

            <View row centerV style={{
                width: "100%",     
                padding:10
            }}>
                <View center style={{
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    backgroundColor: Colors.background,
                }}>
                    <Text lvl2 center style={{width:"100%", marginStart:3, marginTop:3}}>{index + 1} </Text>
                </View>
                <Text lvl2 marginH-10  ellipsizeMode={"tail"} style={{
                    textShadowRadius: 50,
                    textShadowOffset:{height:1,width:1}
                }}>{item.title} </Text>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent:"flex-end"
                }}>
                    <View center row paddingH-10 style={{
                        // width: "10%",
                        borderRadius: 10,
                        backgroundColor: Colors.red70,
                        borderWidth: 1, borderColor: Colors.red30
                    }}>
                        {/* <Icon name="arrow-up" size={16} color={Colors.text1}  style={{marginStart:4, marginEnd:4, opacity:.6}} /> */}
                        <Text center red20 style={{ fontWeight: "700", fontSize:20, padding:5 }}>
                            {item.rating}
                        </Text>
                    </View>
                </View>
           </View>
        </View>
    )
}

export default LeaderBoardTiles
