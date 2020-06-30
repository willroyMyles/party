import React from "react"
import {View, Text, TouchableOpacity, Image} from "react-native-ui-lib"
import {FeedItemModel} from "../universial/Models"
import moment from "moment"

const Feed_Item = ({
	item,
	index,
	onClick,
}: {
	item: FeedItemModel
	index: number
	onClick: (item: FeedItemModel) => void
}) => {
	return (
		<View bg-background_secondary margin-20 br20 style={{elevation: 4, overflow: "hidden"}}>
			<View>
				<Image style={{borderRadius: 6}} source={{uri: item.image}} cover />
				<View
					style={{
						position: "absolute",
						backgroundColor: "rgba(0,0,0,.1)",
						height: "100%",
						width: "100%",
						justifyContent: "center",
						alignItems: "flex-end",
						alignSelf: "center",
						opacity: 0,
					}}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							backgroundColor: "rgba(20,20,20,.7)",
							height: "40%",
							width: "30%",
							borderRadius: 7,
							justifyContent: "center",
							alignItems: "center",
						}}>
						<View>
							<Text btn>View </Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
				<View flex-3 padding-15>
					<Text date>{moment(item.date).format("MMMM DD, YYYY")}</Text>
					<Text reg marginT-3>
						{item.title}
					</Text>
					<Text hint>{item.hint}</Text>
				</View>
				<View flex-1>
					<TouchableOpacity
						onPress={() => {
							// eventEmitter.emit(eventStrings.eventClicked, item)
							onClick(item)
						}}
						activeOpacity={0.8}
						style={{
							backgroundColor: "rgba(0,0,120,.06)", //find color base on thee
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<View>
							<Text reg>View</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default Feed_Item
