import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native-ui-lib"
import {FeedItemModel} from "../universial/Models"
import {Dimensions} from "react-native"
import moment from "moment"
import uiManager from "../dataLayer/UiManager"

const {width, height} = Dimensions.get("screen")

const Feed_itemV2 = ({
	item,
	index,
	onClick,
}: {
	item: FeedItemModel
	index: number
	onClick: (item: FeedItemModel) => void
}) => {
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
				onPress={() => onClick(item)}
				activeOpacity={0.85}
				padding-9
				bg-background
				marginV-8
				style={{borderWidth: 0, borderRadius: 10, elevation: 10, borderTopWidth: 0}}>
				<View row>
					<Image
						source={{uri: item.flyer}}
						style={{flex: 1, flexDirection: "row", borderRadius: 10}}
						height={height * 0.125}
					/>
					<View
						padding-20
						paddingT-3
						paddingB-12
						style={{flex: 2, flexDirection: "column", justifyContent: "space-between"}}>
						<Text imp1>{item.title}</Text>
						<View marginT-10 row style={{justifyContent: "flex-start"}}>
							<View>
								<Text hint>Date</Text>
								<Text reg>{moment(item.date).format("MMM D, YYYY")}</Text>
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
