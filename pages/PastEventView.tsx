import React, { useEffect, useState } from "react"
import { View, Text, Image, Colors, TouchableOpacity } from "react-native-ui-lib"
import { useRoute } from "@react-navigation/native"

import { FlatList, ScrollView } from "react-native-gesture-handler"
import FireStore from "../data_layer/FireStore"
import DateBox from "../components/DateBox"
import EventHeaderImage from "../components/EventHeaderImage"
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/FontAwesome5'
import TToast from "../components/TToast"
import { Dimensions } from "react-native"
import PhotoGridImage from "../components/PhotoGridImage"
import { GetIcon } from "../universal/GS"
import moment from "moment"
const width = Dimensions.get( "screen" ).width

const PastEventView = () =>
{
	const route = useRoute()
	const referenceNumber: string = route.params?.reference
	const item = FireStore.memoryData.get( referenceNumber )
	const [image, setimage] = useState<string>()
	const [data, setdata] = useState<any[]>( [] )
	const numOfCols = 3
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
		<View bg-background style={{ minHeight:"100%" }}>

			<TouchableOpacity center style={{
				position: "absolute",
				right: 25,
				bottom: 25,
				elevation: 7,
				borderRadius: 100,
				backgroundColor: Colors.background,
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


				<FlatList
					contentContainerStyle={{paddingBottom: 105,  width, marginVertical: 20, backgroundColor: Colors.foreground }}
					style={{ width: "100%",  backgroundColor: Colors.foreground, flex:1 }}
					data={data.slice()}
					keyExtractor={( item, index ) => item}
					numColumns={numOfCols}
					renderItem={( { item, index } ) =>
					{
						return <PhotoGridImage urls={data} img={item} index={index} numOfCols={numOfCols} wid={wid} />
					}}
					ListHeaderComponent={
						<View bg-background>
							<EventHeaderImage imageUrl={image} />
							<View marginT-20 padding-20 paddingT-3 paddingB-12 style={{ flexDirection: "column", justifyContent: "space-between" }}>
								<View marginT-10 style={{ justifyContent: "flex-start" }}>
									
									<View center>
										<Text lvl1>{item.title}</Text>
									</View>
									<View marginT-20 row>
										<GetIcon name="calendar" />
										<View marginL-10>
											<Text lvl3 text3>Date</Text>
											<Text regular>{moment( new Date( item.date ) ).format( "ddd - MMM DD, YYYY" )}</Text>
										</View>
									</View>
									<View marginT-20 row>
										<GetIcon name="clock" />
										<View marginL-10>
											<Text lvl3 text3>Time</Text>
											<Text lvl2>{moment( new Date( item.start || "" ) ).format( "hh:mm A" )} for {item.duration} hrs</Text>
										</View>
									</View>
								
								</View>
							
							</View>

							<View paddingV-30 centerH bg-foreground marginT-30 style={{
								borderWidth: 0, borderTopRightRadius: 35, borderTopLeftRadius: 35, elevation: 0,
}}>
								<View center style={{ width: "100%", paddingStart: 20, opacity: .7 }}>
									<Icon name="camera" size={25} color={Colors.text2} />
									<Text lvl2>
										Pictures
									</Text>
								</View>
							</View>
							{data.length == 0 && <View
								margin-2
								center
								style={{
									width: "100%",
									// opacity: 0.9,
									// borderColor: Colors.primary,
									padding: 30,
									backgroundColor:Colors.foreground
								}}>
								<Text marginT-10 text2 center style={{ fontWeight: "700", fontSize:18, opacity:.95 }}>
									no pictures as yet for <Text primary>{item.title}</Text> {"\n"}
									Be the first to add one!
								</Text>
							</View>}
						</View>
					}


				/>
		</View>
	)
}


export default observer( PastEventView )
