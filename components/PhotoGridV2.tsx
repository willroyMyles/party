import React, {useState, useEffect} from "react"
import {View, Text, Image, TouchableOpacity, Colors, Avatar} from "react-native-ui-lib"
import {Dimensions, ActivityIndicator} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import {useTheme} from "styled-components"
import {getImage} from "../universial/GetImage"
import fireSotreMob from "../dataLayer/FireStore"
import TToast from "./TToast"

const width = Dimensions.get("screen").width / 3.1
const PhotoGridV2 = ({reference}: {reference: string}) => {
	const [data, setdata] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fireSotreMob.retrieve.picturesForEvent(reference).then((res) => {
			if (res) {
				setLoading(false)
				setdata(fireSotreMob.eventImagesMap.get(reference) || [])
			} else {
				TToast.error("Error", "Something went wrong retireving images")
			}
		})
	}, [])

	const handleUpload = () => {
		getImage().then((res) => {
			if (!res.cancelled) {
				fireSotreMob.send.PictureToEvent(reference, res.uri).then((res) => {
					if (res) {
						TToast.success("Success", "Everythings good to go!")
					} else {
						TToast.error("Error", "Something went wrong")
					}
				})
			}
		})
	}

	if (loading)
		return (
			<View marginT-60 centerH paddingB-70>
				<Text imp marginB-20>
					Pictures
				</Text>
				<View>
					<ActivityIndicator size="large" color={Colors.primary} animating={true} />
					<Text imp1>Loading</Text>
				</View>
			</View>
		)

	return (
		<View marginT-60 centerH paddingB-70 style={{borderWidth: 0}}>
			<Text imp marginB-20>
				Pictures
			</Text>
			<View row>
				<Avatar source={{uri: undefined}} />
			</View>
			<View row style={{flexWrap: "wrap", margin: 0, borderRadius: 5}}>
				{data.map((src, index) => {
					return (
						<TouchableOpacity
							margin-2
							activeOpacity={0.85}
							key={index}
							style={{
								width,
								elevation: 1,
								borderWidth: 0.5,
								borderColor: Colors.grey40,
								borderRadius: 3,
								overflow: "hidden",
							}}>
							<Image source={{uri: src}} resizeMode="cover" height={200} />
						</TouchableOpacity>
					)
				})}
				<TouchableOpacity
					onPress={handleUpload}
					activeOpacity={0.85}
					margin-2
					center
					backgroundColor={Colors.primary}
					style={{
						width,
						opacity: 0.9,
						elevation: 0,
						borderRadius: 3,
						height: 200,
						borderColor: Colors.primary,
						borderWidth: 0.4,
					}}>
					<Icon name="plus-circle" size={32} />
					<Text marginT-10 style={{fontWeight: "700"}}>
						upload picture
					</Text>
				</TouchableOpacity>
			</View>
			{/* <View style={{position: "absolute", bottom: 15, margin: 5}}>
				<TouchableOpacity
					margin-2
					center
					row
					padding-10
					backgroundColor={Colors.primary}
					style={{width: Dimensions.get("screen").width / 1.07, opacity: 0.8, elevation: 10, borderRadius: 3}}>
					<Icon name="plus-circle" size={32} />
					<Text style={{fontWeight: "700"}}>upload picture</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	)
}

export default PhotoGridV2
