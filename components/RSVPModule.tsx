import React from "react"
import {View, Text, TouchableOpacity} from "react-native-ui-lib"
import fireSotreMob from "../dataLayer/FireStore"
import dataProvider from "../dataLayer/DataStore"
import uiManager from "../dataLayer/UiManager"

const RSVPModule = () => {
	return (
		<View marginT-30 style={{width: "100%"}}>
			<View>
				<Text imp1>RSVP parties</Text>
			</View>
			{fireSotreMob.rsvpParties.map((value, index) => {
				return (
					<TouchableOpacity
						padding-10
						key={index}
						style={{
							borderWidth: 0,
							marginTop: 10,
							width: "100%",
							backgroundColor: uiManager.theme.bgHilight,
							borderRadius: 7,
							elevation: 2,
						}}>
						<Text reg>{dataProvider.data.get(value)?.title}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export default RSVPModule
