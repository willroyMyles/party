// import styled, {createGlobalStyle} from "styled-components"
import { generate } from "@ant-design/colors"
import { Colors, Typography } from "react-native-ui-lib"
import { StyleSheet } from "react-native"
import { observable } from 'mobx'

export interface Theme
{
	background: string
	text1: string
	text2: string
	muted: string
	caption: string
	primary: string
	secondary: string
	bgHilight: string
	foreground: string
}

const storm = "#112432"
const light = generate( Colors.violet40 )

export const lightTheme: Theme = {
	primary: light[5],
	secondary: light[2],
	text1: Colors.grey10,
	text2: "rgba(85,85,85,1)",
	muted: Colors.grey50,
	caption: Colors.grey60,
	background: "rgba(245,245,250,1)",
	foreground: "rgba(253,253,253,1)",
	bgHilight: "rgba(240,243,245,1)",
}

export const darkTheme: Theme = {
	primary: light[5],
	secondary: light[7],
	text1: "rgba(250,250,250,.9)",
	text2: Colors.grey60,
	muted: Colors.grey30,
	caption: Colors.grey30,
	background: "rgba(27,39,49,1)",
	foreground: "rgba(47,59,69,1)",
	bgHilight: "rgba(55,63,65,.3)",
}


export const DarkMapStyleWithoutLandmarks = [
	{
		elementType: "geometry",
		stylers: [
			{
				color: "#242f3e",
			},
		],
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#746855",
			},
		],
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#242f3e",
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "geometry",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#d59563",
			},
		],
	},
	{
		featureType: "poi",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#d59563",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [
			{
				color: "#263c3f",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#6b9a76",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				color: "#38414e",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#212a37",
			},
		],
	},
	{
		featureType: "road",
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#9ca5b3",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{
				color: "#746855",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#1f2835",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#f3d19c",
			},
		],
	},
	{
		featureType: "transit",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [
			{
				color: "#2f3948",
			},
		],
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#d59563",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#17263c",
			},
		],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#515c6d",
			},
		],
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#17263c",
			},
		],
	},
]


class ThemeHelper
{
	reviseLoading = ( t: Theme ) => new Promise( resolve =>
	{

		Colors.loadColors( {
			background: t.background,
			foreground: t.foreground,
			primary: t.primary,
			text1: t.text1,
			text2: t.text2,
			muted: t.muted,
			light: t.caption,
			secondary: t.secondary
		} )

		const style = StyleSheet.create( {
			wlecome: {
				fontSize: 37,
				flexWrap: "wrap",
				color: Colors.text2,
				textShadowRadius: .3,
				textTransform: "capitalize",
				fontFamily: "RR",
				opacity: .7
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

			},
			button: {
				fontWeight: "700",
				fontSize: 16,
				color: Colors.text1,
				// textShadowOffset: { width: 0.2, height: 0.2 },
				textShadowRadius: 0.2,
				fontFamily: "RR"
			}
		} )

		Typography.loadTypographies( {
			lvl1: style.textOne,
			lvl2: style.textTwo,
			lvl3: style.textThree,
			indicator: style.indicator,
			regular: style.regular,
			btn: style.button,
			welcome: style.wlecome
		} )


	} )
}

export const themehelper = new ThemeHelper()
