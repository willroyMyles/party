import React from "react"
import {View, Text, Image} from "react-native-ui-lib"
import {useRoute} from "@react-navigation/native"

import {ScrollView} from "react-native-gesture-handler"
import FireStore from "../data_layer/FireStore"
import PhotoGridV2 from "../components/PhotoGridV2"
import DateBox from "../components/DateBox"
import { Colors } from "react-native/Libraries/NewAppScreen"


const PastEventView = () => {
	const route = useRoute()
	const referenceNumber = route.params?.reference
	const item = FireStore.data.get(referenceNumber)

	if(!item) return <View />

	if(item)return (
		<ScrollView contentContainerStyle={{minHeight:"100%"}}>
			<View bg-background style={{minHeight:"100%"}}>
					<Image
						source={{uri: item.imageUrl}}
						style={{flexDirection: "row", borderRadius: 2, height: 350}}
						resizeMode="cover"
					/>
				<View row padding-20 paddingT-3 paddingB-12 style={{flexDirection: "column", justifyContent: "space-between"}}>
						<Text lvl1>{item.title}</Text>
					<View marginT-10 row style={{justifyContent: "flex-start"}}>
						<View absR style={{marginTop : -15}}>
							<DateBox date={item.date || ""} />
						</View>
						<View style={{marginStart: "30%"}}>
						</View>
					</View>
				</View>
				<PhotoGridV2 reference={referenceNumber} />
			</View>
		</ScrollView>
	)
}


export default PastEventView
