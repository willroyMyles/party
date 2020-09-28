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


const width = Dimensions.get( "screen" ).width
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

	const numOfCols = 2
	const off = numOfCols / 5.5
	const wid = width / numOfCols 


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
							padding: 3,
							borderRadius: 50,
						}}
					/>
				</View>
			</TouchableOpacity>
		

			<View bg-foreground style={{borderRadius: 25, paddingTop:25, height:"100%"  }}>
				<FlatList
					ListHeaderComponent={
						<View>
							
							<View centerH >
								<View center style={{ width: "100%", paddingStart: 20, opacity: .7 }}>
									<Icon name="camera" size={25} color={Colors.text2} />
									<Text lvl2 marginB-20>
										Pictures
									</Text>
								</View>
							</View>
						</View>
					}
					contentContainerStyle={{ borderWidth: 0, paddingBottom: 35, padding: 10, width }}
					style={{ width: "100%", overflow: "visible" }}
					data={data.slice()}
					keyExtractor={( item, index ) => item}
					numColumns={numOfCols}
					renderItem={( { item, index } ) =>
					{
						const notIt = index % numOfCols == 0
						return <View style={{
							top: notIt ? 0 : 75,
							padding: 12 / numOfCols,
							width: wid - 7.5
						}}>
							<TouchableOpacity
								// onPress={() => handleImagePressed( index )}
								activeOpacity={0.85}
								key={index}
								style={{
									elevation: 10,
									borderWidth: 2,
									borderColor: Colors.text1 + "33",
									borderRadius: 16,
									overflow: "hidden",
									height: 250,

								}}>

								<Image source={{ uri: item }} resizeMode="cover"
									style={{ width: "100%", height: "100%" }}
								/>
							</TouchableOpacity>
						</View>

					}}

					// ListFooterComponent={()=>
					// 	{data.length == 0 && <View
					// 			margin-2
					// 			center
					// 			style={{
					// 				width: "100%",
					// 				opacity: 0.9,
					// 				elevation: 0,
					// 				height,
					// 				borderColor: Colors.primary,
					// 				padding: 30
					// 			}}>
					// 			<Text marginT-10 regular primary indicator center style={{ fontWeight: "700" }}>
					// 				no pictures as yet for {}
					// 			</Text>
					// 		</View>
					// 	}
					// }

				/>
			
			</View>
		</View>
	)
}

export default PhotoGridV2
