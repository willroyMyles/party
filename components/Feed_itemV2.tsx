import React from "react"
import {View, Text, Image, TouchableOpacity, Colors} from "react-native-ui-lib"
import {FeedItemModel} from "../universial/Models"
import {Dimensions} from "react-native"
import moment from "moment"
import uiManager from "../dataLayer/UiManager"
import {SharedElement} from "react-navigation-shared-element"
import {useNavigation} from "@react-navigation/native"
import dataProvider from "../dataLayer/DataStore"

const {width, height} = Dimensions.get("screen")

const Feed_itemV2 = ({
	item,
	index,
}: // onClick,
{
	item: FeedItemModel
	index: number
	onClick?: (item: FeedItemModel) => void
}) => {
	const navigation = useNavigation()
	const onClick1 = () => {
		dataProvider.currentEvent = item
		navigation.navigate("event")
	}

	return (
		<View
			style={{
				borderTopWidth: 0,
				borderBottomWidth: 0,
				paddingVertical: 5,
				marginVertical: -1,
				borderColor: uiManager.theme.bgHilight,
			}}>
			<TouchableOpacity
				onPress={() => onClick1()}
				activeOpacity={0.85}
				padding-9
				bg-background
				marginV-8
				style={{borderWidth: 0, borderRadius: 10, elevation: 0, borderColor: Colors.grey50}}>
				<View row>
					<SharedElement id={item.reference + "img"} style={{flex: 1}}>
						<Image
							source={{uri: item.imageUrl}}
							style={{flex: 2, flexDirection: "row", borderRadius: 10}}
							resizeMode="cover"
						/>
					</SharedElement>
					<View
						padding-20
						paddingT-3
						paddingB-12
						style={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
						<SharedElement id={item.reference + "title"}>
							<Text imp1>{item.title}</Text>
						</SharedElement>
						<View marginT-10 row style={{justifyContent: "flex-start"}}>
							<View>
								<Text hint>Date</Text>
								<Text reg>{item.date}</Text>
							</View>
							<View style={{marginStart: "30%"}}>
								<Text hint>Time</Text>
								<Text reg>{item.start}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default Feed_itemV2
