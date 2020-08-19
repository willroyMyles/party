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

const width = Dimensions.get( "screen" ).width / 3.1
const height = 150
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
		<View marginT-60 centerH paddingB-70 style={{ borderWidth: 0 }}>
			<Modal visible={visible}>
				<ImageViewer imageUrls={urldata} index={index} enableSwipeDown swipeDownThreshold={200} onCancel={() => setVisible( false )} />
			</Modal>
			<View center>
				<Icon name="camera" size={25} color={Colors.text2} />
				<Text lvl2 marginB-20>
					Pictures
			</Text>
			</View>

			<View row center style={{ flexWrap: "wrap", margin: 0, borderRadius: 5 }}>
				{data.map( ( src, index ) =>
				{
					return (
						<TouchableOpacity
							onPress={() => handleImagePressed( index )}
							margin-2
							activeOpacity={0.85}
							key={index}
							style={{
								width,
								elevation: 1,
								borderWidth: 0.5,
								borderColor: Colors.grey40,
								borderRadius: 3,
								overflow: "hidden",
							}}>
							<Image source={{ uri: src }} resizeMode="cover"
								style={{ width: "100%", height }}

							/>
						</TouchableOpacity>
					)
				} )}
				<TouchableOpacity
					onPress={handleUpload}
					activeOpacity={0.85}
					margin-2
					center
					// backgroundColor={Colors.primary}
					style={{
						width,
						opacity: 0.9,
						elevation: 0,
						borderRadius: 3,
						height,
						borderColor: Colors.primary,
						borderWidth: 2,
						borderStyle: "dashed"
					}}>
					<Icon name="plus-circle" size={32} color={Colors.primary} />
					<Text marginT-10 regular primary style={{ fontWeight: "700" }}>
						upload picture
					</Text>
				</TouchableOpacity>
			</View>
			{/* <View style={{position: "absolute", bottom: 15, margin: 5}}>
				<TouchableOpacity
					margin-2
					center
					row
					padding-10
					backgroundColor={Colors.primary}
					style={{width: Dimensions.get("screen").width / 1.07, opacity: 0.8, elevation: 10, borderRadius: 3}}>
					<Icon name="plus-circle" size={32} />
					<Text style={{fontWeight: "700"}}>upload picture</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	)
}

export default PhotoGridV2
