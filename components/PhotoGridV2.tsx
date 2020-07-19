import React, {useState, useEffect} from "react"
import {View, Text, Image, ListItem, TouchableOpacity, Colors, Avatar} from "react-native-ui-lib"
import {FlatList} from "react-native-gesture-handler"
import dataProvider from "../dataLayer/DataStore"
import {Dimensions} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import {useTheme} from "styled-components"
import {getImage} from "../universial/GetImage"
import fireSotreMob from "../dataLayer/FireStore"
import {Toast, Popup} from "popup-ui"
import TToast from "./TToast"

const width = Dimensions.get("screen").width / 3.1
const PhotoGridV2 = ({reference}: {reference: string}) => {
	const [data, setdata] = useState([])
	const theme = useTheme()

	useEffect(() => {
		dataProvider.generateFakeData().then((res: any) => {
			setTimeout(() => {
				setdata(res)
			}, 250)
		})
	}, [])

	const handleUpload = () => {
		getImage().then((res) => {
			if (!res.cancelled) {
				fireSotreMob.send.PictureToEvent(reference, res.uri).then((res) => {
					if (res) {
						TToast.show({
							color: "red",
							// icon: undefined,
							text: "hello world",
							timing: 5000,
							title: "this is my title",
						})
					} else {
					}
				})
			}
		})
	}

	return (
		<View marginT-60 centerH paddingB-70>
			<Text imp marginB-20>
				Pictures
			</Text>
			{/* <View row>
				<Avatar source={{uri: undefined}} />
			</View> */}
			<View row style={{flexWrap: "wrap", margin: 5, borderRadius: 15, overflow: "hidden"}}>
				{data.map((src, index) => {
					return (
						<TouchableOpacity activeOpacity={0.85} key={index} style={{width}}>
							<Image source={{uri: src}} resizeMode="cover" height={200} />
						</TouchableOpacity>
					)
				})}
				<TouchableOpacity
					onPress={handleUpload}
					activeOpacity={0.85}
					// margin-2
					center
					backgroundColor={Colors.primary}
					style={{width, opacity: 0.8, elevation: 10, borderRadius: 3}}>
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
