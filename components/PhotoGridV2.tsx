import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, TouchableOpacity, Colors, Avatar, Modal } from "react-native-ui-lib"
import { Dimensions, ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useTheme } from "styled-components"

import TToast from "./TToast"
import FireStore from "../data_layer/FireStore"
import { getImage } from "../universal/GetImage"
import { useNavigation } from "@react-navigation/native"
import ImageViewer from "react-native-image-zoom-viewer"
import { FlatList } from "react-native-gesture-handler"
import MasonaryView from "./MasonaryView"


const width = Dimensions.get( "screen" ).width / 2.5
const height = 240
const PhotoGridV2 = ( { reference }: { reference: string } ) =>
{
	const [data, setdata] = useState<any[]>( [] )
	const [urldata, setUrldata] = useState<any[]>( [] )
	const [loading, setLoading] = useState( true )
	const [index, setIndex] = useState( 0 )
	const [visible, setVisible] = useState( false )

	const navigation = useNavigation()
	const imgView = useRef<ImageViewer>()

	const handleImagePressed = ( index: number ) =>
	{
		const arr: any = []
		data.map( ( val, idx ) =>
		{
			arr.push( { url: val } )
		} )

		setUrldata( arr )

		setIndex( index )
		setVisible( true )

	}

	useEffect( () =>
	{
		FireStore.retrieve.picturesForEvent( reference ).then( ( res ) =>
		{
			
			if ( res )
			{
				setLoading( false )
				setdata( FireStore.eventImagesForPastEventsMap.get( reference ) || [] )				
			} else
			{
				TToast.error( "Error", "Something went wrong retireving images" )
			}
		} )
	}, [] )

	const handleUpload = () =>
	{
		FireStore.auth.needAuth().then( res =>
		{
			if ( res )
			{
				getImage().then( ( res ) =>
				{
					if ( !res.cancelled )
					{
						FireStore.send.sendPicturesToEvent( reference, res.uri ).then( ( res ) =>
						{
							if ( res )
							{
								TToast.success( "Success", "Everythings good to go!" )
							} else
							{
								TToast.error( "Error", "Something went wrong" )
							}
						} )
					}
				} )
			}
		} )
	}

	if ( loading )
		return (
			<View marginT-60 centerH paddingB-70>
				<Text imp marginB-20>
					Pictures
				</Text>
				<View>
					<ActivityIndicator size="large" color={Colors.primary} animating={true} />
					<Text imp1>Loading</Text>
				</View>
			</View>
		)

	return (
		<View marginT-60 centerH paddingB-70 style={{ borderWidth: 0, flex:1 }}>
				<TouchableOpacity onPress={handleUpload} center style={{
					position: "absolute",
					right: 25,
					bottom: 25,
					elevation: 7,
					borderRadius: 100,
					backgroundColor: Colors.foreground,
					padding: 7,
					width: 50,
					height: 50,

				}}>
				<View row centerV spread>
					{/* <Icon name="camera" color={Colors.primary} size={33} /> */}
					<Icon
						name="plus"
						color={Colors.primary}
						size={23}
						style={{
							// position: 'absolute',
							// bottom: 5,
							// left: 18,
							// backgroundColor: Colors.background,
							padding: 3,
							borderRadius: 50,
						}}
					/>
					{/* <Text marginH-10>add pictures</Text> */}
					</View>
				</TouchableOpacity>
		

			<View row center bg-foreground style={{ flexWrap: "wrap", margin: 0, borderRadius: 25, paddingTop:25 }}>
				<View center style={{ width: "100%", paddingStart: 20, opacity: .7 }}>
					<Icon name="camera" size={25} color={Colors.text2} />
					<Text lvl2 marginB-20>
						Pictures
					</Text>
				</View>
				<MasonaryView data={data} numOfCols={2}/>
				{data.length == 0 && <View
					margin-2
					center
					style={{
						width:"100%",
						opacity: 0.9,
						elevation: 0,
						height,
						borderColor: Colors.primary,
						padding:30
					}}>
					<Text marginT-10 regular primary indicator center style={{ fontWeight: "700" }}>
						no pictures as yet for {}
					</Text>
				</View>}
			</View>
		</View>
	)
}

export default PhotoGridV2
