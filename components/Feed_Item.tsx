import React, {useState} from "react"
import {View, Text, TouchableOpacity, Image, Colors} from "react-native-ui-lib"
import {FeedItemModel} from "../universial/Models"
import moment from "moment"
import {SharedElement} from "react-navigation-shared-element"
import uiManager from "../dataLayer/UiManager"
import {useNavigation} from "@react-navigation/native"
// import * as faker from "faker"

const Feed_Item = ({
	item,
	index,
	onClick,
}: {
	item: FeedItemModel
	index: number
	onClick: (item: FeedItemModel) => void
}) => {
	const [uri, setUri] = useState("")
	const navigation = useNavigation()
	const handleClick = () => {
		navigation.navigate("past-event", {reference: item.reference})
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
				onPress={() => handleClick()}
				activeOpacity={0.85}
				padding-9
				bg-background
				marginV-8
				style={{borderWidth: 0, borderRadius: 10, elevation: 5, borderColor: Colors.grey50}}>
				<View>
					<SharedElement id={item.reference + "imgmem"} style={{flex: 1}}>
						<Image
							source={{uri: item.imageUrl}}
							style={{flex: 1, flexDirection: "row", borderRadius: 10, height: 150}}
							resizeMode="cover"
						/>
					</SharedElement>
					<View
						row
						padding-20
						paddingT-3
						paddingB-12
						style={{flex: 2, flexDirection: "column", justifyContent: "space-between"}}>
						<SharedElement id={item.reference + "titlemem"}>
							<Text imp1>{item.title}</Text>
						</SharedElement>
						<View marginT-10 row style={{justifyContent: "flex-start"}}>
							<View>
								<Text hint>Date</Text>
								<Text reg>{item.date}</Text>
							</View>
							<View style={{marginStart: "30%"}}>
								<Text hint>Rating</Text>
								<Text reg>random stars?</Text>
							</View>
						</View>
					</View>
				</View>
				<View row>
					<View>
						<Text>amount of pictures?</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default Feed_Item
