import { useTheme, useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'
import FireStore from '../data_layer/FireStore'

const PostedPartiesItem = ({reference} : {reference : string}) => {

    const item = FireStore.data.get( reference )
	if ( !item ) return <View />

	const theme = useTheme()
	const navigation = useNavigation()
    const [image, setImage] = useState<string>()
    
    useEffect( () =>
	{

		async function getImage()
		{
			const d = await FireStore.retrieve.imageFromReference( item.reference , item.flyer)
			setImage( d )
		}

		getImage()
    }, [] )
    

    return (
        <View center style={{width:"45%", margin:"2.5%"}}>
           <Image blurRadius={3} source={{uri:image}} style={{ flexDirection: "row", borderRadius: 3, height: 100, width: "100%", borderWidth: 2 }}
				resizeMode="cover"/>
                <View style={{backgroundColor:Colors.background, position:"absolute", width:"100%", height:"100%", opacity:.5}}/>
                <View center style={{position:"absolute"}}>
                    <Text color={Colors.text1} style={{fontSize:12, fontWeight:"700"}}>{item.title}</Text>
                    <Text style={{fontSize:12}} regular>{moment( new Date( item.date )).format( "ddd MMM DD, YYYY" )}</Text>

                </View>

             
        </View>
    )
}

export default PostedPartiesItem
