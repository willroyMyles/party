import React, {useState} from "react"
import {View, Text, TouchableOpacity, Image, Colors} from "react-native-ui-lib"

import {useNavigation} from "@react-navigation/native"
import { FeedItemModel } from "../universal/Models"
import { useTheme } from "styled-components"
import moment from "moment"
// import * as faker from "faker"

const Feed_Item = ({
	item,
	index,
	onClick,
}: {
	item: FeedItemModel
	index?: number
	onClick?: (item: FeedItemModel) => void
	} ) =>
{
	const theme = useTheme()
	const navigation = useNavigation()
	const handleClick = () => {
		navigation.navigate("view event", {reference: item.reference})
	}

	return (
		<View
			margin-10
			style={{
				borderTopWidth: 0,
				borderBottomWidth: 0,
				paddingVertical: 5,
				marginVertical: -1,
			}}>
			<TouchableOpacity
				onPress={() => handleClick()}
				activeOpacity={0.85}
				padding-9
				marginV-8
			bg-foreground

				style={{borderWidth: 0, borderRadius: 4, elevation: 0, borderColor: Colors.grey50}}>
				<View>
						<Image
							source={{uri: item.imageUrl}}
							style={{flex: 1, flexDirection: "row", borderRadius: 3, height: 150}}
							resizeMode="cover"
						/>
					<View
						row
						padding-2
						paddingT-3
						paddingB-12
						marginV-15
						style={{flex: 2, flexDirection: "column", justifyContent: "space-between"}}>
							<Text lvl1>{item.title}</Text>
						<View row spread >
							<View>
								<Text muted>Date</Text>
								<Text regular>{moment(item.date).format("ddd MMM DD, YYYY")}</Text>
							</View>
							<View >
								<Text hint>Rating</Text>
								<Text regular>random stars?</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default Feed_Item
