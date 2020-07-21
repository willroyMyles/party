import styled, {createGlobalStyle} from "styled-components"
import {generate} from "@ant-design/colors"
import {Colors} from "react-native-ui-lib"
import {StyleSheet} from "react-native"

export interface Theme {
	background: string
	primary_text: string
	secondary_text: string
	teritairy_text: string
	caption: string
	primary: string
	bgHilight: string
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
	bgHilight: "rgba(240,243,245,1)",
}

export const darkTheme: Theme = {
	primary: light[5],
	primary_text: "rgba(250,250,250,.9)",
	secondary_text: Colors.grey60,
	teritairy_text: Colors.grey30,
	caption: Colors.grey30,
	background: "rgba(27,39,49,1)",
	bgHilight: "rgba(55,63,65,.3)",
}
