import "mobx-react-lite/batchingForReactNative"
import React, {useEffect, useState, ReactNode} from "react"
import {View} from "react-native-ui-lib"
import {StyleSheet, ActivityIndicator} from "react-native"
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
import {eventEmitter, eventStrings} from "./universial/EventEmitter"
import {decode, encode} from "base-64"

export default observer(function App() {
	const [loading, setLoading] = useState(true)
	const [activityLoading, setactivityLoading] = useState(false)

	const [] = useState<ReactNode>(undefined)

	useEffect(() => {
		if (!global.btoa) {
			global.btoa = encode
		}

		if (!global.atob) {
			global.atob = decode
		}
		eventEmitter.addListener(eventStrings.loggingIn, setactivityLoading)
		Font.loadAsync({
			Nunito_Black: require("./assets/fonts/Nunito/Nunito-Black.ttf"),
			Nunito_Regular: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
			Nunito_Semi_Bold: require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
		}).then(() => {
			setLoading(false)
		})

		return () => {
			eventEmitter.removeListener(eventStrings.loggingIn, () => null)
		}
	}, [])

	// if (loading) return <AppLoading />

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={uiManager.theme}>
				<View style={styles.container}>
					{activityLoading && (
						<View
							center
							style={{
								position: "absolute",
								height: "100%",
								width: "100%",
								backgroundColor: "rgba(0,0,0,.3)",
								zIndex: 1,
							}}>
							<ActivityIndicator size="large" color={Colors.primary} animating={activityLoading} />
						</View>
					)}
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
