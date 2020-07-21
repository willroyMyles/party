import {Typography, Colors} from "react-native-ui-lib"
import uiManager, {Store} from "../dataLayer/UiManager"
import {StyleSheet, Text, View} from "react-native"

class ThemeHelper {
	reviseLoading = (manager: Store) => {
		Colors.loadColors({
			background: manager.theme.background,
			backgroundHighlight: manager.theme.bgHilight,
			primary: manager.theme.primary,
			textColor: manager.theme.primary_text,
			inactive: "rgba(200,200,200,.3)",
		})

		const s = StyleSheet.create({
			desc: {
				color: manager.theme.secondary_text,
				fontSize: 18,
				fontFamily: "Nunito_Regular",
			},
			tabs_text: {
				fontSize: 16,
				textTransform: "uppercase",
				textShadowRadius: 1,
				fontFamily: "Nunito_Regular",
			},
			important: {
				color: manager.theme.primary_text,
				fontSize: 35,
				// fontWeight: "700",
				fontFamily: "Nunito_Regular",
			},
			check: {
				color: manager.theme.primary_text,
				fontSize: 18,
				fontFamily: "Nunito_Regular",
				fontWeight: "700",
				opacity: 0.85,
			},
			date: {
				fontSize: 16,
				color: Colors.primary,
				fontFamily: "Nunito_Semi_Bold",
				textShadowRadius: 0,
				marginBottom: -1,
				marginTop: 4,
			},
			regular: {
				color: manager.theme.primary_text,
				textShadowRadius: 1,
				fontSize: 16,
				fontFamily: "Nunito_Regular",
				opacity: 0.85,
			},
			hint: {
				color: manager.theme.secondary_text,
				textShadowRadius: 0.1,
				fontSize: 14,
				opacity: 0.5,
				fontFamily: "Nunito_Regular",
			},
			btn_text: {
				color: Colors.background,
				textShadowRadius: 0.2,
				fontFamily: "Nunito_Regular",
			},
		})
		Typography.loadTypographies({
			desc: s.desc,
			imp: s.important,
			imp1: s.check,
			date: s.date,
			reg: s.regular,
			hint: s.hint,
			tabs: s.tabs_text,
			btn: s.btn_text,
		})
	}

	styles = StyleSheet.create({
		input: {
			borderWidth: 1,
			// borderColor: "rgba(0,0,0,.3)",
			borderColor: Colors.primary,
			backgroundColor: Colors.backgroundHighlight,
			marginBottom: 35,
			marginTop: 7,
			borderRadius: 4,
			padding: 9,
			elevation: 0,
			color: Colors.textColor,
			fontFamily: "Nunito_Semi_Bold",
		},
	})
}

const themeHelper = new ThemeHelper()
export default themeHelper
