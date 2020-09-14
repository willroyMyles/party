import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, Colors } from "react-native-ui-lib"

import { useNavigation } from "@react-navigation/native"
import { FeedItemModel } from "../universal/Models"
import { useTheme } from "styled-components"
import moment from "moment"
import BackDrop from "./BackDrop"
import FireStore from "../data_layer/FireStore"
import { Dimensions } from "react-native"
// import * as faker from "faker"
const { width, height } = Dimensions.get( "screen" )

const Feed_ItemV2 = ( { reference }: { reference: string } ) =>
{
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

	const handleClick = () =>
	{
		navigation.navigate( "view event", { reference: item?.reference } )
	}

	return (

		<TouchableOpacity
			onPress={() => handleClick()}
			activeOpacity={0.85}
			marginV-15
			marginH-15

			// marginV-8
			bg-foreground
			style={{ borderRadius: 8, elevation: 2, width: width * .5, overflow: "hidden" }}>
			<Image
				source={{ uri: image }}
				style={{ flexDirection: "row", borderRadius: 3, height: 100, width: "100%", borderWidth: 2 }}
				resizeMode="cover"
			/>
			<View
				row
				padding-2
				paddingT-3
				paddingH-12
				marginV-15
				style={{ flexDirection: "column", justifyContent: "space-between" }}>
				<Text lvl1>{item.title}</Text>
				<View row spread >
					<View>
						<View>
							<Text muted>Date</Text>
							<Text regular>{moment( new Date( item.date )).format( "ddd MMM DD, YYYY" )}</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default Feed_ItemV2
