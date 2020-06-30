import {Typography, Colors} from "react-native-ui-lib"
import uiManager, {Store} from "../dataLayer/UiManager"
import {StyleSheet, Text, View} from "react-native"

class ThemeHelper {
	reviseLoading = (manager: Store) => {
		console.log(manager)

		Colors.loadColors({
			background: manager.theme.background,
			primary: manager.theme.primary,
		})

		const s = StyleSheet.create({
			desc: {
				color: manager.theme.secondary_text,
				fontSize: 22,
			},
			tabs_text: {
				fontWeight: "700",
				fontSize: 16,
				textTransform: "uppercase",
				textShadowRadius: 1,
			},
			important: {
				color: manager.theme.primary_text,
				fontSize: 35,
				fontWeight: "700",
			},
			check: {
				color: manager.theme.primary_text,
				fontSize: 22,
				fontWeight: "700",
			},
			date: {
				fontWeight: "700",
				fontSize: 16,
				color: Colors.primary,
			},
			regular: {
				color: manager.theme.primary_text,
				textShadowRadius: 1,
				fontSize: 16,
				fontWeight: "600",
			},
			hint: {
				color: manager.theme.primary_text,
				textShadowRadius: 0.1,
				fontSize: 14,
				fontWeight: "700",
				opacity: 0.5,
			},
			btn_text: {
				color: Colors.background,
				fontWeight: "700",
				textShadowRadius: 0.2,
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
