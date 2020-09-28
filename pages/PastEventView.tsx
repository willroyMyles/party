import React, { useEffect, useState } from "react"
import { View, Text, Image, Colors, TouchableOpacity } from "react-native-ui-lib"
import { useRoute } from "@react-navigation/native"

import { FlatList, ScrollView } from "react-native-gesture-handler"
import FireStore from "../data_layer/FireStore"
import PhotoGridV2 from "../components/PhotoGridV2"
import DateBox from "../components/DateBox"
import EventHeaderImage from "../components/EventHeaderImage"
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/FontAwesome5'
import TToast from "../components/TToast"
import { Dimensions } from "react-native"
const width = Dimensions.get( "screen" ).width

const PastEventView = () =>
{
	const route = useRoute()
	const referenceNumber: string = route.params?.reference
	const item = FireStore.memoryData.get( referenceNumber )
	const [image, setimage] = useState<string>()
	const [data, setdata] = useState<any[]>( [] )
	const numOfCols = 2
	const off = numOfCols / 5.5
	const wid = width / numOfCols

	if ( !item ) return <View />
	useEffect( () =>
	{
		async function getImage()
		{
			const d = await FireStore.retrieve.imageFromReference( item.reference, item.flyer )
			setimage( d )
		}
		if ( item )
		{
			getImage()
			FireStore.retrieve.picturesForEvent( referenceNumber ).then( ( res ) =>
			{

				if ( res )
				{
					// setLoading( false )
					setdata( FireStore.eventImagesForPastEventsMap.get( referenceNumber ) || [] )
				} else
				{
					TToast.error( "Error", "Something went wrong retireving images" )
				}
			} )
		}


	}, [] )

	if ( item ) return (
		<View bg-background style={{ minHeight: "100%", paddingBottom: 15 }}>
			<TouchableOpacity center style={{
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


			<View style={{ borderRadius: 25, paddingTop: 0, height: "100%" }}>
				<FlatList
					contentContainerStyle={{ borderWidth: 0, paddingBottom: 95, padding: 0, width, marginVertical: 20, backgroundColor: Colors.foreground }}
					style={{ width: "100%", overflow: "visible", backgroundColor: Colors.foreground }}
					data={data.slice()}
					keyExtractor={( item, index ) => item}
					numColumns={numOfCols}
					renderItem={( { item, index } ) =>
					{
						const notIt = index % numOfCols == 0
						return <View style={{
							top: notIt ? 0 : 75,
							padding: 12 / numOfCols,
							width: wid
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
					ListHeaderComponent={
						<View bg-background>
							<EventHeaderImage imageUrl={image} />
							<View row marginT-20 padding-20 paddingT-3 paddingB-12 style={{ flexDirection: "column", justifyContent: "space-between" }}>
								<Text lvl1>{item.title}</Text>
								<View marginT-10 row style={{ justifyContent: "flex-start" }}>
									<View absR style={{ marginTop: -15 }}>
										<DateBox date={item.date || ""} />
									</View>
									<View style={{ marginStart: "30%" }}>
									</View>
								</View>
							</View>

							<View paddingV-30 centerH bg-foreground marginT-30 style={{ borderWidth: 0, borderTopRightRadius: 35, borderTopLeftRadius: 35 }}>
								<View center style={{ width: "100%", paddingStart: 20, opacity: .7 }}>
									<Icon name="camera" size={25} color={Colors.text2} />
									<Text lvl2 marginB-20>
										Pictures
									</Text>
								</View>
							</View>
						</View>
					}

					ListFooterComponent={
						<View>
							{data.length == 0 && <View
								margin-2
								center
								style={{
									width: "100%",
									opacity: 0.9,
									elevation: 0,
									height: "100%",
									borderColor: Colors.primary,
									padding: 30
								}}>
								<Text marginT-10 regular primary indicator center style={{ fontWeight: "700" }}>
									no pictures as yet for {}
								</Text>
							</View>
							}
						</View>
					}

				/>

			</View>
		</View>
	)
}


export default observer( PastEventView )
