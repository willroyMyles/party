import "mobx-react-lite/batchingForReactNative"
import React, {useEffect, useState, ReactNode} from "react"
import {StyleSheet, View} from "react-native"
import {Colors} from "react-native-ui-lib"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {createStackNavigator} from "@react-navigation/stack"
import {observer} from "mobx-react"
import uiManager from "./dataLayer/UiManager"
import {generate} from "@ant-design/colors"
import {ThemeProvider} from "styled-components"
import * as Font from "expo-font"
import {AppLoading} from "expo"
import Navigator from "./components/Navigator"

export default observer(function App() {
	const [] = useState(false)
	const [loading, setLoading] = useState(true)

	const [] = useState<ReactNode>(undefined)

	useEffect(() => {
		Font.loadAsync({
			Nunito_Black: require("./assets/fonts/Nunito/Nunito-Black.ttf"),
			Nunito_Regular: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
			Nunito_Semi_Bold: require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
		}).then(() => {
			setLoading(false)
		})
	}, [])

	if (loading) return <AppLoading />

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={uiManager.theme}>
				<View style={styles.container}>
					<Navigator />
				</View>
			</ThemeProvider>
		</SafeAreaProvider>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	text: {
		color: "#fff",
	},
})
