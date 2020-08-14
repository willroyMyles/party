import React, { useState } from "react"
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

	const handleClick = () =>
	{
		navigation.navigate( "view event", { reference: item?.reference } )
	}

	return (

		<TouchableOpacity
			onPress={() => handleClick()}
			activeOpacity={0.85}
			paddingH-12
			marginV-15
			marginH-15
			// marginV-8
			bg-foreground
			style={{ borderRadius: 8, elevation: 2, width: width * .5 }}>
			<View style={{ elevation: 5 }} center>
				<Image
					source={{ uri: item.imageUrl }}

					style={{ flexDirection: "row", borderRadius: 3, height: 100 }}
					resizeMode="cover"
				/>
			</View>
			<View
				row
				padding-2
				paddingT-3
				marginV-15
				style={{ flexDirection: "column", justifyContent: "space-between" }}>
				<Text lvl1>{item.title}</Text>
				<View row spread >
					<View>
						<View marginV-3>
							<Text muted>Date</Text>
							<Text regular>{moment( item.date ).format( "ddd MMM DD, YYYY" )}</Text>
						</View>
						<View marginV-3>
							<Text muted>Starts at</Text>
							<View row>
								<Text regular>{moment( item.start ).format( "h:mm a" )}</Text>
								<Text regular color={Colors.muted}> for </Text>
								<Text regular>{item.duration}</Text>
								<Text regular color={Colors.muted}> hrs</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default Feed_ItemV2
