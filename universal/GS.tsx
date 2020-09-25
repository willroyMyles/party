
import React, { useEffect } from 'react'
import {  StyleSheet } from "react-native";
import { Colors, View } from "react-native-ui-lib";
import { useTheme } from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { PartyType } from './Models';
import Animated from 'react-native-reanimated';
import { FlatList, ScrollView } from 'react-native-gesture-handler'


export const AFL = Animated.createAnimatedComponent( FlatList )

export const GetIcon = ( { name }: { name: string } ) =>
{
	const theme = useTheme()
	return <View center padding-5 br100 style={{ width: 29, height: 29, elevation: 0 }}>
		<Icon name={name} size={16} style={GS.icon} color={Colors.primary} />
	</View>
}

export const GetPartytypeString = ( type: PartyType ) =>
{
	const ty = PartyType[type]

	const str = ty.replace( "_", " " ).toLowerCase()
	return str
}


export const GS = StyleSheet.create( {
	button: {
		backgroundColor: Colors.primary,
		padding: 12,
		borderRadius: 4,
		width: "100%",
		elevation: 3,

	},
	input: {

		backgroundColor: "rgba(100,100,150,.03)",
		marginTop: -7,
		padding: 5,
		borderRadius: 7,
		paddingStart: 12,
		marginBottom: -15,
		width: "30%"
	},
	floater: {
		marginStart: 12,
		opacity: .5,
		color: Colors.grey30
	},
	icon: {

		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		// textShadowRadius: 3,
		// textDecorationLine: "underline",
		zIndex: 2
	},
	textOne: {
		// fontWeight: "700",
		fontSize: 17,
		color: Colors.text1,
		textShadowRadius: 1,
		textTransform: "capitalize",
		fontFamily: "RR"
	},
	textTwo: {
		fontWeight: "600",
		fontSize: 14,
		color: Colors.text2,
		fontFamily: "RR"

	},
	textThree: {
		fontWeight: "600",
		fontSize: 11,
		color: Colors.muted,
		textTransform: "uppercase",
		fontFamily: "RR"

	},
	indicator: {
		fontWeight: "700",
		fontSize: 16,
		color: Colors.muted,
		textTransform: "uppercase",
		paddingHorizontal: 7,
		borderRadius: 1,
		borderColor: Colors.light
		, backgroundColor: Colors.background,
		alignContent: "center",
		alignItems: "center",
		fontFamily: "RR"

	},
	regular: {
		fontWeight: "600",
		fontSize: 16,
		color: Colors.text1,
		textShadowOffset: { width: 0.2, height: 0.2 },
		textShadowRadius: 0.01,
		fontFamily: "RR"

	}
} )

