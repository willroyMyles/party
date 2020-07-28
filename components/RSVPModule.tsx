import React, {useEffect} from "react"
import {View, Text, TouchableOpacity, Colors} from "react-native-ui-lib"
import fireSotreMob from "../dataLayer/FireStore"
import dataProvider from "../dataLayer/DataStore"
import uiManager from "../dataLayer/UiManager"
import Row from "./Row"
import {Feather} from "@expo/vector-icons"
import TToast from "./TToast"

const RSVPModule = () => {
	useEffect(() => {
		fireSotreMob.retrieve.rsvpEvents()
	}, [])

	const handleRemovePinned = (value: string) => {
		fireSotreMob.removeRsvp(value).then((res) => {
			if (res) {
				TToast.success("Great!", "event removed")
			} else {
				TToast.error("Oops!", "something went wrong")
			}
		})
	}

	return (
		<View marginT-30 style={{width: "100%"}}>
			<View>
				<Text imp1>RSVP parties</Text>
			</View>
			{fireSotreMob.rsvpParties.map((value, index) => {
				return (
					<View
						row
						center
						centerV
						style={{
							borderWidth: 0,
							marginTop: 10,
							width: "100%",
							backgroundColor: uiManager.theme.bgHilight,
							borderRadius: 7,
							elevation: 0,
							justifyContent: "space-between",
						}}>
						<TouchableOpacity activeOpacity={0.75} padding-10 key={index}>
							<Text reg>{dataProvider.data.get(value)?.title}</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.75} row onPress={() => handleRemovePinned(value)}>
							<Feather name="x-circle" size={28} color={Colors.grey40} />
						</TouchableOpacity>
					</View>
				)
			})}
		</View>
	)
}

export default RSVPModule
