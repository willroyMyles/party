import {createGlobalStyle} from "styled-components"
import {generate} from "@ant-design/colors"
import {Colors} from "react-native-ui-lib"

export interface Theme {
	background: string
	primary_text: string
	secondary_text: string
	teritairy_text: string
	caption: string
	primary: string
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
}

export const darkTheme: Theme = {
	primary: light[5],
	primary_text: Colors.white,
	secondary_text: Colors.grey60,
	teritairy_text: Colors.grey30,
	caption: Colors.grey30,
	background: Colors.grey20,
}

// export const GlobalStyles = createGlobalStyle`

//   body {
//     align-items: center;

//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     height: 100%;
//     margin: 0;
//     padding: 0;
//     font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//     transition: all 0.25s linear;
//   }`
