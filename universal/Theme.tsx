// import styled, {createGlobalStyle} from "styled-components"
import { generate } from "@ant-design/colors"
import { Colors } from "react-native-ui-lib"
import { StyleSheet } from "react-native"
import { observable } from 'mobx'

export interface Theme {
	background: string
	primary_text: string
	secondary_text: string
	teritairy_text: string
	caption: string
	primary: string
	bgHilight: string
	foreground: string
}

const storm = "#112432"
const light = generate(Colors.violet40)

export const lightTheme: Theme = {
	primary: light[5],
	primary_text: Colors.grey10,
	secondary_text: Colors.grey40,
	teritairy_text: Colors.grey50,
	caption: Colors.grey60,
	background: Colors.grey80,
	foreground: "rgba(253,253,253,1)",
	bgHilight: "rgba(240,243,245,1)",
}

export const darkTheme: Theme = {
	primary: light[5],
	primary_text: "rgba(250,250,250,.9)",
	secondary_text: Colors.grey60,
	teritairy_text: Colors.grey30,
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
			primary: t.primary
		})
	})
}

export const themehelper = new ThemeHelper()
