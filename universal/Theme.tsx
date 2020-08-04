// import styled, {createGlobalStyle} from "styled-components"
import { generate } from "@ant-design/colors"
import { Colors, Typography } from "react-native-ui-lib"
import { StyleSheet } from "react-native"
import { observable } from 'mobx'

export interface Theme {
	background: string
	text1: string
	text2: string
	muted: string
	caption: string
	primary: string
	bgHilight: string
	foreground: string
}

const storm = "#112432"
const light = generate(Colors.violet40)

export const lightTheme: Theme = {
	primary: light[5],
	text1: Colors.grey10,
	text2: Colors.grey30,
	muted: Colors.grey50,
	caption: Colors.grey60,
	background: Colors.grey80,
	foreground: "rgba(253,253,253,1)",
	bgHilight: "rgba(240,243,245,1)",
}

export const darkTheme: Theme = {
	primary: light[5],
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


class ThemeHelper {
	reviseLoading = (t: Theme) => new Promise(resolve => {

		Colors.loadColors({
			background: t.background,
			foreground: t.foreground,
			primary: t.primary,
			text1: t.text1,
			text2: t.text2,
			muted: t.muted,
			light: t.caption
		})

		const style = StyleSheet.create({
			textOne: {
				fontWeight: "700",
				fontSize: 16,
				color: Colors.text1,
				textShadowRadius: 1
			},
			textTwo: {
				fontWeight: "600",
				fontSize: 14,
				color: Colors.text2
			},
			indicator: {
				fontWeight: "700",
				fontSize: 16,
				color: Colors.muted,
				textTransform: "uppercase",

				paddingHorizontal: 7,
				borderRadius: 1,
				// borderWidth: 1,
				borderColor: Colors.light
				, backgroundColor: Colors.background,
				alignContent: "center",
				alignItems: "center",
			}
		})

		Typography.loadTypographies({
			lvl1: style.textOne,
			lvl2: style.textTwo,
			indicator: style.indicator
		})


	})
}

export const themehelper = new ThemeHelper()
