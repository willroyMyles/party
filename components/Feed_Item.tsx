import React, {useState} from "react"
import {View, Text, TouchableOpacity, Image} from "react-native-ui-lib"
import {FeedItemModel} from "../universial/Models"
import moment from "moment"
import * as faker from "faker"

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

	return (
		<View padding-15 br20 style={{elevation: 0, overflow: "hidden"}}>
			<View>
				<View style={{elevation: 10, borderWidth: 0}}>
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
							opacity: 1,
							zIndex: 3,
						}}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								onClick(item)
							}}
							style={{
								backgroundColor: "rgba(20,20,20,.8)",
								height: "40%",
								width: "30%",
								borderRadius: 7,
								justifyContent: "center",
								alignItems: "center",
							}}>
							<View>
								<Text desc>View </Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
				<View flex-3>
					<Text date>{moment(item.date).format("MMMM DD, YYYY")}</Text>
					<Text reg marginT-3>
						{item.title}
					</Text>
					<Text hint>{item.hint}</Text>
				</View>
				<View flex-1>
					{/* <TouchableOpacity
						onPress={() => {
							onClick(item)
						}}
						activeOpacity={0.8}
						style={{
							backgroundColor: "rgba(0,0,120,.00)", //find color base on thee
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<View>
							<Text reg>View</Text>
						</View>
					</TouchableOpacity> */}
				</View>
			</View>
		</View>
	)
}

export default Feed_Item
