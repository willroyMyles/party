import React from "react"
import {View, TouchableOpacity, Text, Colors} from "react-native-ui-lib"
import Icon from "react-native-vector-icons/Feather"
import {Feather} from "@expo/vector-icons"
function RSVPButton({reference}: {reference: string | undefined}) {
	return (
		<View center>
			<TouchableOpacity
				activeOpacity={0.85}
				center
				style={{
					// position: "absolute",
					top: -30,
					zIndex: 3,
					// elevation: 3,
					backgroundColor: Colors.background,
					borderWidth: 1,
					borderColor: Colors.grey50,
					// marginBottom: 10,
					borderRadius: 500,
					padding: 20,
				}}>
				<Icon
					size={30}
					name="star"
					color={Colors.primary}
					style={{
						fontWeight: "600",
						textShadowRadius: 1,
						textShadowOffset: {width: 5, height: 5},
						textShadowColor: Colors.grey50,
					}}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default RSVPButton
