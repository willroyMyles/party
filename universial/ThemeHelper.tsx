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
				fontSize: 22,
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
				fontWeight: "200",
				fontFamily: "Nunito_Regular",
			},
			check: {
				color: manager.theme.primary_text,
				fontSize: 22,
				fontFamily: "Nunito_Regular",
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
				color: manager.theme.primary_text,
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
}

const themeHelper = new ThemeHelper()
export default themeHelper
