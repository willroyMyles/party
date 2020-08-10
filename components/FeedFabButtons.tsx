import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'
import { Transitioning, Transition } from "react-native-reanimated"
import { LayoutAnimation, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'


const FeedFabButtons = ( { offset }: { offset: { x: number, y: number } } ) =>
{
    const [showing, setShowing] = useState( true )
    const [currentOffset, setcurrentOffset] = useState( 0 )
    const ref = useRef()

    const navigation = useNavigation()


    const transition = (
        <Transition.Sequence>
            <Transition.Out type="fade" />
            <Transition.Change durationMs={500} interpolation="easeInOut" />
            <Transition.In type="fade" />
        </Transition.Sequence>
    )

    const onSearch = () => navigation.navigate("search")
    

    const onAdd = () => navigation.navigate("create event")

    // useEffect( () =>
    // {

    //     return
    //     // const sign = offset.y - currentOffset
    //     // setcurrentOffset( offset.y )
    //     // setShowing(sign> 0 ? false:true)
    //     // ref.current?.animateNextTransition()

    //     const CustomLayoutLinear = {
    //         duration: 200,
    //         create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
    //         update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
    //         delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },

    //     }

    //     const direction = ( currentOffset > 0 && currentOffset > offset.y )
    //         ? true
    //         : false


    //     if ( direction != showing )
    //     {
    //         LayoutAnimation.configureNext( CustomLayoutLinear )
    //         setShowing( direction )
    //     }

    //     setcurrentOffset( offset.y )
    // }, [offset] )






    return (
        <View spread style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            padding:2,
        }} >
            {showing && <View >

                <TouchableOpacity onPress={onSearch} bg-primary center style={[s.btn]} >
                    <Icon name="search" size={25} color={Colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onAdd} bg-primary center style={[s.btn]}>
                    <Icon name="plus" size={25} color={Colors.white}/>
                </TouchableOpacity>
            </View>}
        </View>

    )
}

const s = StyleSheet.create( {
    btn: {
        height: 55,
        width: 55,
        margin: 6,
        padding: 5,
        borderRadius:50,
        elevation: 6,
        
    }
} )

export default FeedFabButtons
