import React, {useState, useEffect} from "react"
import {View, Text, Image, ListItem, TouchableOpacity, Colors} from "react-native-ui-lib"
import {FlatList} from "react-native-gesture-handler"
import dataProvider from "../dataLayer/DataStore"
import {Dimensions} from "react-native"
import {SharedElement} from "react-navigation-shared-element"
// import ImageLayout from "react-native-image-layout"
const PhotoGrid = (ref: string) => {
	const [data, setdata] = useState([])

	useEffect(() => {
		dataProvider.generateFakeData().then((res) => {
			setdata(res)
		})
	}, [])

	return (
		<View marginT-30 centerH>
			<Text imp1 marginB-20 style={{textTransform: "uppercase", opacity: 0.6, fontStyle: "italic"}}>
				p h o t o s
			</Text>
			<FlatList
				data={data}
				numColumns={3}
				renderItem={({item, index}) => {
					const last = index + 1 == data.length
					return (
						<View key={index}>
							<TouchableOpacity key={index} style={{width: Dimensions.get("screen").width / 3}}>
								<Image source={{uri: item}} resizeMode="cover" height={200} />
							</TouchableOpacity>
							{/* {last && (
								
							)} */}
						</View>
					)
				}}
			/>
			<TouchableOpacity style={{width: Dimensions.get("screen").width / 3}}>
				<Text center>hello world</Text>
			</TouchableOpacity>
		</View>
	)
}

export default PhotoGrid
