import React from "react"
import {View, Text, Image} from "react-native-ui-lib"
import {useRoute} from "@react-navigation/native"
import dataProvider from "../../dataLayer/DataStore"
import {SharedElement} from "react-navigation-shared-element"
import {ScrollView} from "react-native-gesture-handler"
import BackButton from "../../components/BackButton"
import PhotoGrid from "../../components/PhotoGrid"
import PhotoGridV2 from "../../components/PhotoGridV2"

const PastEventView = () => {
	const route = useRoute()
	const referenceNumber = route.params?.reference
	const item = dataProvider.data.get(referenceNumber)

	//get photos from backend

	return (
		<ScrollView>
			<View bg-background>
				<SharedElement id={item.reference + "imgmem"}>
					<Image
						source={{uri: item.imageUrl}}
						style={{flexDirection: "row", borderRadius: 2, height: 350}}
						resizeMode="cover"
					/>
				</SharedElement>
				<BackButton />
				<View row padding-20 paddingT-3 paddingB-12 style={{flexDirection: "column", justifyContent: "space-between"}}>
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
				<PhotoGridV2 reference={referenceNumber} />
			</View>
		</ScrollView>
	)
}

PastEventView.sharedElements = (route: ReturnType<typeof useRoute>) => {
	const ref = route.params?.reference

	const img = ref + "imgmem"
	const tit = ref + "titlemem"
	return [
		{id: img, animation: "fade"},
		{id: tit, animation: "fade"},
	]
}
export default PastEventView
