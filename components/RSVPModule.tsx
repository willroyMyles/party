import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Colors } from "react-native-ui-lib"

import TToast from "./TToast"
import { FeedItemModel } from "../universal/Models"
import FireStore from "../data_layer/FireStore"
import { FlatList } from "react-native-gesture-handler"
import Feed_itemV2 from "./Feed_itemV2"
import Feed_Item from "./Feed_Item"

const RSVPModule = () =>
{

	const [data, setData] = useState<FeedItemModel[] | undefined>()
	useEffect( () =>
	{

		FireStore.retrieve.rsvpEvents().then( res =>
		{
			console.log( "rsvp called" );

			const d = [...FireStore.rsvpData.values()]
			setData( d )
			console.log( d.length );

		} ).catch( err =>
		{
			console.log( "rsvp error", err );

		} )
		return () =>
		{
		}
	}, [] )

	if ( data ) return (
		<View marginT-30 style={{ width: "100%" }}>
			<View>
				<Text lvl2>{data.length} RSVP parties</Text>
			</View>

			<View br20 marginT-0 style={{ borderBottomWidth: 0, borderBottomColor: Colors.foreground }}>
				<FlatList
					data={data}
					horizontal
					keyExtractor={( item, index ) => item + "" + index + ""}
					renderItem={( { item, index } ) =>
					{
						return <Feed_itemV2 key={index} reference={item.reference} />
					}}
				/>
			</View>

		</View>
	)

	return <View />
}

export default RSVPModule
