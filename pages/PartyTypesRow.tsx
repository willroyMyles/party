import { useTheme } from '@react-navigation/native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, { Easing, Transition, Transitioning, TransitioningView } from 'react-native-reanimated'
import { View, Text, TouchableOpacity, Colors, Image } from 'react-native-ui-lib'
import FireStore from '../data_layer/FireStore'
import { GetPartytypeString } from '../universal/GS'
import { PartyType } from '../universal/Models'
const { width, height } = Dimensions.get( "screen" )


const PartyTypesRow = () =>
{

    const theme = useTheme()
    const holder = useRef<TransitioningView | any>()
    const [visible, setVisible] = useState( true )
    const [data, setData] = useState<string[]>( [] )

    const loadFeed = () =>
    {
        FireStore.retrieve.events().then( res =>
        {
            const keys = [...FireStore.categorizedData.keys()]
            setData( keys )

        } ).catch( err =>
        {
            const keys = [...FireStore.categorizedData.keys()]
            setData( keys )
        } )
    }



    return (
        <View center paddingV-10 style={{ width: "100%", height: 270 }}>
            <Text marginT-5 marginL-10 indicator style={{ alignSelf: "flex-start" }}>Categories</Text>
            {data.length == 0 && <TouchableOpacity onPress={loadFeed}>
                <Text>load feed</Text>
            </TouchableOpacity>}
            {data.length != 0 && <FlatList
                data={data}
                horizontal
                contentContainerStyle={{ height: "100%", padding: 10 }}
                keyExtractor={( item, index ) => "item" + index}
                renderItem={( { item, index } ) =>
                {

                    return <View center style={{ height: "100%" }}>
                        <PartyCard item={item} />
                    </View>
                }}

            />}
        </View>
    )
}

export default PartyTypesRow

const transitions = (
    <Transition.Sequence>
        <Transition.In type="fade" />
        <Transition.Change interpolation="easeInOut" />
        <Transition.Out type="fade" />
    </Transition.Sequence>
)
const PartyCard = memo( ( { item }: { item: string } ) =>
{
    const text = GetPartytypeString( PartyType[item] )
    const data = FireStore.categorizedData.get( item )
    const length = data?.length
    const [index, setIndex] = useState( 0 )
    const [currentItem, setCurrentItem] = useState( data[0] )
    const [image, setimage] = useState<string>()
    let fade = new Animated.Value<number>( 1 )

    useEffect( () =>
    {
        changeImage()

    }, [] )

    const changeItem = () =>
    {

        if ( length == undefined ) return
        let newIndex = 0
        newIndex = index + 1 >= length ? 0 : index + 1
        setIndex( newIndex )
        setCurrentItem( data[newIndex] )


        changeImage()
    }

    const changeImage = () =>
    {
        FireStore.retrieve.imageFromReference( currentItem.reference || "" ).then( res =>
        {
            setimage( res )
        } )
    }



    setTimeout( () =>
    {
        changeItem()
    }, 6000 );


    return (
        <TouchableOpacity center bg-red50 style={{
            marginHorizontal: 10,
            height: "100%",
            width: width * .4,
            borderRadius: 12,
            overflow: "hidden",
            elevation: 5

        }}>
            <Image fadeDuration={300} source={{ uri: image }} style={{ width: "100%", height: "100%" }} />

            <View style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: 10,
                backgroundColor: Colors.foreground + "22",
                width: "100%"
            }}>
                <Animated.View style={{ opacity: fade }}>
                    <Text lvl2>{currentItem.title}</Text>
                </Animated.View>
                <Text lvl2>{text}</Text>
            </View>

        </TouchableOpacity>
    )

} )
